import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    key: {
        type : String,
        required : true,
        unique  : true
    },
    name : {
        type : String,
        required : true
    },
    price : {

        type :  Number,
        required :true
    },
    category : {
        type : String,
        required : true,
        default :"uncatgorized"
    },
    dimensions :{
        type : String,
        required :true
    },
    description : {

        type : String,
        required : true
    },
    availability : {
      type : String,
      required : true,
      default : true
    },
  image:{
    type : [String],
    required : true,
    default : ["https://source.unsplash.com/600x400/?audio"]

  }
})

const product = mongoose.model("Product",productSchema);

export default product;