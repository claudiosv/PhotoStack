const mongoose = require("mongoose");

const heapSchema = new mongoose.Schema({
  owner: String,
  name: String,
  tags: [String]
});

module.exports = mongoose.model("Heap", heapSchema);
