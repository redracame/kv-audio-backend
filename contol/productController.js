import statuses from "statuses"; // Importing statuses library
import product from "../moduless/product.js"; // Importing the product model

export async function addProduct(req, res) {
   console.log(req.user); // Logs the user details if available (for debugging)

   // Check if the user is logged in
   if (req.user == null) {
      res.status(401).json({
         message: "Please login and try again", // If not logged in, send error
      });
      return;
   }

   // Check if the user has admin privileges
   if (req.user.role != "admin") {
      res.status(403).json({
         message: "You are not authorized to perform this action", // Unauthorized access
      });
      return;
   }

   const data = req.body; // Get the product details from the request body
   const newProduct = new product(data); // Create a new product instance

   try {
      await newProduct.save(); // Save the product to the database
      res.json({ message: "Product added successfully" }); // Respond with success message
   } catch (error) {
      res.status(500).json({ error: "Product addition failed" }); // Handle errors
   }
}
