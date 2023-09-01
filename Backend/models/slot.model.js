const mongoose = require("mongoose");

const slotSchema = mongoose.Schema(
  {
  meeting_time: {
      type:Date 
  },
  teacher_id: {
      type: mongoose.Schema.ObjectId,
      ref: "user"
  },
  student_id: {
      type: mongoose.Schema.ObjectId,
      ref: "user",
      default: null
  },
  status: { type: Boolean, default: false}
  },
  {
    versionKey: false,
  }
);

const slotModel = mongoose.model("slot", slotSchema);

module.exports = { slotModel };