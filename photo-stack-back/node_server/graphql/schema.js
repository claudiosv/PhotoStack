const schema = gql`
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
    getPhotos(): [Photo]
    getUserById(id: ID!): User
    getUserByEmail(email: String!): User
    loginUser(email: String!, password: String!): String
    searchPhotos(query: String!): [Photo]
    getHighlights(): [Photo]
    getHeaps(): [Photo]
    getHeap(heapID: ID!): Heap
    getPhoto(photoID: ID!): Photo
  }

  type Mutation {
    createUser(
      email: String!
      password: String!
      firstName: String!
      lastName: String!
    ): User
    updateUser(
      id: ID!
      email: String
      password: String
      firstName: String
      lastName: String
    ): String
    createHeap(name: String!, tags: [String]!): String
  }

  schema {
    query: Query
    mutation: Mutation
  }
`;

module.exports = schema;
