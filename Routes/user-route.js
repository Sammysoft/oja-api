import express from "express";
import passport from "passport";
import { user_controller } from "../Controllers/user-controller.js";
const Route = express.Router();

Route.post("/onboard", user_controller._createAccount);
Route.post("/auth", user_controller._authAccount);
Route.get(
  "/dashboard",
  passport.authenticate("jwt", { session: false }),
  (req, res, next) => {
    res.status(200).json({
      data: req.user,
    });
    if (!req.user) {
      res.status(400).json({
        data: null
      });
    }
  }
);
Route.post("/profile/update/:id", user_controller._updateProfile);
Route.get("/user/:id", user_controller._getUser);
Route.get("/get/users", user_controller._getAllUsers);
Route.post("/users/block/:id", user_controller._blockUser);
Route.post("/user/get", user_controller._getUserDetails);
export default Route;
