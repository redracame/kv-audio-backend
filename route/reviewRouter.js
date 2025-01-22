// ./route/reviewRouter.js

import express from 'express';
import { addReview } from '../contol/reviewController.js';
import { getReviews } from '../contol/productController.js';

const reviewRouter = express.Router();
reviewRouter.post("/", addReview);
reviewRouter.get("/",getReviews)

export default reviewRouter;
