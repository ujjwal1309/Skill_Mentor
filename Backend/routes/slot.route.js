const { slotModel } = require("../models/slot.model");
const slotRoute = require("express").Router();

slotRoute.get("/allSlots", async (req, res) => {
  try {
    let allSlot = await slotModel.find();
    res.send(allSlot);
  } catch (error) {
    res.send("something went wrong");
  }
});

slotRoute.post("/bookSlots", async (req, res) => {
  let payload = req.body;
  console.log(payload);
  try {
    let bookSlot = await new slotModel(payload);
    await bookSlot.save();
    res.send("slot Booked");
  } catch (error) {
    res.send("something went wrong");
  }
});

slotRoute.get("/teacherSlots/:email", async (req, res) => {
  try {
    let teacherEmailID = req.params.email;
    let teacherSlotData = await slotModel.find({ teacherEmailID });
    res.send(teacherSlotData);
  } catch (error) {
    res.send("something went wrong");
  }
});

slotRoute.get("/studentSlots/:id", async (req, res) => {
  try {
    let studentID = req.params.id;
    let studentSlotData = await slotModel.find({ studentID });
    res.send(studentSlotData);
  } catch (error) {
    res.send("something went wrong");
  }
});
slotRoute.patch("/update/:id", async (req, res) => {
  let payload = req.body
  try {
    let updateid = req.params.id;
    let updateData = await slotModel.findByIdAndUpdate({_id:updateid },payload);
   res.send("status updates")
  } catch (error) {
    res.send("something went wrong");
  }
});



module.exports = { slotRoute };