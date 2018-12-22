const mongoose = require("mongoose");

const photoSchema = new mongoose.Schema({
  id: {
    type: Schema.Types.ObjectId,
    unique: true
  },
  owner: Schema.Types.ObjectId,
  metadata: {
    type: Map,
    of: String
  },
  fileName: String,
  uploadTime: Number,
  tags: [String],
  objectId: String,
  derivatives: [String],
  postProcessing: [String]
});

module.exports = mongoose.model("Photo", photoSchema);
