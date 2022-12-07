import User from "../Models/user-model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const user_controller = {
  _createAccount: async (req, res, next) => {
    try {
      const {
        fullname,
        phone,
        email,
        password,
        state,
        local_government,
        profile_picture,
        usertype,
      } = req.body;

      const findUser = await User.findOne({ fullname: fullname, email: email });
      if (findUser != null) {
        res.status(400).json({
          data: "User Already exists, accounts cannot be duplicated!",
        });
      } else {
        if (
          !fullname ||
          !phone ||
          !email ||
          !password ||
          !state ||
          !local_government
        ) {
          res.status(400).json({ data: "Fill in all required details" });
        } else {
          const user = await new User();
          user.fullname = fullname;
          user.phone = phone;
          user.email = email;
          user.state = state;
          user.local_government = local_government;
          user.profile_picture = profile_picture;
          user.usertype = usertype;

          bcrypt.genSalt(10, (err, salt) => {
            if (!err) {
              bcrypt.hash(password, salt, async (err, hash) => {
                if (!err) {
                  user.password = hash;
                  const newUser = await user.save();
                  res.status(200).json({ data: newUser });
                }
              });
            }
          });
        }
      }
    } catch (error) {
      res
        .status(400)
        .json({ data: "Internal Server Error, Please Contact Support" });
    }
  },

  _authAccount: async (req, res, next) => {
    const { email, password } = req.body;
    console.log(email);
    try {
      if (!password || !email) {
        res.status(400).json({
          data: "Please provide all fields",
        });
      } else {
        const UserDetails = await User.findOne({ email: email });
        console.log(UserDetails);
        if (UserDetails) {
          if (UserDetails.email === email) {
            bcrypt.compare(password, UserDetails.password, (err, isMatch) => {
              if (isMatch) {
                const payload = {
                  id: UserDetails._id,
                  email: UserDetails.fullname,
                };
                const accesstoken = jwt.sign(payload, "oja", {
                  expiresIn: "2h",
                });

                res.status(200).json({ token: "Bearer " + accesstoken });
              } else {
                res.status(400).json({ data: "Wrong Password!" });
              }
            });
          } else {
            res.status(400).json({
              data: `Are you trying to access ${UserDetails.fullname}'s account?, Your password is wrong!`,
            });
          }
        } else {
          res.status(400).json({
            data: "Sorry, this email is not recognized, you may contact support!",
          });
        }
      }
    } catch (error) {
      res
        .status(400)
        .json({ data: "Internal Server Error, please contact support!" });
    }
  },

  _updateProfile: async (req, res, next) => {
    try {
      const {
        fullname,
        password,
        email,
        phone,
        profilepicture,
        state,
        local_government,
      } = req.body;
      const user = await User.findById(req.params.id);
      if (user) {
        user.fullname = fullname;
        user.state = state;
        user.email = email;
        user.local_government = local_government;
        user.phone = phone;
        user.profile_picture = profilepicture;
        bcrypt.genSalt(10, (err, salt) => {
          if (!err) {
            bcrypt.hash(password, salt, async (err, hash) => {
              if (!err) {
                user.password = await hash;
                user.save();
                res.status(200).json({ data: user });
              }
            });
          }
        });
      }
    } catch (error) {
      res
        .status(400)
        .json({ data: "Internal Server Error, please contact support!" });
    }
  },

  _getUser: async (req, res, next) => {
    try {
      const user = await User.findById(req.params.id);
      res.status(200).json({ data: user });
    } catch (error) {
      res
        .status(400)
        .json({ data: "Internal Server Error, please contact support" });
    }
  },

  _blockUser: async (req, res, next) => {
    try {
      const user = await User.findOneAndUpdate({ status: "Blocked" });
      res.status(200).json({ data: user });
    } catch (error) {
      res
        .status(400)
        .json({ data: "Internal Server Error, please contact support!" });
    }
  },

  _getAllUsers: async(req,res,next)=>{
    try {
        const users = await User.find({});
        res.status(200).json({data: users})
    } catch (error) {
        res.status(400).json({data:"Internal Server Error, please contact support!"})
    }
  }
};
