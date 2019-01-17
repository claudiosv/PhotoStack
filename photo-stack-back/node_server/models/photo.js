const mongoose = require("mongoose");
const ObjectId = require("mongoose").Types.ObjectId;

ObjectId.prototype.valueOf = function() {
  return this.toString();
};
// const { ObjectId } = mongoose.Types;
// ObjectId.prototype.valueOf = function() {
//   return this.toString();
// };
const photoSchema = new mongoose.Schema({
  // _id: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   unique: true
  // },
  owner: mongoose.Schema.Types.ObjectId,
  metadata: {
    type: Map,
    of: String
  },
  fileName: String,
  uploadTime: Number,
  tags: [String],
  objectId: String,
  derivatives: {
    type: Map,
    of: String
  },
  postProcessing: {
    type: Map,
    of: String
  },
  height: Number,
  width: Number,
  mimeType: String,
  thumbnail: String,
  fullsize: String
});

module.exports = mongoose.model("Photo", photoSchema);
