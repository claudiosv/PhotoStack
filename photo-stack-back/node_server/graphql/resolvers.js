const {
  ApolloServer,
  ApolloError,
  UserInputError,
  gql
} = require("apollo-server");

const makeResolvers = models => ({
  Query: {
    getUserById(root, { id }, request, schema) {
      return models.User.findById(id);
    },

    getUserByEmail: (root, { email }, request, schema) => {
      return models.User.findOne({ email });
    },

    getPhotosByUser(root, {}, request, schema) {
      request.session.userId = "52ffc4a5d85242602e000000";
      return models.Photo.find(
        { owner: request.session.userId },
        (err, docs) => {
          if (err) console.log(err);
          return docs;
        }
      );
    },

    loginUser(root, { email, password }, request) {
      const bcrypt = require("bcrypt");
      const saltRounds = 10;
      let hashedPassword = bcrypt.hashSync(password, saltRounds);
      return models.User.find(
        { email: email, password: hashedPassword },
        (err, docs) => {
          if (err) {
            console.log(err);
            return "fail";
          }
          bcrypt.compare(password, docs.password, function(err, res) {
            if (err) {
              console.log(err);
              return "fail";
            }
            if (res === true) {
              request.session.loggedIn = true;
              request.session.userId = docs.id;
              return "success";
            } else {
              return "fail";
            }
          });
        }
      );
    },

    searchPhotos(root, { query }, request) {
      request.session.userId = "52ffc4a5d85242602e000000";
      models.Photo.find(
        { owner: request.session.userId, tags: query },
        (err, docs) => {
          if (err) console.log(err);
          return docs;
        }
      ).then(result => result);
    },

    getAutocomplete(root, { query }, request) {
      request.session.userId = "52ffc4a5d85242602e000000";
      models.Photo.find(
        { owner: request.session.userId, tags: /tag(.*)/i },
        "tags",
        (err, docs) => {
          var completions = new Set();
          if (err) console.log(err);
          docs.forEach(doc => doc.tags.forEach(x => completions.add(x)));
          console.log(Array.from(completions));
          return Array.from(completions);
        }
      );
    },

    searchPhoto(root, { query }, request, schema) {
      let userId = null; //TODO
      // return models.Photo.find({ owner: userId, tags: query }).then(
      //   response => response
      // );
      console.log(request.session);
      return "success " + query;
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
    },
    uploadPhotos(root, args) {
      console.log("Photo upload called");
      args.photos.forEach(element => {
        let photo = new models.Photo(element);
        photo.save().then(response => response);
      });
      return "success";
    },
    async uploadPhoto(parent, { file }) {
      const { stream, filename, mimetype, encoding } = await file;

      // 1. Validate file metadata.

      // 2. Stream file contents into cloud storage:
      // https://nodejs.org/api/stream.html
      const uuidv4 = require("uuid/v4");
      let name = uuidv4();
      let metaData = {
        "Content-Type": "text/html",
        "Content-Language": 123,
        "X-Amz-Meta-Testing": "fuck",
        example: 5678
      };
      minioClient.putObject(
        "photostack",
        name,
        stream,
        metaData,
        (err, etag) => {
          return console.log(err, etag); // err should be null
        }
      );
      // 3. Record the file upload in your DB.
      // const id = await recordFile( )

      return { filename, mimetype, encoding };
    }
  }
});

module.exports = makeResolvers;
