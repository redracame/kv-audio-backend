import statuses from "statuses";
const message = statuses.message; // Fix for 'statuses' import
import product from "../moduless/product.js";
import Review from "../moduless/review.js";

export function addProduct(req, res) {
   console.log(req.user); // Logs the user details if available
   
   if (req.user == null) {
      res.status(401).json({
         message: "Please login and try again",
      });
      return;
   }
      if(req.user.role != "admin"){

         res.status(403).json({
          message : "You are not authorized to perform this action"  
         })         //you not admin print this this the autherization
         return
      }
   
   const data = req.body;
   const newProduct = new product(data);
   newProduct
      .save()
      .then(() => {
         res.json({ message: "Product added successfully" });
      })
      .catch((error) => {
         res.status(500).json({ error: "Product addition failed" });
      });
}

export function getReviews(req,res){

   const user = req.user;

   if(user == null || user.role !="admin"){
      Review.find({isApproved : true}).then((reviews) =>{
         res.json(reviews);
      })
      return
   }
   if(user.role =="admin"){
      Review.find().then((reviews) =>{
         res.json(reviews);
      })
   }
}