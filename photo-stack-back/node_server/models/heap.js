const mongoose = require("mongoose");

const heapSchema = new mongoose.Schema({
  id: {
    type: Schema.Types.ObjectId,
    unique: true,
    required: true
  },
  name: String,
  tags: [String]
});

module.exports = mongoose.model("Heap", heapSchema);
