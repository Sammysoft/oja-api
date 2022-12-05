import express from "express";
import { Product_Controller } from "../Controllers/product-controller.js";


const ProductRouter = express.Router();

ProductRouter.post("/upload", Product_Controller._createProduct);

export default ProductRouter;