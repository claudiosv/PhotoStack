const { ApolloServer, gql } = require("apollo-server");
const User = require("./models/user");

const mongoose = require("mongoose");
const typeDefs = require("./graphql/schema");
const makeResolvers = require("./graphql/resolvers");
// const { makeExecutableSchema } = require("graphql-tools");

const resolvers = makeResolvers({ User });

mongoose.set("useFindAndModify", false);
mongoose
  .connect(
    "mongodb://photostack_user:12345678@mongo-db:27017/photostack",
    { useNewUrlParser: true }
  )
  .catch(error => {
    console.log(error, "Promise error");
  });

const server = new ApolloServer({ typeDefs, resolvers });

server.listen({ port: 4001 }).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});

var redis = require("redis");
var sub = redis.createClient(6379, "redis");
var pub = redis.createClient(6379, "redis");

sub.on("subscribe", function(channel, count) {
  pub.publish("lowlight", "I am sending a message.");
  pub.publish("hdr", "I am sending a second message.");
  // pub.publish("a nice channel", "I am sending my last message.");
});

sub.on("message", function(channel, message) {
  console.log(channel, message);
  switch (channel) {
    case "hdr":
      console.log("Cool HDR stuff");
      break;
  }
  console.log("sub channel " + channel + ": " + message);
});

sub.subscribe("a nice channel", "lowlight", "hdr");
