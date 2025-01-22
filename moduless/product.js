import mongoose from "mongoose";

const productSchema = new mongoose.Schema({

    name : {
        type : String,
        required : true
    },
    price : {

        type :  Number,
        required :true
    },
    description : {

        type : String,
        required : true
    },
isApproved : {
    type : Boolean,
    required : true,
    default :false
}

})

const product = mongoose.model("Product",productSchema);

export default product;