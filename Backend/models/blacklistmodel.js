let mongoose=require("mongoose")


let backlistSchema=mongoose.Schema({
    token:String
},{
    versionKey:false
})

BlacklistModel=mongoose.model("blacklist",backlistSchema)

module.exports={BlacklistModel}