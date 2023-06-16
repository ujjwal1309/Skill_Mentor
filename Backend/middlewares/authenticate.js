const jwt = require("jsonwebtoken");
require("dotenv").config();
const fs = require("fs");

async function authenticate(req, res, next) {
  const token = req.headers.authorization;
  if (token) {
    const blackListData = JSON.parse(
      fs.readFileSync("blacklist.token.json", "utf-8")
    );
    if (blackListData.includes(token)) {
      res.send("login again user logout");
    } else {
      jwt.verify(token, process.env.secret, function (err, decoded) {
        if (decoded) {
          req.body.name = decoded.name;
          req.body.userID = decoded.userID;
          next();
        } else {
          console.log(err);
          res.status(401);
          res.send("token you provided is invalid or it is expired");
        }
      });
    }
  } else {
    res.status(400);
    res.send("please provide a token first");
  }
}

module.exports = { authenticate };