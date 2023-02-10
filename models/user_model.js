const mongoose = require("mongoose");
const {Schema} = require("mongoose");

const user_schema = new Schema({
    name:{
        type:String,
        required: true,

    },
    email:{
        type:String,
        required: true,
    },
    password:{
        type:String,
        required: true,
    }
})

const userModel = mongoose.model("users",user_schema);
module.exports = userModel;