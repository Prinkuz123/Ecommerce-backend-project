const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();


let mongoDB =
  "mongodb+srv://priyankapk793:58JgerHdBYLCgDwX@cluster0.2fbmx6b.mongodb.net/";
let port = 5000;
try {
  app.listen(port, () => {
    console.log("listening on port 5000");
  });
} catch (err) {
  console.log("error", err);
}

app.use(express.json()); //x

//requiring user router
const userRouter = require("./src/Routes/userRouter");
app.use("/", userRouter);



//requiring admin router
const adminRouter = require("./src/Routes/adminRouter");
app.use("/", adminRouter);





main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(mongoDB);
  console.log("db conected");
}
