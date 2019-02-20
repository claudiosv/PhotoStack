import { ApolloServer } from "apollo-server-express";
import User from "./models/user";
import Photo from "./models/photo";
import Heap from "./models/heap";
import * as express from "express";
import typeDefs from "./graphql/schema";
import makeResolvers from "./graphql/resolvers";
import * as session from "express-session";
import * as redis from "redis";
import * as Minio from "minio";
import * as signale from "signale";
import * as multer from "multer";
import * as cors from "cors";
import * as mongoose from "mongoose";
import * as connectRedis from "connect-redis";
import nanoid from "nanoid";
import jwt from "express-jwt";
const RedisStore: connectRedis.RedisStore = connectRedis(session);
const resolvers = makeResolvers({ User, Photo, Heap });
const minioClient = new Minio.Client({
  endPoint: "minio",
  port: 9000,
  useSSL: false,
  accessKey: "minio",
  secretKey: "minio123"
});

mongoose.set("useFindAndModify", false);
function connect() {
  mongoose
    .connect("mongodb://photostack_user:12345678@mongo-db:27017/photostack", {
      useNewUrlParser: true
    })
    .catch(error => {
      console.log(error, "Promise error");
      connect();
    });
}
connect();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }: any) => req,
  uploads: {
    // Limits here should be stricter than config for surrounding
    // infrastructure such as Nginx so errors can be handled elegantly by
    // graphql-upload:
    // https://github.com/jaydenseric/graphql-upload#type-uploadoptions
    maxFileSize: 10000000, // 10 MB
    maxFiles: 20
  },
  formatError: (error: any) => {
    signale.fatal(error);
    return error;
    // return new Error("Internal server error");
    // Or, you can delete the exception information
    // delete error.extensions.exception;
    // return error;
  },
  playground: {
    settings: {
      "request.credentials": "same-origin",
      "general.betaUpdates": true,
      "editor.theme": "dark",
      "editor.reuseHeaders": true,
      "tracing.hideTracingResponse": false,
      "editor.fontSize": 14,
      "editor.fontFamily": `'Source Code Pro', 'Consolas', 'Inconsolata', 'Droid Sans Mono', 'Monaco', monospace`
    }
  }
});

const app = express();
app.set("trust proxy", 1);
const auth = jwt({
  secret: "jwt secret", //process.env.JWT_SECRET,
  credentialsRequired: false
});
app.use(auth);
app.use(
  session({
    store: new RedisStore({
      host: "redis",
      port: 6379
    }),
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
  })
);

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"]
  })
);

app.get("/image/:imageId", function(req, res) {
  res.set("Content-Type", "image/jpeg");

  minioClient.getObject("photostack", req.params.imageId, function(
    err,
    dataStream
  ) {
    if (err) {
      return console.log("Err", err);
    }
    dataStream.on("data", function(chunk) {
      res.write(chunk);
    });
    dataStream.on("end", function() {
      res.end();
    });
    dataStream.on("error", function(err) {
      console.log(err);
    });
  });
});

const imageFilter = function(req: any, file: any, callback: any) {
  // accept image only
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
    return callback(new Error("Only image files are allowed!"), false);
  }
  callback(null, true);
};
var storage = multer.memoryStorage();
const upload = multer({
  fileFilter: imageFilter,
  storage: storage
});

app.post("/upload/", upload.array("photos", 100), async (req, res) => {
  console.log("Upload route");
  try {
    const redis = require("redis");
    const pub = redis.createClient(6379, "redis");
    const ExifImage = require("exif").ExifImage;
    const moment = require("moment");

    (req.files as Express.Multer.File[]).forEach(
      (file: Express.Multer.File) => {
        const { buffer, originalname, mimetype, encoding } = file;
        let objectId = nanoid();
        let metaData: object = {
          "Content-Type": mimetype,
          Filename: originalname
        };
        minioClient.putObject(
          "photostack",
          objectId,
          buffer,
          metaData,
          (err, etag) => {
            if (err) console.log("Error", err, etag);
            new ExifImage(buffer, function(error: any, exifData: any) {
              var gm = require("gm");
              var stream = gm(buffer)
                .resize("500", "500", "^")
                .gravity("Center")
                .crop(500, 500)
                .noProfile()
                .stream();

              let thumbnailId = nanoid();
              return minioClient
                .putObject("photostack", thumbnailId, stream, metaData)
                .then(() => {
                  exifData = { exif: {} };
                  var sizeOf = require("image-size");
                  var dimensions = sizeOf(buffer);
                  if (req.session === undefined) return;
                  let fileObj = {
                    owner: req.session.userId,
                    metadata: {
                      ...exifData.exif
                    },
                    uploadTime: moment().unix(),
                    objectId: objectId,
                    height: dimensions.height,
                    width: dimensions.width,
                    thumbnail: thumbnailId,
                    fileName: originalname,
                    mimeType: mimetype,
                    encoding: encoding
                  };
                  const photo = new Photo(fileObj);
                  photo
                    .save()
                    .then((response: any) => {
                      let data = {
                        type: "todo",
                        object_id: objectId,
                        photo_id: response.id
                      };
                      pub.publish("objdetection", JSON.stringify(data));
                      console.log("Photo saved", response);
                    })
                    .catch((x: any) => signale.error("Tiakane", x));
                });
            });
          }
        );

        // pub.publish("objdetection", objectId);
        // pub.publish("lowlight", objectId);
        // pub.publish("ocr", objectId);
        // pub.publish("hdr", objectId);
        // pub.publish("enhance", objectId);
      }
    );
    res.send("success");
  } catch (err) {
    signale.error(err);
    res.sendStatus(400);
  }
});

server.applyMiddleware({ app });

app.listen({ port: 4000 }, () =>
  console.log(
    `🚀 Server now ready at http://localhost:4000${server.graphqlPath}`
  )
);
var sub = redis.createClient(6379, "redis");
// const { promisify } = require("util");
// const getAsync = promisify(sub.get).bind(sub);
sub.subscribe("objdetection");
sub.on("subscribe", function(channel, count) {
  console.log("Subscribed: ", channel, count);
});

sub.on("message", function(channel, message) {
  switch (channel) {
    case "objdetection":
      let data = JSON.parse(message);
      if (data.type == "done") {
        //insert into mongo
        signale.debug("SUPER POWER AI", data.objects);
        var objects_split = new Set();
        data.objects.forEach((tag: any) =>
          tag.split("_").forEach((split: any) => objects_split.add(split))
        );
        console.log(objects_split);
        Photo.findByIdAndUpdate(data.photo_id, {
          $addToSet: {
            tags: {
              $each: Array.from(objects_split)
            }
          }
        }).then((res: any) => signale.debug(res));
      }
      break;
  }
  console.log("sub channel " + channel + ": " + message);
});
