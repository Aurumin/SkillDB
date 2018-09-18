// External dependencies
const express = require("express");
const mongoose = require("mongoose");

// Internal dependencies
const keys = require("./config/keys");
const dataRoutes = require("./routes/dataRoutes");

// Connect to the database
mongoose.connect(
  keys.mongoURL,
  { useNewUrlParser: true }
);

// Start app with express
const app = express();

// Use router
dataRoutes(app);

module.exports = app;
