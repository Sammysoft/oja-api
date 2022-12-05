import Product from "../Models/product-model.js";

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
};
