const {
  ApolloServer,
  ApolloError,
  UserInputError,
  gql,
  AuthenticationError
} = require("apollo-server");
const Minio = require("minio");

const minioClient = new Minio.Client({
  endPoint: "minio",
  port: 9000,
  useSSL: false,
  accessKey: "minio",
  secretKey: "minio123"
});

const makeResolvers = models => ({
  Query: {
    getUser(root, {}, request, schema) {
      if (request.session.userId) {
        return models.User.findById(request.session.userId);
      } else {
        throw new AuthenticationError("You must be logged in");
      }
    },

    getPhotos(root, {}, request, schema) {
      if (request.session.userId) {
        return models.Photo.find(
          { owner: request.session.userId },
          (err, docs) => {
            if (err) console.log(err);
            return docs;
          }
        );
      } else {
        throw new AuthenticationError("You must be logged in");
      }
    },

    loginUser(root, { email, password }, request) {
      const bcrypt = require("bcryptjs");
      return models.User.findOne({ email: email }).then(docs => {
        if (docs && bcrypt.compareSync(password, docs.password)) {
          request.session.loggedIn = true;
          request.session.userId = docs.id;
          return docs;
        } else {
          throw new UserInputError("Wrong username/password");
        }
      });

      /*
      , (err, docs) => {
        if (err || !docs) {
          console.log(err);
          return "fail";
        }
      }*/
    },

    isLoggedIn(root, {}, req) {
      return JSON.stringify({
        loggedIn: req.session.loggedIn,
        userId: req.session.userId
      });
    },

    searchPhotos(root, { query, conjunctive }, request) {
      if (request.session.userId) {
        var queryTags = { $in: query };
        if (conjunctive === true) {
          queryTags = { $all: query };
        }
        return models.Photo.find(
          { owner: request.session.userId, tags: queryTags },
          (err, docs) => {
            if (err) console.log(err);
            return docs;
          }
        );
      } else {
        throw new AuthenticationError("You must be logged in");
      }
    },

    getAutocomplete(root, { query }, request) {
      if (request.session.userId) {
        return models.Photo.find({
          owner: request.session.userId,
          tags: new RegExp(`${query}(.*)`, "i")
        }).then(photo => {
          var completions = new Set();
          photo.forEach(doc => doc.tags.forEach(x => completions.add(x)));
          return Array.from(completions);
        });
      } else {
        throw new AuthenticationError("You must be logged in");
      }
    },

    getHighlights(root, {}, request) {
      //last 5 uploaded photos
      if (request.session.userId) {
        return models.Photo.find({ owner: request.session.userId }, null, {
          skip: 0, // Starting Row
          limit: 5, // Ending Row
          sort: {
            uploadTime: -1 //Sort by Date Added DESC
          }
        }).then(response => response);
      } else {
        throw new AuthenticationError("You must be logged in");
      }
    },

    getHeaps(root, {}, request) {
      if (request.session.userId) {
        return models.Heap.find({ owner: request.session.userId }).then(
          response => {
            return response;
          }
        );
      } else {
        throw new AuthenticationError("You must be logged in");
      }
    },

    getHeap(root, { id }, request) {
      if (request.session.userId) {
        return models.Heap.findOne({
          _id: id,
          owner: request.session.userId
        }).then(response => {
          return response;
        });
      } else {
        throw new AuthenticationError("You must be logged in");
      }
    },

    getPhoto(root, { id }, request) {
      if (request.session.userId) {
        return models.Photo.findOne({
          _id: id,
          owner: request.session.userId
        }).then(response => {
          return response;
        });
      } else {
        throw new AuthenticationError("You must be logged in");
      }
    }
  },
  Mutation: {
    createUser(root, args, req) {
      const bcrypt = require("bcryptjs");
      var hash = bcrypt.hashSync(args.password, 10);
      args.password = hash;
      const user = new models.User(args);
      return user.save().then(response => response);
    },
    updateUser(root, args, req) {
      if (req.session.userId) {
        const bcrypt = require("bcryptjs");
        var hash = bcrypt.hashSync(args.password, 10);
        args.password = hash;
        return models.User.findByIdAndUpdate(req.session.userId, {
          ...args
        }).then(response => response);
      } else {
        throw new AuthenticationError("You must be logged in");
      }
    },
    async createHeap(root, { name, tags }, req) {
      if (req.session.userId) {
        return models.Photo.findOne({
          owner: req.session.userId,
          tags: { $in: tags }
        }).then(photo => {
          return minioClient
            .getObject("photostack", photo.objectId)
            .then(dataStream => {
              var gm = require("gm");
              var stream = gm(dataStream)
                .resize("500", "500", "^")
                .gravity("Center")
                .crop(500, 500)
                .noProfile()
                .stream();

              const uuidv4 = require("uuid/v4");
              let thumbnailName = uuidv4();
              let metaData = {
                "Content-Type": photo.mimeType,
                Filename: photo.fileName
              };
              return minioClient
                .putObject("photostack", thumbnailName, stream, metaData)
                .then(etag => {
                  const heap = new models.Heap({
                    name: name,
                    tags: tags,
                    owner: req.session.userId,
                    thumbnail: thumbnailName
                  });
                  console.log("Saving heap to DB");
                  return heap.save();
                });
            });
        });
      } else {
        throw new AuthenticationError("You must be logged in");
      }
    },
    logout(root, args, req) {
      req.session.userId = false;
      req.session.loggedIn = false;
      return "logged_out";
    }
  }
});

module.exports = makeResolvers;
