const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  userName: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  publicAddress: {
    type: String,
    // unique: true,
    lowercase: true,
  },
  nonce: {
    type: Number,
    default: () => Math.floor(Math.random() * 10000),
  },
});

module.exports = mongoose.model("User", UserSchema);
