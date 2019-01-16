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
mongoose
  .connect(
    "mongodb://photostack_user:12345678@mongo-db:27017/photostack",
    { useNewUrlParser: true }
  )
  .catch(error => {
    console.log(error, "Promise error");
    // process.exit(1);
  });

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => req,
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
app.get("/image/:imageId", function(req, res, next) {
  res.set("Content-Type", "image/jpeg");

  minioClient.getObject("photostack", req.params.imageId, function(
    err,
    dataStream
  ) {
    if (err) {
      return console.log(err);
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

app.use(
  session({
    store: new RedisStore({
      host: "redis",
      port: 6379
    }),
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
  })
);
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
