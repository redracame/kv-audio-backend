import statuses from 'statuses';
const { message } = statuses;
// Importing statuses library
import product from "../moduless/product.js"; // Importing the product model
import { isItAdmin } from './userController.js';
import e from 'express';

export async function addProduct(req, res) {
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

export async function getProducts(req, res) {
   try {
      if (isItAdmin(req)) {
         // Fetch all products if the user is an admin
         const products = await product.find();
         res.json(products); // Send all products
      } else {
         // Fetch only available products for non-admin users
         const products = await product.find({ availability: true });
         res.json(products); // Send available products
      }
   } catch (e) {
      res.status(500).json({
         message: "Failed to fetch products", // Handle errors gracefully
      });
   }
}

export async function updateProduct(req, res) {
  try {
   if (isItAdmin(req)) {
      const key = req.params.key;
      const data = req.body;

      await product.updateOne({ key: key }, { $set: data }); // ✅ Fixed updateOne syntax

      res.json({
         message: "Product updated successfully"
      });
      return;
   } else {
      res.status(403).json({
        message: "You are not authorized to perform this action"
      });
      return;
   }
  } catch (e) {
   res.status(500).json({
      message: "Failed to update product"
   });
  }
}
export async function deleteProduct(req, res) {
   try {
      if (isItAdmin(req)) {
         const key = req.params.key;
         await product.deleteOne({ key: key });

         res.json({
            message: "Product deleted successfully"
         }); 
         return; // Ensure function exits after response
      } else {
         res.status(403).json({
            message: "You are not authorized to perform this action"
         });
         return;
      }
   } catch (e) {
      res.status(500).json({
         message: "Failed to delete product"
      });
   }
}
