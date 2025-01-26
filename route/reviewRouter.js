// ./route/reviewRouter.js

import express from 'express';
import { addReview, approvelReview, deleteReview } from '../contol/reviewController.js';
import { getReviews } from '../contol/reviewController.js';

const reviewRouter = express.Router();
reviewRouter.post("/", addReview);
reviewRouter.get("/",getReviews)
reviewRouter.delete("/:email",deleteReview)
reviewRouter.put("/approve/:email" ,approvelReview)


export default reviewRouter;
