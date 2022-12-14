import mongoose from "mongoose";

const productSchema = mongoose.Schema({
    item_pictures:[],
    user_id: {type: String},
    item_name:{type:String},
    item_category:{type:String},
    item_subcategory:{type:String},
    item_description: {type:String},
    item_price:{type:String},
    item_approval:{type:Boolean, default: false},
    item_status:{type:String}
}, {timestamps: true})

const Product = mongoose.model("Product", productSchema);

export default Product;