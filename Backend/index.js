const express = require("express");
var cors = require("cors");
require("dotenv").config();

const port = process.env.port;
const { connection } = require("./config/config");
const { userRoute } = require("./routes/user.route");
const { authenticate } = require("./middlewares/authenticate.js");
const { teacherRouter } = require("./routes/teacher.route");
const { slotRoute } = require("./routes/slot.route");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("welcome to home");
});

app.use(userRoute);
app.use(authenticate);
app.use("/teacher", teacherRouter);
app.use(slotRoute);

app.listen(port, async () => {
  try {
    await connection;
    console.log("db connected");
  } catch (error) {
    console.log(error);
    console.log("db not connected something went wrong");
  }
  console.log("listening at port", port);
});