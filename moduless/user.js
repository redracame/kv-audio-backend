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
      default :"https://www.google.com/url?sa=i&url=https%3A%2F%2Fthenounproject.com%2Fbrowse%2Ficons%2Fterm%2Fuser-default%2F&psig=AOvVaw3ImtXK2TViiJefvr-MgfjY&ust=1737623725555000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCOC0_P7-iIsDFQAAAAAdAAAAABAE"

    }
});

const User = mongoose.model("User",userSchema);

export default User;