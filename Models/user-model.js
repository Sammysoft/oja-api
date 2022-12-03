import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    fullname: {type: String},
    phone: {type: String},
    email: {type: String},
    password:{type:String},
    state:{type:String},
    local_government:{type:String},
    profile_picture:{type:String},
    usertype: {type:String, default: "User"}
}, {timestamps: true})

const User = mongoose.model("User", userSchema);

export default User;