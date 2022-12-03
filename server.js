import express from "express";
import "./db.js";
import UserRouter from "./Routes/user-route.js";
import bodyParser from "body-parser";
import cors from "cors";
import passport from "passport"
import session from "express-session";
import MongoStore from "connect-mongo";
import dotenv from "dotenv";
import "./config/passport.js";
const server = express();

dotenv.config();

server.use(
  session({
    secret: process.env.PASSPORT_SECRET,
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl: "mongodb+srv://oja:oja@oja.xjriywi.mongodb.net/?retryWrites=true&w=majority",
      collectionName: "sessions",
    }),
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);
server.use(passport.initialize());
server.use(passport.session());

server.use(function (req, res, next) {
  //Enabling CORS
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type"
  );
  next();
});

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(cors());

const port = process.env.PORT || 8081;

server.listen(port, () =>
  console.log(`Server listening on https://localhost:${port}`)
);

server.use("/api", UserRouter);
