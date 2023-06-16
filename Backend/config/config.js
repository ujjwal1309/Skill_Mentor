const mongoose = require("mongoose");
require("dotenv").config();

const connection = mongoose.connect(process.env.db);

module.exports = { connection };