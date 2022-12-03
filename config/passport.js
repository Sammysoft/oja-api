

import User from "../Models/user-model.js";
import { Strategy } from "passport-jwt";
import { ExtractJwt } from "passport-jwt";
import passport from "passport";

var opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = "oja";
// opts.issuer = 'accounts.examplesoft.com';
// opts.audience = 'yoursite.net';
const fakeUser = {
  fullname: ""
}
passport.use(
  new Strategy(opts, function (jwt_payload, done) {
    User.findOne({ _id: jwt_payload.id }, function (err, user) {
      if (err) {
        return done(err, false);
      }
      if (user) {
        return done(null, user);
      } else {
        return done(null, fakeUser);
      }
    });
  })
);
