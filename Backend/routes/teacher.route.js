const { TeacherModel } = require("../models/teacher.model");
const teacherRouter = require("express").Router();

//get all teacher
teacherRouter.get("/", async (req, res) => {
  res.send("welcome");
});
teacherRouter.get("/allteacher", async (req, res) => {
  const Teachers = await TeacherModel.find();
  res.send(Teachers);
});

teacherRouter.post("/addteacher", async (req, res) => {
  let {
    teacherName,
    email,
    qualifications,
    experience,
    phoneNo,
    city,
    subject,
    image,
    about,
    slots,
  } = req.body;
  try {
    let teacher = new TeacherModel({
      teacherName,
      email,
      qualifications,
      experience,
      phoneNo,
      city,
      subject,
      image,
      about,
      slots,
    });
    await teacher.save();
    res.status(201).send({ msg: "teacher has been created", teacher });
  } catch (error) {
    res.status(500).send({ msg: "Error in created teacher" });
  }
});

// teacherRouter.patch("/bookSlot", async (req, res) => {
//   let teacherID = req.body.teacherID;
//   let studentID = req.body.studentID;
//   let date = req.body.date;
//   let time = req.body.time;
//   let teacherData = await TeacherModel.find({ _id: teacherID });
//   if (teacherData.length > 0) {
//     let obj = { studentID, date, time };
//     await TeacherModel.findByIdAndUpdate(
//       { _id: teacherID },
//       { $push: { slots: obj } }
//     );

//     res.send("updated slots");
//   } else {
//     res.send("something went wrong");
//   }
// });

teacherRouter.delete("/delete", async (req, res) => {
  try {
    let id = req.query.id;
    let user = await TeacherModel.findByIdAndDelete({ _id: id });
    res.send({ mess: "Teacher Deleted" });
  } catch (error) {
    res.send({ Error: error.message });
  }
});

teacherRouter.get("/getteacherID", async (req, res) => {
  try {
    let name = req.headers.name;
    let user = await TeacherModel.findOne({ name: name });
    res.send({ ID: user._id });
  } catch (error) {
    console.log({ Error: error.message });
    res.send({ Error: error.message });
  }
});

module.exports = { teacherRouter };