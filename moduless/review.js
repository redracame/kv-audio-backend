import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
    email :{
        type : String,
        required : true,
        unique : true

    },
    name : {
        type : String,
        required :true
    },
    rating : {
        type : Number,
        required : true

    },
    Comment : {
        type : String,
        required : true
    },
    date : {
       type : Date,
       required : true,
       default : Date.now()
    },
    profilePicture : {
    type : String,
    required : true,
    default :"https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.freepik.com%2Ffree-photos-vectors%2Fdefault-user&psig=AOvVaw3ImtXK2TViiJefvr-MgfjY&ust=1737623725555000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCOC0_P7-iIsDFQAAAAAdAAAAABAJ"
    },
     isApproved : {
        type : Boolean,
        required :true,
        default : false
     }

})

const Review = mongoose.model("Review",reviewSchema);
export default Review;