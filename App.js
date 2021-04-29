const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv/config");
const router = require("./Router/Routerdata");
const app = express();

app.use(express.json());
app.use(cors());

app.use("/", router);

const db_url = process.env.URL;

const Db_connection = async () => {
  try {
    await mongoose.connect(db_url, {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("db connected");
  } catch (error) {
    console.log("errorr");
  }
};
Db_connection();

PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`server ${PORT}`);
});
