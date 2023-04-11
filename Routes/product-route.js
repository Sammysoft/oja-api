import express from "express";
import { Product_Controller } from "../Controllers/product-controller.js";

const ProductRouter = express.Router();

ProductRouter.post("/upload", Product_Controller._createProduct);
ProductRouter.get("/item/:id", Product_Controller._getSellerProduct);
ProductRouter.post("/item/delete/:id", Product_Controller._deleteSellerProduct);
ProductRouter.get(
  "/products/approved",
  Product_Controller._getApprovedProducts
);

ProductRouter.get("/products/pending", Product_Controller._getPendingProducts);
ProductRouter.get("/products", Product_Controller._getAllProducts);
ProductRouter.get("/product/:id", Product_Controller._getAProduct);
ProductRouter.post("/product/seller", Product_Controller._getProductSeller);
ProductRouter.get(
  "/product/approve/:id",
  Product_Controller._approveSellerProduct
);
ProductRouter.get(
  "/product/disapprove/:id",
  Product_Controller._disApproveSellerProduct
);
ProductRouter.get(
  "/product/decline/:id",
  Product_Controller._declineSellerProduct
);
ProductRouter.post("/product/category", Product_Controller._getProductCategory);
ProductRouter.post("/product/like", Product_Controller._likeProduct);
ProductRouter.get(
  "/product/get/likes/:id",
  Product_Controller._getLikedProducts
);
ProductRouter.get(
  "/product/metrics/all",
  Product_Controller._getMonthlyMetrics
);
ProductRouter.get(
  "/products/filter/:category/:state",
  Product_Controller._fetchProductByFilter
);
export default ProductRouter;
