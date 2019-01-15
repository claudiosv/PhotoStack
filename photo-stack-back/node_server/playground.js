var Minio = require("minio");

/*

To show the pictures the client will ask the link to the image
and  a link to its thumbnail  using the photo id (minio id that you were talking)

and the same for its derivatives

to get the autosuggestions the client asks for tags with a name containing the input string

on search the client will ask for images links and proportions
(if not available kein stress this is optional)

(links mandatory, proportions are optional )

working on the preferences panel tho

that will require a mutation if smth i changed in its form

(mutation to user)
*/

var minioClient = new Minio.Client({
  endPoint: "localhost",
  port: 9000,
  useSSL: false,
  accessKey: "minio",
  secretKey: "minio123"
});

// minioClient.listBuckets(function(e, buckets) {
//   if (e) return console.log(e);
//   console.log("buckets :", buckets);
// });

// objectsStream = minioClient.listObjectsV2("photostack", "", true, "");
// objectsStream.on("data", function(obj) {
//   console.log(obj);
// });
// objectsStream.on("error", function(e) {
//   console.log(e);
// });

var file = "./index.js";
var metaData = {
  "Content-Type": "text/html",
  "Content-Language": 123,
  "X-Amz-Meta-Testing": "fuck",
  example: 5678
};

// const uuidv4 = require("uuid/v4");
// let name = uuidv4();

// minioClient.fPutObject("photostack", name, file, metaData).then((err, etag) => {
//   return console.log("Error: ", err, etag); // err should be null
// });

minioClient.statObject(
  "photostack",
  "07842b1f-6ba8-409e-852e-14a796fedfee",
  function(err, stat) {
    if (err) {
      return console.log("Stat: ", err);
    }
    console.log("Stat: ", stat);
  }
);

minioClient.presignedGetObject(
  "photostack",
  "07842b1f-6ba8-409e-852e-14a796fedfee",
  24 * 60 * 60,
  function(err, presignedUrl) {
    if (err) return console.log(err);
    console.log(presignedUrl);
  }
);
