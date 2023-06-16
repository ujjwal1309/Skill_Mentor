const mongoose = require("mongoose");

const slotSchema = mongoose.Schema(
  {
    studentID: String,
    date: String,
    time: String,
    teacherEmailID: String,
    status: {
      type: String,
      default: "pending",
    },
  },
  {
    versionKey: false,
  }
);

const slotModel = mongoose.model("slot", slotSchema);

module.exports = { slotModel };