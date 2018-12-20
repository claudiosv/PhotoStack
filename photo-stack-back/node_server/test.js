const { ApolloServer, gql } = require("apollo-server");

// The GraphQL schema
const typeDefs = gql`
  type Query {
    "A simple type for getting started!"
    fuck: String
    getUserById: String
  }
`;

// A map of functions which return data for the schema.
const resolvers = {
  Query: {
    fuck: () => "world",
    getUserById: () => "world"
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers
});

server.listen({ port: 5000 }).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
