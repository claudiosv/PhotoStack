const {
  ApolloServer,
  ApolloError,
  UserInputError,
  gql
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
      const bcrypt = require("bcryptjs");
      return models.User.findOne({ email: email }, (err, docs) => {
        if (err || !docs) {
          console.log(err);
          return "fail";
        }
      }).then(docs => {
        if (bcrypt.compareSync(password, docs.password)) {
          request.session.loggedIn = true;
          request.session.userId = docs.id;
          return "success";
        } else {
          return "fail";
        }
      });
    },

    bcrypt(root, { pass }, req) {
      const bcrypt = require("bcryptjs");
      const saltRounds = 10;
      let hashedPassword = bcrypt.hashSync(pass, saltRounds);
      return hashedPassword;
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
    async test(root, { query }, req) {
      const redis = require("redis");
      var pub = redis.createClient(6379, "redis");
      let data = {
        type: "todo",
        object_id: "1397194_10152003738382375_735564635_o.jpg",
        photo_id: query
      };
      pub.publish("objdetection", JSON.stringify(data));

      return "success";
    },

    uploadPhoto: async (root, { file }) => {
      
      const { stream, filename, mimetype, encoding } = await file;
      // console.log(stream);
      // const uuidv4 = require("uuid/v4");
      // let objectId = uuidv4();
      // let metaData = {
      //   "Content-Type": mimetype,
      //   Filename: filename
      // };
      // minioClient.putObject(
      //   "photostack",
      //   objectId,
      //   stream,
      //   metaData,
      //   (err, etag) => {
      //     return console.log(err, etag); // err should be null
      //   }
      // );

      // var ExifImage = require("exif").ExifImage;

      // try {
      //   new ExifImage(stream, function(error, exifData) {
      //     if (error) console.log("Error: " + error.message);
      //     else console.log(exifData); // Do something with your data!
      //   });
      // } catch (error) {
      //   console.log("Error: " + error.message);
      // }

      // // var gm = require("gm");
      // // var width = 0,
      // //   height = 0;
      // // // obtain the size of an image
      // // let thumbnailStream = gm(stream)
      // //   .size({ bufferStream: true }, function(err, size) {
      // //     if (!err) {
      // //       width = size.width;
      // //       height = size.height;
      // //       console.log("width = " + size.width);
      // //       console.log("height = " + size.height);
      // //     }
      // //   })
      // //   .resize(500, 500 + ">")
      // //   .gravity("Center")
      // //   .extent(500, 500)
      // //   .stream("jpg");
      // // let metaData = {
      // //   "Content-Type": mimetype,
      // //   Filename: filename
      // // };
      // // let thumbnailName = uuidv4();
      // // minioClient.putObject(
      // //   "photostack",
      // //   thumbnailName,
      // //   thumbnailStream,
      // //   metaData,
      // //   (err, etag) => {
      // //     return console.log(err, etag); // err should be null
      // //   }
      // // );

      // // .write(outputPath, function (error) {
      // //   if (error) console.log('Error - ', error);
      // // });

      // var moment = require("moment");

      // let fileObj = {
      //   owner: req.session.userId,
      //   metadata: {
      //     shootTime: 1412180887, //should be exif
      //     location: [40, 5] //should be exif
      //   },
      //   uploadTime: moment().unix(),
      //   tags: [
      //     "tag2" //should be given by AI
      //   ],
      //   objectId: objectId,
      //   derivatives: {
      //     //"key": "value" //Should be set later when a python job is done
      //   },
      //   postProcessing: {
      //     //"process": "minio_id" same
      //   },
      //   height: height,
      //   width: width,
      //   // thumbnail: thumbnailName,
      //   fileName: filename,
      //   mimeType: mimetype,
      //   encoding: encoding
      // };
      // const photo = new models.Photo(fileObj);
      // var photoId = null;
      // photo.save().then(response => {
      //   photoId = response.id;
      //   console.log("Photo saved", response);
      // });

      // const redis = require("redis");
      // var pub = redis.createClient(6379, "redis");
      // // pub.publish("objdetection", objectId);
      // // pub.publish("lowlight", objectId);
      // // pub.publish("ocr", objectId);
      // // pub.publish("hdr", objectId);
      // // pub.publish("enhance", objectId);
      // let data = {
      //   type: "todo",
      //   object_id: objectId,
      //   photo_id: photoId
      // };
      // pub.publish("objdetection", JSON.stringify(data));
      return await file //{ filename, mimetype, encoding };
    }
  }
});

module.exports = makeResolvers;
