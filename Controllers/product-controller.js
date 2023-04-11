import Product from "../Models/product-model.js";
import User from "../Models/user-model.js";

export const Product_Controller = {
  _createProduct: async (req, res, next) => {
    console.log(req.body);
    try {
      const {
        item_name,
        item_category,
        item_subcategory,
        item_pictures,
        item_price,
        user_id,
        item_description,
        item_status,
        item_state,
        item_local,
        item_phone,
        item_email,
      } = req.body;

      if (
        !item_price ||
        !item_category ||
        !item_name ||
        !user_id ||
        !item_pictures
      ) {
        res.status(400).json({ data: "Ensure all item details are entered!" });
      } else {
        const newProduct = new Product();
        newProduct.user_id = user_id;
        newProduct.item_name = item_name;
        newProduct.item_category = item_category;
        newProduct.item_description = item_description;
        newProduct.item_price = item_price;
        newProduct.item_status = item_status;
        newProduct.item_subcategory = item_subcategory;
        newProduct.item_pictures.push(item_pictures);
        newProduct.item_email = item_email;
        newProduct.item_phone = item_phone;
        newProduct.item_local = item_local;
        newProduct.item_state = item_state;
        const pushedProduct = await newProduct.save();
        res.status(200).json({ data: pushedProduct });
      }
    } catch (error) {
      console.log(error);
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

  _declineSellerProduct: async (req, res, next) => {
    try {
      console.log(req.params.id);
      const product = await Product.findById({ _id: req.params.id });
      console.log(product);
      product.item_approval = false;
      product.declined = true;
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
      const product = await Product.find({
        item_category: query,
        item_approval: true,
      });
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

  _likeProduct: async (req, res, next) => {
    try {
      const { id, user_id } = req.body;
      const product = await Product.findOne({ _id: id });
      let foundProduct = await product.item_likes.indexOf(user_id);
      if (foundProduct !== -1) {
        res.status(400).json({ data: "You already liked this product" });
      } else {
        product.item_likes.push(user_id);
        let likedProduct = await product.save();
        res.status(200).json({
          data: `${likedProduct.item_name} has been added to your favourites`,
        });
      }
    } catch (error) {
      res
        .status(400)
        .json({ data: "Internal Server Error, please contact support!" });
    }
  },

  _getLikedProducts: async (req, res, next) => {
    try {
      const products = await Product.find();
      let likedProducts = [];
      products.map((item) => {
        if (item.item_likes.indexOf(req.params.id) !== -1) {
          likedProducts.push(item);
        }
      });
      res.status(200).json({ data: likedProducts });
    } catch (error) {
      res
        .status(400)
        .json({ data: "Internal Server Error, please contact support!" });
    }
  },

  _getMonthlyMetrics: async (req, res, next) => {
    try {
      const pipeline = [
        {
          $addFields: {
            month: { $month: "$createdAt" }, // add a new field for month of creation
            year: { $year: "$createdAt" }, // add a new field for year of creation
          },
        },
        {
          $match: {
            year: new Date().getFullYear(), // match only the documents created in the current year
          },
        },
        {
          $group: {
            _id: "$month", // group by month of creation
            count: { $sum: 1 }, // count the number of documents in each group
          },
        },
        {
          $sort: { _id: 1 }, // sort the results by month in ascending order
        },
        {
          $group: {
            _id: null,
            data: {
              $push: "$count",
            },
          },
        },
        {
          $project: {
            _id: 0,
            data: {
              $map: {
                input: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
                as: "m",
                in: {
                  $ifNull: [
                    {
                      $first: {
                        $filter: {
                          input: "$data",
                          as: "d",
                          cond: {
                            $eq: [
                              {
                                $indexOfArray: [
                                  [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
                                  "$$m",
                                ],
                              },
                              { $indexOfArray: ["$data", "$$d"] },
                            ],
                          },
                        },
                      },
                    },
                    0,
                  ],
                },
              },
            },
          },
        },
      ];

      const result = await Product.aggregate(pipeline).exec();
      res.status(200).json({ data: result[0].data });
    } catch (error) {
      res
        .status(400)
        .json({ data: "Internal Server Error, please contact support!" });
    }
  },

  _fetchProductByFilter: async (req, res, next) => {
    try {
      const products = await Product.find({
        item_category: req.params.category,
        item_state: req.params.state,
        item_approval: true
      });

      res.status(200).json({data: products})
    } catch (error) {
      res
        .status(400)
        .json({ data: "Internal Server Error, please contact support!" });
    }
  },
};
