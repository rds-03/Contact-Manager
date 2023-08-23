const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "pls add the user name"],
    },
    email: {
      type: String,
      required: [true, "pls add the email"],
      unique: [true, "this address is already taken"],
    },
    password: {
      type: String,
      required: [true, "pls add password "],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
