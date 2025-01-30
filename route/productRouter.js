import express from "express";
import { addProduct, deleteProduct, getProducts, updateProduct } from "../contol/productController.js";
import product from "../moduless/product.js";


const productRouter = express.Router();

productRouter.post("/",addProduct)
productRouter.get("/",getProducts)
productRouter.put("/:key",updateProduct)
productRouter.delete("/:key",deleteProduct)

export default productRouter;