import statuses from "statuses"; // Importing statuses library
import User from "../moduless/user.js"; // Importing the User model
import bcrypt from "bcrypt"; // Importing bcrypt for password hashing
import jwt from "jsonwebtoken"; // Importing JWT for authentication
import dotenv from "dotenv";
dotenv.config(); // Load environment variables

export async function registerUser(req, res) {
   const data = req.body; // Extracting user data from request body

   // Hash the user's password
   data.password = bcrypt.hashSync(data.password, 10);

   const newUser = new User(data); // Create a new user instance

   try {
      await newUser.save(); // Save the user to the database
      res.status(201).json({ message: "User registered successfully" }); // Success response
   } catch (error) {
      console.error("Error saving user:", error); // Debugging log for errors
      res.status(500).json({ error: "User registration failed" }); // Error response
   }
}

export async function loginUser(req, res) {
   const data = req.body; // Extracting login details from request body

   // Check if email and password are provided
   if (!data.email || !data.password) {
      return res.status(400).json({ error: "Email and password are required" });
   }

   try {
      const user = await User.findOne({ email: data.email }); // Find user by email

      if (!user) {
         return res.status(404).json({ error: "User not found" }); // User not found
      }

      // Compare the provided password with the hashed password
      const isPasswordCorrect = bcrypt.compareSync(data.password, user.password);

      if (isPasswordCorrect) {
         // Generate a JWT token
         const token = jwt.sign(
            {
               firstName: user.firstName,
               lastName: user.lastName,
               email: user.email,
               role: user.role,
               profilePicture: user.profilePicture,
            },
            process.env.JWT__SECRET
         );

         res.json({ message: "Login successful", token }); // Success response with token
      } else {
         res.status(401).json({ error: "Login failed" }); // Incorrect password
      }
   } catch (error) {
      console.error("Error during login:", error); // Debugging log
      res.status(500).json({ error: "Internal server error" }); // Error response
   }
}
