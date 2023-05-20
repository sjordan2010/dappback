/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */

const mongoose = require("mongoose");
require("dotenv").config();


// connect to mongoDB
const MONGO_URI = process.env.DB_URL;

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: "Dappback",
  })
  .then(() => console.log("Connected to Mongo DB."))
  .catch((err) => console.log(err));

module.exports = mongoose
