const makeResolvers = models => ({
  Query: {
    getUserById(root, { id }) {
      let test = models.User.findById(id).then(response => {
        console.log(response);
        return response;
      });
      return test;
    },

    getUserByEmail(root, { email: email }) {
      console.log("Called");
      return models.User.findOne({ email }).then(response => response);
    },

    getPhotos(root, {}) {
      let userId = null;
      return models.Photo.findById(userId).then(response => response);
    },

    loginUser(root, { email, password }) {
      const bcrypt = require("bcrypt");
      const saltRounds = 10;
      let hashedPassword = bcrypt.hashSync(password, saltRounds);
      return models.User.find({ email: email, password: hashedPassword }).then(
        response => response
      );
    },

    searchPhotos(root, { query }) {
      let userId = null; //TODO
      return models.Photo.find({ owner: userId, tags: query }).then(
        response => response
      );
    },

    getHighlights(root, { id }) {
      //last 5 uploaded photos
      let userId = null; //TODO
      return models.Photo.find({ owner: userId }, null, {
        skip: 0, // Starting Row
        limit: 5, // Ending Row
        sort: {
          date_added: -1 //Sort by Date Added DESC
        }
      }).then(response => response);
    },

    getHeaps(root, {}) {
      let userId = null; //TODO
      return models.Heap.find({ owner: userId });
    },

    getHeap(root, { id }) {
      let userId = null; //TODO
      return models.Heap.find({ id: id, owner: userId });
    },

    getPhoto(root, { id }) {
      let userId = null; //TODO
      return models.Photo.find({ id: id, owner: userId });
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
      return user
        .update({ id: args.userId }, { args })
        .then(response => response);
    },
    createHeap(root, args) {
      console.log("Called");
      const heap = new models.Heap(args);
      return heap.save().then(response => response);
    }
  }
});

module.exports = makeResolvers;
