// Basic import
const express = require("express");
const app = new express();
const bodyParser = require("body-parser");

// security middleware import

const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const hpp = require("hpp");
const cors = require("cors");

// router import from api.js
const router = require("./src/routes/api")

// database library import
const mongoose = require("mongoose");

// securiy middleware implement
app.use(helmet());
app.use(hpp());
app.use(cors());
app.use(xss());
app.use(mongoSanitize());
app.use(helmet());

// body parser implement
app.use(bodyParser.json());

// rate limit implement
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, //15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});

app.use(limiter);

// database connection (mongoose)
const uri = "mongodb://127.0.0.1:27017/Todo";
const options = { user: "", pass: "", autoIndex:true };

mongoose.connect(uri, options, (err) => {
  if (err) {
    console.log("connection failed");
  } else {
    console.log("connection success");
  }
});

// Routing
app.use("/api/v1", router);

// undefine route
app.use("*", (req, res) => {
  res.status(404).json({ status: "failed", data: "not found" });
});

// module exports

module.exports = app;
