import Product from "../Models/product-model.js";
import User from "../Models/user-model.js";

export const Product_Controller = {
  _createProduct: async (req, res, next) => {
    try {
      const {
        item_name,
        item_category,
        item_subcategory,
        item_pictures,
        item_price,
        user_id,
        item_description,
      } = req.body;

      if (!item_price || !item_category || !item_name || !user_id) {
        res.status(400).json({ data: "Ensure all item details are entered!" });
      } else {
        const newProduct = new Product();
        newProduct.user_id = user_id;
        newProduct.item_name = item_name;
        newProduct.item_category = item_category;
        newProduct.item_description = item_description;
        newProduct.item_price = item_price;
        newProduct.item_subcategory = item_subcategory;
        newProduct.item_pictures.push(item_pictures);
        const pushedProduct = await newProduct.save();

        res.status(200).json({ data: pushedProduct });
      }
    } catch (error) {
      res.status(400).json({
        data: "Internal Server Error, Please try again or contact support!",
      });
    }
  },

  _getSellerProduct: async (req, res, next) => {
    try {
      const product = await Product.find({ user_id: req.params.id });
      product &&
        res.status(200).json({
          data: product,
        });
    } catch (error) {
      res.status(400).json({
        data: "Could not fetch products at the moment, please contact support or refresh your page.",
      });
    }
  },

  _deleteSellerProduct: async (req, res, next) => {
    try {
      const product = await Product.findOneAndDelete({ _id: req.params.id });
      res.status(200).json({ data: product.item_name });
    } catch (error) {
      res
        .status(400)
        .json({ data: "Internal Server Error, please contact support!" });
    }
  },

  _getApprovedProducts: async (req, res, next) => {
    try {
      const products = await Product.find({ item_approval: true });
      res.status(200).json({ data: products });
    } catch (error) {
      res
        .status(400)
        .json({ data: "Internal Server Error, please contact support!" });
    }
  },

  _getPendingProducts: async (req, res, next) => {
    try {
      const products = await Product.find({ item_approval: false });
      res.status(200).json({ data: products });
    } catch (error) {
      res.status(400).json({
        data: "Internal Server Error, please contact support!",
      });
    }
  },

  _getAllProducts: async (req, res, next) => {
    try {
      const products = await Product.find();
      res.status(200).json({
        data: products,
      });
    } catch (error) {
      res.status(400).json({
        data: "Internal Server Error, please contact support!",
      });
    }
  },

  _getAProduct: async (req, res, next) => {
    try {
      const product = await Product.findById({ _id: req.params.id });
      res.status(200).json({ data: product });
    } catch (error) {
      res.status(400).json({
        data: "Internal Server Error, please contact support!",
      });
    }
  },

  _approveSellerProduct: async (req, res, next) => {
    try {
      console.log(req.params.id);
      const product = await Product.findById({ _id: req.params.id });
      console.log(product);
      product.item_approval = true;
      product.save();
      res.status(200).json({ data: product.item_name });
    } catch (error) {
      res
        .status(400)
        .json({ data: "Internal server errror, please contact support!" });
    }
  },

  _getProductSeller: async (req, res, next) => {
    try {
      const { user_id } = req.body;
      console.log(user_id);
      const seller = await User.findOne({ _id: user_id });
      seller && res.status(200).json({ data: seller });
      !seller &&
        res.status(400).json({
          data: "Seller's product can not be found!, this may be a technical issue.",
        });
    } catch (error) {
      res
        .status(400)
        .json({ data: "Internal Server Error, please contact support!" });
    }
  },

  _getProductCategory: async (req, res, next) => {
    try {
      const { query } = req.body;
      const product = await Product.find({ item_category: query });
      if (product) {
        res.status(200).json({ data: product });
      } else {
        res.status(400),
          json({ data: "Could not find any product in this category..." });
      }
    } catch (error) {
      res
        .status(400)
        .json({ data: "Internal Server Error, please contact support!" });
    }
  },
};
