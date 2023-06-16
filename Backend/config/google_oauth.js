const GoogleStrategy = require("passport-google-oauth20").Strategy;
const passport = require("passport");
const { userModel } = require("../model/user.model");
const { v4: uuidv4 } = require("uuid");
require("dotenv").config();
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:4500/auth/google/callback",
    },

    async function (accessToken, refreshToken, profile, cb) {
      const email = profile._json.email;
      const name = profile._json.name;
      const User = new userModel({
        name,
        email,
        password: uuidv4(),
      });
      await User.save();
      const { _id, password } = User;
      const payload = {
        name,
        email,
        _id,
        password,
        url: profile._json.picture,
      };
      return cb(null, payload);
    }
  )
);

module.exports = passport;