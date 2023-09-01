const express = require("express");
const authRoute = express.Router();
const passport = require("passport");
const { UserModel } = require("../models/user.model");
require("dotenv").config()

const { v4: uuidv4 } = require('uuid');
const GoogleStratergy=require("passport-google-oauth20").Strategy

// authRoute.get("/google",passport.authenticate('google'),{scope:["profile","email","phone"]});

authRoute.get("/auth/google/",
    passport.authenticate("google", {
      scope: ["profile", "email", "phone"]
    })
  );
  
authRoute.get("/google/callback", passport.authenticate('google', {
    session: false
  }), async (req, res) => {
    let user = req.user;
    console.log(user)
    let accessToken = req.authInfo.accessToken;
    let refreshToken = req.authInfo.refreshToken
    res.cookie("accessToken", accessToken, { httpOnly: true });
    res.cookie("refreshToken", refreshToken, { httpOnly: true });
    if (user) {
      user.password = undefined;
      res.redirect(`http://127.0.0.1:5501/Frontend/index.html?userdata=${encodeURIComponent(JSON.stringify(user))}`)
    } else {
      res.send('failed to connect')
    }
  }
  );


    const clientID=process.env.google_client_id
    const clientSecret=process.env.google_client_secret
    passport.use(
    new GoogleStratergy(
        {
          clientID:clientID,
          clientSecret:clientSecret,
          callbackURL:"http://localhost:8600/google/callback",
          passReqToCallback:true,
        },
        async function (request, accessToken, refreshToken, profile,done) {
         try {
            
            
        let email = profile.emails[0].value;
        console.log(email)
        var user = await UserModel.findOne({ email })
        
        if (user) {
            return done(null, user, { accessToken, refreshToken })
        } else {
        let name = profile.displayName;
          let image = profile.photos[0].value.replace(96, 340);
           if(!image){
            image="https://pinnacle.works/wp-content/uploads/2022/06/dummy-image.jpg"
           }
          const user = new UserModel({ email, name, image, password: uuidv4() });
          await user.save();
        //   res.cookie("accesstoken",accesstoken)
        //   res.cookie("refreshtoken",refreshtoken)
          return done(null, user,{accessToken,refreshToken});
        } 
        }catch (error) {
            console.log(error)
            return done(error)
        }

        }
    )
    )

module.exports={authRoute}