const { slotModel } = require("../models/slot.model");
const slotRoute = require("express").Router();

slotRoute.get("/allslotTeacher/:id", async (req, res) => {
  let {id}=req.params
  try {
    let allSlot = await slotModel
    .find({ teacher_id: id })
    .sort({ meeting_time: 1 });
    res.status(200).send({msg:allSlot});
  } catch (error) {
    res.status(400).send({msg:"something went wrong"});
  }
});

slotRoute.get("/allslotStudent/:id", async (req, res) => {
  let {id}=req.params
  try {
    let allSlot = await slotModel.find({student_id:id});
    res.status(200).send({msg:allSlot});
  } catch (error) {
    res.status(400).send({msg:"something went wrong"});
  }
});

slotRoute.post("/createSlot/:id", async (req, res) => {
  let {id}=req.params
  try {
    let bookSlot = await new slotModel({meeting_time:req.body.dateTime,teacher_id:id});
    await bookSlot.save();
    res.status(200).send({msg:"slot created"});
  } catch (error) {
    res.status(400).send({msg:"something went wrong"});
  }
});


slotRoute.patch("/bookSlot/:id", async (req, res) => {
  let {id}=req.params
  try {
    await slotModel.findByIdAndUpdate({student_id:id,status:true});
    res.status(200).send({msg:"slot booked"});
  } catch (error) {
    res.status(400).send({msg:"something went wrong"});
  }
});



module.exports = { slotRoute };