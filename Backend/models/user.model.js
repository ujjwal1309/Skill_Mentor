const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: String,
    email: { type: String, unique: true },
    role: {
      type: String,
      enum: ["student", "tutor","admin"],
      default: "student",
    },
    password: String,
  },
  {
    versionKey: false,
  }
);

const userModel = mongoose.model("user", userSchema);

module.exports = { userModel };