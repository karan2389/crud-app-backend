const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const data = require("./routes/dataRouter")

const app = express();

dotenv.config();

//MONGODB CONNECTION
const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("connected to mongodb.");
  } catch (error) {
    console.error(error);
  }
};
//ROUTES & MIDDLEWARES
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get("/", (req, res) => {
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.send("API is running...");
});
app.use("/api", data)

//SERVER SETUP 
app.listen(4000, () => {
    connect();
    console.log(`server running`);
  });
   