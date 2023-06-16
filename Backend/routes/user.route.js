const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const fs = require("fs");
require("dotenv").config();
let userRoute = express.Router();
require("dotenv").config();
const { userModel } = require("../model/user.model");
const passport = require("../config/google_oauth");

userRoute.post("/user/signup", async (req, res) => {
  const { name, email, role, password } = req.body;
  let userData = await userModel.find({ email });
  if (userData.length > 0) {
    res.status(400);
    res.send("user already exists");
  } else {
    bcrypt.hash(password, +process.env.saltRounds, async function (err, hash) {
      if (err) {
        console.log(err);
        res.status(400);
        res.send("something went wrong");
      } else {
        let userRegisterData = userModel({
          name,
          email,
          role,
          password: hash,
        });
        await userRegisterData.save();
        res.send("user registered");
      }
    });
  }
});

userRoute.post("/user/login", async (req, res) => {
  const { email, password } = req.body;
  let userData = await userModel.find({ email });
  console.log(userData);
  if (userData.length > 0) {
    bcrypt.compare(password, userData[0].password, function (err, result) {
      if (result) {
        //   normal token
        var token = jwt.sign(
          { name: userData[0].name, userID: userData[0]._id },
          process.env.secret
        );

        // //   refresh token
        // var refreshToken = jwt.sign(
        //   { name: userData[0].name, userID: userData[0]._id },
        //   process.env.refreshSecret,
        //   { expiresIn: process.env.refreshTokenLife }
        // );
        // res.cookie("refreshToken", refreshToken, {
        //   maxAge: 1000 * 60 * 10,
        //   httpOnly: true,
        // });
        res.send({
          msg: "login successful",
          token: token,
          username: userData[0].name,
          userID: userData[0]._id,
          role: userData[0].role,
          email: userData[0].email,
        });
      } else {
        res.status(400);
        res.send({ msg: "wrong credentials" });
      }
    });
  } else {
    res.status(404);
    res.send({ msg: "wrong credentials" });
  }
});

userRoute.post("/user/logout", async (req, res) => {
  const token = req.headers.authorization;
  const blackListData = JSON.parse(
    fs.readFileSync("blacklist.token.json", "utf-8")
  );
  blackListData.push(token);
  fs.writeFileSync("blacklist.token.json", JSON.stringify(blackListData));
  res.send("logout successful");
});

userRoute.post("/otp", async (req, res) => {
  const email = req.body.email;
  try {
    const userData = await userModel.find({ email });
    if (userData.length > 0) {
      let otp = Math.floor(Math.random() * 9000 + 1000);
      // let sub = `OTP for resetting the API ACE Password`;
      // let body = `This is Your OTP - ${otp} for resetting the API ACE password, Keep it confedential.`;
      // sendMail(sub, body, email);
      res.send({
        message: otp,
      });
    } else {
      res.status(400);
      res.send({
        message: "Incorrect E-Mail",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(402);
    res.send("something went wrong while sending otp");
  }
});

userRoute.patch("/reset", async (req, res) => {
  try {
    const payload = req.body;

    const _id = payload.id;
    const password = payload.password;

    const userData = await userModel.find({ _id });

    if (userData.length > 0) {
      const ID = userData[0]._id;
      bcrypt.hash(password, 3, async function (err, hashed) {
        const edited = { password: hashed };
        await userModel.findByIdAndUpdate({ _id: ID }, edited);
        res.status(200).send({
          ok: true,
          message: "Password Re-Set Successfully",
        });
      });
    } else {
      res.status(400);
      res.send({ message: "something went wrong" });
    }
  } catch (error) {
    console.log(error);
    res.status(400);
    res.send("something went wrong while resetting password");
  }
});

// **************************************************google auth******************************************

userRoute.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

userRoute.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/login",
    session: false,
  }),
  // Successful authentication, redirect home.
  async function (req, res) {
    // Successful authentication, redirect home.
    console.log(req.user);
    const name = req.user.name;
    const email = req.user.email;
    const user_data = {
      name,
      email,
    };
    res.send("welcome"); /// redirect URL
  }
);

module.exports = { userRoute };
