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

module.exports = makeResolvers;
