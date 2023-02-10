const mongoose = require("mongoose");
const {Schema} = require("mongoose");

const blog_schema = new Schema({
    title:{
        type:String,
        required: true,

    },
    description:{
        type:String,
        required: true,
    },
    content:[{
        type:String,
        
    }],
    isPrivate:{
        type:Boolean,
        default: false,
        required: true,
    },
    createdAt:{
        type:Date,
        default: Date.now()
    },
    createdBy:{
        type:String,
        required: true,
    }
})

const blogModel = mongoose.model("blogs", blog_schema);
module.exports = blogModel;