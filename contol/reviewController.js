import statuses from 'statuses';// Importing statuses library
import Review from "../moduless/review.js"; // Importing the Review model

export async function addReview(req, res) {
   // Check if the user is logged in
   if (!req.user) {
      return res.status(401).json({ message: "Please login and try again" }); // Not logged in
   }

   const { rating, comment } = req.body; // Extracting rating and comment from the request body

   // Validate that both rating and comment are provided
   if (!rating || !comment) {
      return res.status(400).json({ error: "Rating and comment are required" });
   }

   // Construct the review data with user details
   const data = {
      name: `${req.user.firstName} ${req.user.lastName}`,
      profilePicture: req.user.profilePicture,
      email: req.user.email,
      rating,
      comment,
   };

   try {
      const newReview = new Review(data); // Create a new review instance
      await newReview.save(); // Save the review to the database
      res.json({ message: "Review added successfully" }); // Success response
   } catch (error) {
      console.error("Error saving review:", error); // Debugging log for errors
      res.status(500).json({ error: "Review addition failed" });
   }
}

export async function getReviews(req, res) {
   const user = req.user; // Retrieve the current user

   try {
      // If the user is not an admin, show only approved reviews
      if (user == null || user.role != "admin") {
         const reviews = await Review.find({ isApproved: true }); // Fetch only approved reviews
         res.json(reviews); // Send reviews to the client
         return;
      }

      // If the user is an admin, show all reviews
      if (user.role == "admin") {
         const reviews = await Review.find(); // Fetch all reviews
         res.json(reviews); // Send all reviews to the client
      }
   } catch (error) {
      res.status(500).json({ error: "Failed to fetch reviews" }); // Error response
   }
}

export async function deleteReview(req, res) {
   const email = req.params.email; // Extract email from the route parameter

   // Check if the user is logged in
   if (req.user == null) {
      res.status(401).json({ message: "Please login and try again" }); // Not logged in
      return;
   }

   try {
      // If the user is an admin, they can delete any review
      if (req.user.role == "admin") {
         await Review.deleteOne({ email: email }); // Delete review by email
         res.json({ message: "Review deleted successfully" }); // Success response
         return;
      }

      // If the user is a customer, they can only delete their own review
      if (req.user.role == "customer") {
         if (req.user.email == email) {
            await Review.deleteOne({ email: email }); // Delete their own review
            res.json({ message: "Review deleted successfully" });
         } else {
            res.status(403).json({ message: "You are not authorized to perform this action" }); // Unauthorized
         }
      }
   } catch (error) {
      res.status(500).json({ error: "Review deletion failed" }); // Error response
   }
}

export async function approvelReview(req, res) {
   const email = req.params.email; // Extract the email from route parameter

   // Check if the user is logged in
   if (req.user == null) {
      res.status(401).json({ message: "Please login and try again" }); // Not logged in
      return;
   }

   // Only admin can approve reviews
   if (req.user.role == "admin") {
      try {
         await Review.updateOne(
            { email: email }, // Find the review by email
            { isApproved: true } // Update 'isApproved' to true
         );
         res.json({ message: "Review approved successfully" }); // Success response
      } catch (error) {
         res.status(500).json({ error: "Review approval failed" }); // Error response
      }
   } else {
      res.status(403).json({
         message: "You are not an admin. Only admins can approve the reviews",
      });
   }
}
