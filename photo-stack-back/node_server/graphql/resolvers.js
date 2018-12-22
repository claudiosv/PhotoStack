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
    },

    getPhotos(root, {}) {
      return null;
    },

    loginUser(root, { email, password }) {
      return null;
    },

    searchPhotos(root, { query }) {
      return null;
    },

    getHighlights(root, { id }) {
      return null;
    },

    getHeaps(root, {}) {
      return null;
    },

    getHeap(root, { id }) {
      return null;
    },

    getPhoto(root, { id }) {
      return null;
    }
  },
  Mutation: {
    createUser(root, args) {
      console.log("Called");
      const user = new models.User(args);
      return user.save().then(response => response);
    },
    updateUser(root, args) {
      console.log("Called");
      const user = new models.User(args);
      return user.save().then(response => response);
    },
    createHeap(root, args) {
      console.log("Called");
      const user = new models.User(args);
      return user.save().then(response => response);
    }
  }
});

module.exports = makeResolvers;
