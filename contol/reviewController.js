import pkg  from 'statuses';
const {message} = pkg;
import Review from "../moduless/review.js";

export function addReview(req, res) {
  // Check if the user is authenticated
  if (!req.user) {
    return res.status(401).json({
      message: "Please login and try again",
    });
  }

  const { rating, comment } = req.body;

  // Validate request body
  if (!rating || !comment) {
    return res.status(400).json({
      error: "Rating and comment are required",
    });
  }

  // Construct review data
  const data = {
    name: `${req.user.firstName} ${req.user.lastName}`,
    profilePicture: req.user.profilePicture,
    email: req.user.email,
    rating,
    comment,
  };

  // Save review to database
  const newReview = new Review(data);

  newReview
    .save()
    .then(() => {
      res.json({ message: "Review added successfully" });
    })
    .catch((error) => {
      console.error("Error saving review:", error); // Log the error for debugging
      res.status(500).json({
        error: "Review addition failed",
      });
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
export function deleteReview
(req,res){
   const email = req.params.email;

   if(req.user == null){
   res.status(401).json
   ({message:"Please login and try again"});
   return
   }
   if(req.user.role == "admin"){
    Review.deleteOne({email:email}).then(() => {
     res.json({message:"Review deleted successfully"});
    }).catch(() =>{
        res.status(500).json({error:"Review deletion failed"});
    });
  return
   }
   if(req.user.role == "customer"){

    if(req.user.email == email){
        Review.deleteOne
        ({email:email}).then(() =>{
            res.json({message:"Review delected successfully"});
        }).catch(()=>{
            res.status(500).json({error:"Review deletion failed"});
        });
    }else{
       res.status(403).json
       ({message:"You are not authorized to perform this action"});

    }
    }
   
}
export function approvelReview(req,res){// me update funtion eka
 const email = req.params.email;  //approve karanna onee enail eka dhanna vidhiya

 if(req.user == null){
  res.status(401).json({message:"Please login and try again"});//log wela nathnam lof wenna kiyanne
  return
 }
  if(req.user.role == "admin"){
    Review.updateOne(
      {
        email:email,// meken adhala email eka equal wenna onee adhala kenage email ekata
      },
      {
        isApproved: true, // eka wenas wenna oneeupdate unata passee  me vidhiyata
      }
    ).then(() => {
      res.json({ message: "Review approved successfully"}); //edit eka harinam meka print wenna
    }).catch(() => {
      res.status(500).json({ error: "Review approval failed"});
    });
  }else{
    res.status(403).jason({message: "You are not and admin. only admins can approve the reviews"});//edit eka waradhunoth meka print wenna
  }
}