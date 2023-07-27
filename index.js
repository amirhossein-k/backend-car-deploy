const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const ConnetDb = require("./Config/db");
const mongoose = require("mongoose");
const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");
const uploadRoutes = require("./routes/uploadRouter");
const detailRoutes = require("./routes/detailRouter");


const singleFile = require("./models/uploadeSingle");

dotenv.config();
const app = express();
app.use(
  cors({
    orgin: "*",
  })
);
app.use(express.json());



const PORT = process.env.PORT || 3000;


app.listen(PORT, () => console.log(`Listening on port ${3000}!`));

ConnetDb();
app.get("/api/test", (req, res) => res.send({ message: "Hello" }));

//Router
app.use("/api/user", userRoutes);
app.use("/api/product", productRoutes);
app.use("/api/detail", detailRoutes);
app.use("/api/uploade", uploadRoutes);





