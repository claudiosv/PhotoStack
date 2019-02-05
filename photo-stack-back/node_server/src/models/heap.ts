const mongoose = require("mongoose");

const heapSchema = new mongoose.Schema({
  owner: String,
  name: String,
  tags: [String],
  thumbnail: String
});

export default mongoose.model("Heap", heapSchema);
