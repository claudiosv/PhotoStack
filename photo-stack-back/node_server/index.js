const { ApolloServer, gql } = require("apollo-server");
const User = require("./models/user");

const mongoose = require("mongoose");
// const typeDefs = require("./graphql/schema");
const typeDefs = gql`
  type User {
    id: ID!
    email: String!
    firstName: String!
    lastName: String!
    password: String!
  }

  type Heap {
    id: ID!
    name: String!
    tags: [String]!
  }

  type Metadata {
    shootTime: Float!
    location: [Float]!
  }

  type Photo {
    id: ID!
    owner: ID!
    metadata: Metadata
    fileName: String!
    uploadTime: Float!
    tags: [String]
    objectId: String!
    derivatives: [String]
    postProcessing: [String]
  }

  type Query {
    getPhotos: [Photo]
    getUserById(id: ID!): User
    getUserByEmail(email: String!): User
  }

  type Mutation {
    createUser(email: String!, password: String!): User
  }

  schema {
    query: Query
    mutation: Mutation
  }
`;
// const resolvers = require("./graphql/resolvers");
// const { makeExecutableSchema } = require("graphql-tools");
const makeResolvers = models => ({
  Query: {
    getUserById(root, { id }) {
      let test = models.User.findById(id).then(response => {
        console.log(response);
        return response;
      });
      return test;
    },

    getUserByEmail(root, { email }) {
      console.log("Called");
      return models.User.findOne({ email }).then(response => response);
    }
  },
  Mutation: {
    createUser(root, args) {
      console.log("Called");
      const user = new models.User(args);
      return user.save().then(response => response);
    }
  }
});

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

// const resolvers = resolvers({ User });

const server = new ApolloServer({ typeDefs, resolvers });
// const server = new ApolloServer({
//   typeDefs: [typeDefs],
//   resolvers: resolvers({ User })
// });
server.listen({ port: 4001 }).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});

var redis = require("redis");
var sub = redis.createClient(6379, "redis"),
  pub = redis.createClient(6379, "redis");
// var msg_count = 0;

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
