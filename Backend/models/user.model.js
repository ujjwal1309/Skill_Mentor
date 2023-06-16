const mongoose = require("mongoose");

const teacherSchema = mongoose.Schema(
  {
    teacherName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    qualifications: { type: String, required: true },
    experience: { type: String, required: true },
    phoneNo: { type: Number, required: true, unique: true },
    city: { type: String, required: true },
    subject: { type: String, required: true },
    image: { type: String },
    about: { type: String },
    slots: [{ studentID: String, date: String, time: String }],
  },
  { versionKey: false }
);

const TeacherModel = mongoose.model("Teachers", teacherSchema);

module.exports = { TeacherModel };