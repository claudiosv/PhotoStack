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

/*

To show the pictures the client will ask the link to the image
and  a link to its thumbnail  using the photo id (minio id that you were talking)

and the same for its derivatives

to get the autosuggestions the client asks for tags with a name containing the input string

on search the client will ask for images links and proportions
(if not available kein stress this is optional)

(links mandatory, proportions are optional )

working on the preferences panel tho

that will require a mutation if smth i changed in its form

(mutation to user)
*/

const redis = require("redis");
const sub = redis.createClient(6379, "redis");
var pub = redis.createClient(6379, "redis");

// sub.on("subscribe", function(channel, count) {
//   pub.publish("lowlight", "I am sending a message.");
//   pub.publish("hdr", "I am sending a second message.");
//   pub.publish("a nice channel", "I am sending my last message.");
//   console.log("Subscribed: ", channel, count);
// });

// sub.on("message", function(channel, message) {
//   console.log(channel, message);
//   switch (channel) {
//     case "hdr":
//       console.log("Cool HDR stuff");
//       break;
//   }
//   console.log("sub channel " + channel + ": " + message);
// });

// sub.subscribe("a nice channel", "lowlight", "hdr");
