import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
   
    email : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true
    },
    role : {
        type : String,
        required : true,
        default : "customer"
    },
    firstName : {
        type : String,
        required : true
    },
    lastName : {
        type : String,
        required : true
    },
    address : {
        type : String,
        required : true
    },
    phone : {
        type : String,
        required : true      // above all i type user's structure
    },
    profilePicture : {
      type : String,
      required : true,
      default :"https://via.placeholder.com/150"


    }
});

const User = mongoose.model("User",userSchema);

export default User;