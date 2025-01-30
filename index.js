// index.js

import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import userRouter from './route/userRouter.js';
import productRouter from './route/productRouter.js';
import jwt, { decode } from "jsonwebtoken"
import dotenv from "dotenv";
import reviewRouter from './route/reviewRouter.js'; 
import inquiryRouter from './route/inquiryRouter.js';

dotenv.config();


// Initialize Express
const app = express();
app.use(bodyParser.json()); // Middleware to parse JSON requests
app.use((req, res, next) => {
  let token = req.header("Authorization"); // Retrieve the token from the Authorization header

  if (token != null) {
    token = token.replace("Bearer ", ""); // Remove "Bearer" prefix and trim whitespace

    jwt.verify(token, process.env.JWT__SECRET, (err, decoded) => {
      if (!err) {
          req.user = decoded;// Successfully decoded token
      } 
    });
  } 
  next();
});


// MongoDB connection
const mongoUrl = process.env.MONGO_URL;
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected successfully'))
  .catch((err) => console.error('MongoDB connection error:', err));

app.use("/api/Users" , userRouter)
app.use("/api/products",productRouter)
app.use("/api/reviews",reviewRouter);
app.use("/api/inquiries", inquiryRouter);

// Start the Server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
