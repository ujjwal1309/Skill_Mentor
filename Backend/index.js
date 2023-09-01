const express = require("express");
var cors = require("cors");
require("dotenv").config();

const port = process.env.port;
const { connection } = require("./config/config");
const { userRoute } = require("./routes/user.route");
// const { authenticate } = require("./middlewares/authenticate.js");
// const { teacherRouter } = require("./routes/teacher.route");
// const { slotRoute } = require("./routes/slot.route");
const { authRoute } = require("./routes/auth.route");

const app = express();
app.use(express.json());
let cookieparser=require("cookie-parser");
const { slotRoute } = require("./routes/slot.route");
app.use(cookieparser())
app.use(cors());


app.get("/test", (req, res) => {
  res.send("hello");
});
app.use("/",authRoute)
app.use("/user",userRoute)
app.use("/slot",slotRoute)
// app.use(authenticate);
// app.use("/teacher", teacherRouter);
// app.use(slotRoute);

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