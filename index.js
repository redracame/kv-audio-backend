// index.js

import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import userRouter from './route/userRouter.js';
import productRouter from './route/productRouter.js';
import jwt, { decode } from "jsonwebtoken"


// Initialize Express
const app = express();
app.use(bodyParser.json()); // Middleware to parse JSON requests
app.use((req, res, next) => {
  let token = req.header("Authorization"); // Retrieve the token from the Authorization header

  if (token != null) {
    token = token.replace("Bearer ", ""); // Remove "Bearer" prefix and trim whitespace

    jwt.verify(token, "kv secret 89", (err, decoded) => {
      if (!err) {
          req.user = decoded;// Successfully decoded token
      } 
    });
  } 
  next();
});


// MongoDB connection
const mongoUrl = 'mongodb+srv://admin:123@cluster0.rsslm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected successfully'))
  .catch((err) => console.error('MongoDB connection error:', err));

app.use("/api/Users" , userRouter)
app.use("/api/products",productRouter)


// Start the Server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
