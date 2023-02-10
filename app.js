const express = require("express");
const dataBase_connect = require("./DB_configuration");
const router = require("./routes/router");
const dotenv = require("dotenv");
dotenv.config();

const app = express();

const { urlencoded } = require("express");
const cookieParser = require("cookie-parser");

app.use(cookieParser());
app.use(express.json());
app.use(urlencoded({ extended: true }));
app.use(express.static("public"));
app.use("/blog", router);

const PORT = 3700;

app.listen(PORT, () => {
  console.log("Server Satarted");
  dataBase_connect();
});
