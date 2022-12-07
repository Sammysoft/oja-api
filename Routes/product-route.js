import express from "express";
import { Product_Controller } from "../Controllers/product-controller.js";


const ProductRouter = express.Router();

ProductRouter.post("/upload", Product_Controller._createProduct);
ProductRouter.get("/item/:id", Product_Controller._getSellerProduct);
ProductRouter.post("/item/delete/:id", Product_Controller._deleteSellerProduct);
ProductRouter.get("/products/approved", Product_Controller._getApprovedProducts);
ProductRouter.get('/products/pending', Product_Controller._getPendingProducts);
ProductRouter.get("/products", Product_Controller._getAllProducts);

export default ProductRouter;