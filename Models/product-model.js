import mongoose from "mongoose";

const productSchema = mongoose.Schema({
    pictures:[4],
    user_id: {type: String},
    item_name:{type:String},
    item_category:{type:String},
    item_subcategory:{type:String},
    item_description: {type:String},
    item_price:{type:String}
}, {timestamps: true})

const Product = mongoose.model("Product", productSchema);

export default Product;