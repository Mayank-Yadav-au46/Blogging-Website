const mongoose = require("mongoose");

const url =
  "mongodb+srv://BhaalaDev:Stick1with2me@bhaaladev.irefmnr.mongodb.net/?retryWrites=true&w=majority";

async function dataBase_connect() {
  console.log("Running db_connect");

  try {
    await mongoose.connect(url, { dbName: "blog" });
    console.log("Connection Successfull!");
  } catch (error) {
    console.log("Error connecting to db");
    console.log(error);
    process.exit();
  }
}

module.exports = dataBase_connect;
