// External dependencies
const express = require("express");
const mongoose = require("mongoose");

// Internal dependencies
const keys = require("./config/keys");

// Connect to the database
mongoose.connect(keys.mongoURL);

// Start app
const app = express();

module.exports = app;
