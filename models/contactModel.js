const mongoose = require("mongoose");
const contSchema = mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    name: {
      type: String,
      requires: [true, "pls add the contact name"],
    },
    email: {
      type: String,
      requires: [true, "pls add the email adress"],
    },
    PhoneNum: {
      type: String,
      requires: [true, "pls add the Phone Number"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Contact", contSchema);
