const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: String,
    email: { type: String, unique: true},
    role: {
      type: [String],
      default: ["student"],
    },
    password:{ type: String, required: true },
    qualifications: { type: String,default:null},
    experience: { type: String,default:null},
    phoneNo: { type: Number },
    city: { type: String ,default:null},
    subject: { type: String,default:null},
    image: { type:String},
    about: { type: String },
    appointed:{
      type:Boolean,
      default:false
    },
    booking:[{ type: mongoose.Schema.Types.ObjectId, ref: "slot"}],
    price:Number
    
  },
  {
    versionKey: false,
  }
);

const UserModel = mongoose.model("user", userSchema);

module.exports = { UserModel };