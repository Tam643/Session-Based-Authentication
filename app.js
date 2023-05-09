require("dotenv").config();

const express = require("express");
const session = require("express-session");
const ejs = require("ejs");
const app = express();
const indexRoutes = require("./routes/index");
const authRoutes = require("./routes/auth");
app.use(
  session({
    secret: process.env.SECRET,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
    },
    saveUninitialized: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("views", "./views");
app.set("view engine", "ejs");
app.use("/", indexRoutes);
app.use("/auth", authRoutes);

module.exports = app;
