const { ApolloServer, gql } = require("apollo-server-express");
const User = require("./models/user");
const Photo = require("./models/photo");
const Heap = require("./models/heap");
const express = require("express");
const mongoose = require("mongoose");
const typeDefs = require("./graphql/schema");
const makeResolvers = require("./graphql/resolvers");
// const { makeExecutableSchema } = require("graphql-tools");
const session = require("express-session");
const resolvers = makeResolvers({ User, Photo, Heap });
const RedisStore = require("connect-redis")(session);
const redis = require("redis");
//https://www.npmjs.com/package/connect-redis
const Minio = require("minio");
const signale = require("signale");
const multer = require("multer");
const cors = require('cors')

// signale.success("Operation successful");
// signale.debug("Hello", "from", "L59");
// signale.pending("Write release notes for %s", "1.2.0");
// signale.fatal(new Error("Fake error Unable to acquire lock"));
// signale.watch("Recursively watching build directory...");
// signale.complete({
//   prefix: "[task]",
//   message: "Fix issue #59",
//   suffix: "(@klauscfhq)"
// });

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
    .connect(
      "mongodb://photostack_user:12345678@mongo-db:27017/photostack",
      { useNewUrlParser: true }
    )
    .catch(error => {
      console.log(error, "Promise error");
      //connect();
      // process.exit(1);
    });
}
connect();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: (context) => {
    console.log(context);
    const {req} = context;
    return req;
  },
  uploads: {
    // Limits here should be stricter than config for surrounding
    // infrastructure such as Nginx so errors can be handled elegantly by
    // graphql-upload:
    // https://github.com/jaydenseric/graphql-upload#type-uploadoptions
    maxFileSize: 10000000, // 10 MB
    maxFiles: 20
  },
  formatError: error => {
    signale.fatal(error);
    return error;
    // return new Error("Internal server error");
    // Or, you can delete the exception information
    // delete error.extensions.exception;
    // return error;
  }
});

const app = express();
app.use(
  session({
    // store: new RedisStore({
    //   host: "redis",
    //   port: 6379
    // }),
    name: 'hoi',
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    cookie: {
      httpOnly: true,
      secure: true
     }
  })
);

app.use(cors({origin: 'http://localhost:3000', credentials: true, allowedHeaders: ['Content-Type', 'Authorization']}));

app.get("/image/:imageId", function(req, res, next) {
  res.set("Content-Type", "image/jpeg");

  minioClient.getObject("photostack", req.params.imageId, function(
    err,
    dataStream
  ) {
    if (err) {
      return console.log("Err", err);
    }
    var size = 0;
    dataStream.on("data", function(chunk) {
      size += chunk.length;
      res.write(chunk);
    });
    dataStream.on("end", function() {
      console.log("End. Total size = " + size);
      res.end();
    });
    dataStream.on("error", function(err) {
      console.log(err);
    });
  });
});

const imageFilter = function(req, file, callback) {
  // accept image only
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
    return callback(new Error("Only image files are allowed!"), false);
  }
  callback(null, true);
};
var storage = multer.memoryStorage();
const upload = multer({
  // dest: `imgtmp/`,
  fileFilter: imageFilter,
  storage: storage
});

app.post("/upload/", upload.array("photos", 12), async (req, res) => {
  req.session.userId = "52ffc4a5d85242602e000000";
  try {
    const redis = require("redis");
    const pub = redis.createClient(6379, "redis");
    const uuidv4 = require("uuid/v4");
    const ExifImage = require("exif").ExifImage;
    const moment = require("moment");
    req.files.forEach(file => {
      const { buffer, originalname, mimetype, encoding, size } = file;

      let objectId = uuidv4();
      let metaData = {
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
          signale.log("File uploaded with etag", etag);
          new ExifImage(buffer, function(error, exifData) {
            if (error) console.log("Exif Error: " + error.message);
            let fileObj = {
              owner: req.session.userId,
              metadata: {
                ...exifData.exif
              },
              uploadTime: moment().unix(),
              objectId: objectId,
              height: exifData.exif.ExifImageHeight,
              width: exifData.exif.ExifImageWidth,
              // thumbnail: thumbnailName,
              fileName: originalname,
              mimeType: mimetype,
              encoding: encoding
            };
            const photo = new Photo(fileObj);
            photo
              .save()
              .then(response => {
                let data = {
                  type: "todo",
                  object_id: objectId,
                  photo_id: response.id
                };
                pub.publish("objdetection", JSON.stringify(data));
                console.log("Photo saved", response);
              })
              .catch(x => signale.error("Tiakane", x));
          });
        }
      );

      // pub.publish("objdetection", objectId);
      // pub.publish("lowlight", objectId);
      // pub.publish("ocr", objectId);
      // pub.publish("hdr", objectId);
      // pub.publish("enhance", objectId);

      // signale.debug(fileObj, x.originalname);
    });
    res.send("success");
  } catch (err) {
    signale.error(err);
    res.sendStatus(400);
  }
});

server.applyMiddleware({ app });

app.listen({ port: 4000 }, () =>
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
);
var sub = redis.createClient(6379, "redis");
sub.subscribe("objdetection");
sub.on("subscribe", function(channel, count) {
  // pub.publish("lowlight", "I am sending a message.");
  // pub.publish("hdr", "I am sending a second message.");
  // pub.publish("a nice channel", "I am sending my last message.");
  console.log("Subscribed: ", channel, count);
});

sub.on("message", function(channel, message) {
  switch (channel) {
    case "objdetection":
      let data = JSON.parse(message);
      if (data.type == "done") {
        //insert into mongo
        signale.debug("SUPER POWER AI", data.objects);
        Photo.findByIdAndUpdate(data.photo_id, {
          $addToSet: {
            tags: {
              $each: data.objects
            }
          }
        }).then(res => signale.debug(res));
      }
      break;
  }
  console.log("sub channel " + channel + ": " + message);
});
