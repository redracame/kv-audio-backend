import express from "express";
import { addProduct } from "../contol/productController.js";
import product from "../moduless/product.js";


const productRouter = express.Router();

productRouter.post("/",addProduct)


export default productRouter;