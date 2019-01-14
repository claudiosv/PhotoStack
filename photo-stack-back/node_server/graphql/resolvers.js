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
      return models.Photo.find(
        { owner: request.session.userId, tags: query },
        (err, docs) => {
          if (err) console.log(err);
          return docs;
        }
      );
    },

    getAutocomplete(root, { query }, request) {
      request.session.userId = "52ffc4a5d85242602e000000";
      return models.Photo.find({
        owner: request.session.userId,
        tags: new RegExp(`${query}(.*)`, "i")
      }).then(photo => {
        var completions = new Set();
        photo.forEach(doc => doc.tags.forEach(x => completions.add(x)));
        return Array.from(completions);
      });
    },

    getHighlights(root, {}, request) {
      //last 5 uploaded photos
      request.session.userId = "52ffc4a5d85242602e000000";
      return models.Photo.find({ owner: request.session.userId }, null, {
        skip: 0, // Starting Row
        limit: 5, // Ending Row
        sort: {
          uploadTime: -1 //Sort by Date Added DESC
        }
      }).then(response => response);
    },

    getHeaps(root, {}, request) {
      request.session.userId = "52ffc4a5d85242602e000000";
      return models.Heap.find(
        { owner: request.session.userId },
        (err, docs) => {
          if (err) console.log(err);
          console.log(docs);
          return docs;
        }
      ).then(response => {
        console.log(response);
        return response;
      });
    },

    getHeap(root, { id }) {
      request.session.userId = "52ffc4a5d85242602e000000";
      return models.Heap.findOne(
        { id: id, owner: request.session.userId },
        (err, docs) => {
          if (err) console.log(err);
          console.log(docs);
          return docs;
        }
      ).then(response => {
        console.log(response);
        return response;
      });
    },

    getPhoto(root, { id }) {
      request.session.userId = "52ffc4a5d85242602e000000";
      return models.Photo.findOne(
        { id: id, owner: request.session.userId },
        (err, docs) => {
          if (err) console.log(err);
          console.log(docs);
          return docs;
        }
      ).then(response => {
        console.log(response);
        return response;
      });
    }
  },
  Mutation: {
    createUser(root, args, req) {
      const user = new models.User(args);
      return user.save().then(response => response);
    },
    updateUser(root, args, req) {
      req.session.userId = "5c3b59f72a066d02233b4263";
      return models.User.findByIdAndUpdate(req.session.userId, {
        ...args
      }).then(response => JSON.stringify(response));
    },
    createHeap(root, args, req) {
      console.log("Args: ", args);
      const heap = new models.Heap({
        ...args,
        owner: req.session.userId
      });
      return heap.save().then(response => JSON.stringify(response));
    },
    uploadPhotos(root, args, req) {
      console.log("Photo upload called");
      args.photos.forEach(element => {
        let photo = new models.Photo(element);
        photo.save().then(response => response);
      });
      return "success";
    },
    async uploadPhoto(root, { file }, req) {
      const { stream, filename, mimetype, encoding } = await file;
      const uuidv4 = require("uuid/v4");
      let name = uuidv4();
      let metaData = {
        "Content-Type": mimetype,
        Filename: filename
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
      let fileObj = {
        name: name,
        filename: filename,
        mimetype: mimetype,
        encoding: encoding
      };
      const photo = new models.Photo(fileObj);
      photo.save().then(response => response);

      return { filename, mimetype, encoding };
    }
  }
});

module.exports = makeResolvers;
