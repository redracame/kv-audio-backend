import { response } from "express";
import mongoose  from "mongoose";
import { message } from "statuses";

const inquirySchema = new mongoose.Schema({
     id : {
         type : Number,
         required : true,
         unique : true
    
     },
    email : {
    type : String,
    required : true,
    unique : true

},
message : {
     type : String,
     required : true

},
phone : {
    type : Date,
    required : true,
    default : Date.now()
},
response : {
    type : String,
    requi



}



})