import express from "express";
import { addReview } from "../contol/reviewController.js";

const reviewRouter =express.Router();
reviewRouter.post("/",addReview)