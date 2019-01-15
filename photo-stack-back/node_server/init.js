const User = require("./models/user");
const Photo = require("./models/photo");
const Heap = require("./models/heap");
const mongoose = require("mongoose");
mongoose.set("useFindAndModify", false);
mongoose
  .connect(
    "mongodb://photostack_user:12345678@mongo-db:27017/photostack",
    { useNewUrlParser: true }
  )
  .catch(error => {
    console.log(error, "Promise error");
  });
