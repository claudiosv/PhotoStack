import { UserInputError, AuthenticationError } from "apollo-server";
import * as jsonwebtoken from "jsonwebtoken";
import * as Minio from "minio";
require("dotenv").config();
const minioClient = new Minio.Client({
  endPoint: process.env.MINIO_HOST as string,
  port: parseInt(process.env.MINIO_PORT as string),
  useSSL: false,
  accessKey: process.env.MINIO_ACCESS as string,
  secretKey: process.env.MINIO_SECRET as string
});

const makeResolvers = (models: any) => ({
  Query: {
    async getUser(_, _, { user }) {
      if (!user) {
        throw new AuthenticationError("You are not authenticated!");
      }

      // user is authenticated
      return models.User.findById(user.id);
    },
    async getPhotos(_, _, { user }) {
      if (!user) {
        throw new AuthenticationError("You are not authenticated!");
      }

      return models.Photo.find({ owner: user.id }, (err, docs) => {
        if (err) console.log(err);
        return docs;
      });
    },
    async loginUser(_, { email, password }, { user }) {
      if (!user) {
        throw new AuthenticationError("You are not authenticated!");
      }
      const bcrypt = require("bcryptjs");
      return models.User.findOne({ email: email }).then(docs => {
        if (docs && bcrypt.compareSync(password, docs.password)) {
          user.loggedIn = true;
          user.userId = docs.id;
          return jsonwebtoken.sign(
            { id: docs.id, email: docs.email },
            process.env.JWT_SECRET as string,
            { expiresIn: "1d" }
          );
        } else {
          return new UserInputError("Wrong username/password");
        }
      });
    },
    async isLoggedIn(_, {}, { user }) {
      if (!user) {
        throw new AuthenticationError("You are not authenticated!");
      }
      return JSON.stringify({
        loggedIn: user.loggedIn,
        userId: user.userId
      });
    },

    async searchPhotos(_, { query, conjunctive }, { user }) {
      if (!user) {
        throw new AuthenticationError("You are not authenticated!");
      }
      var queryTags;
      if (conjunctive) {
        queryTags = { $all: query };
        return models.Photo.find(
          { owner: user.userId, tags: queryTags },
          (err, docs) => {
            if (err) console.log(err);
            return docs;
          }
        );
      }
    },

    async getAutocomplete(_, { query }, { user }) {
      if (!user) {
        throw new AuthenticationError("You are not authenticated!");
      }
      return models.Photo.find({
        owner: user.userId,
        tags: new RegExp(`${query}(.*)`, "i")
      }).then(photo => {
        var completions = new Set();
        photo.forEach(doc => doc.tags.forEach(x => completions.add(x)));
        return Array.from(completions);
      });
    },

    async getHighlights(_, _, { user }) {
      if (!user) {
        throw new AuthenticationError("You are not authenticated!");
      }
      //last 5 uploaded photos
      return models.Photo.find({ owner: user.userId }, null, {
        skip: 0, // Starting Row
        limit: 5, // Ending Row
        sort: {
          uploadTime: -1 //Sort by Date Added DESC
        }
      }).then(response => response);
    },

    async getHeaps(_, {}, { user }) {
      if (!user) {
        throw new AuthenticationError("You are not authenticated!");
      }
      return models.Heap.find({ owner: user.userId }).then(response => {
        return response;
      });
    },

    getHeap(_, { id }, { user }) {
      if (!user) {
        throw new AuthenticationError("You are not authenticated!");
      }
      return models.Heap.findOne({
        _id: id,
        owner: user.userId
      }).then(response => {
        return response;
      });
    },

    getPhoto(_, { id }, { user }) {
      if (!user) {
        throw new AuthenticationError("You are not authenticated!");
      }
      return models.Photo.findOne({
        _id: id,
        owner: user.userId
      }).then(response => {
        return response;
      });
    }
  },

  Mutation: {
    async createUser(_, args) {
      const bcrypt = require("bcryptjs");
      var hash = bcrypt.hashSync(args.password, 10);
      args.password = hash;
      const user = new models.User(args);
      return user.save().then(response => response);
    },
    async updateUser(_, args, { user }) {
      if (!user) {
        throw new AuthenticationError("You are not authenticated!");
      }
      const bcrypt = require("bcryptjs");
      var hash = bcrypt.hashSync(args.password, 10);
      args.password = hash;
      return models.User.findByIdAndUpdate(user.userId, {
        ...args
      }).then(response => response);
    },
    async createHeap(_, { name, tags }, { user }) {
      if (!user) {
        throw new AuthenticationError("You are not authenticated!");
      }
      return models.Photo.findOne({
        owner: user.userId,
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
            let metaData: Minio.ItemBucketMetadata = {
              "Content-Type": photo.mimeType,
              Filename: photo.fileName
            };
            return minioClient
              .putObject("photostack", thumbnailName, stream, metaData)
              .then(_ => {
                const heap = new models.Heap({
                  name: name,
                  tags: tags,
                  owner: user.userId,
                  thumbnail: thumbnailName
                });
                console.log("Saving heap to DB");
                return heap.save();
              });
          });
      });
    },
    logout(_, _, { user }) {
      if (!user) {
        throw new AuthenticationError("You are not authenticated!");
      }
      user.userId = false;
      user.loggedIn = false;
      return "logged_out";
    }
  }
});

export default makeResolvers;
