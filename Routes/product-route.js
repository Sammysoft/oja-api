import Product from "../Models/product-model.js";

export default Product_Controller = {
  _createProduct: async (req, res, next) => {
    try {
      const newProduct = new Product();
      newProduct.user_id = user_id;
      newProduct.item_name = item_name;
      newProduct.item_category = item_category;
      newProduct.item_description = item_description;
      newProduct.item_price = item_price;
      newProduct.item_subcategory = item_subcategory;
      newProduct.pictures.push(pictures);
      const pushedProduct = await newProduct.save();
      res.status(200).json({ data: pushedProduct });
    } catch (error) {
      res
        .status(400)
        .json({
          data: "Internal Server Error, Please try again or contact support!",
        });
    }
  },
};
