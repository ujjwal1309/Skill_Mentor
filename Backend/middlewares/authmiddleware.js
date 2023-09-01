let jwt=require("jsonwebtoken")
let bcrypt=require("bcrypt")
const { BlacklistModel } = require("../models/blacklistmodel")

let auth=async(req,res,next)=>{

    try{
        let {accesstoken}=req.cookies
        let isblacklisted=await BlacklistModel.findOne({token:accesstoken})
        console.log(isblacklisted,"hh")
        if(isblacklisted){
            res.send("login again,")
        }
        else{
           next()
        } 
    }
    catch(err){
        res.send(err)
    }
}

module.exports={auth}