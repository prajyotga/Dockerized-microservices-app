require("dotenv").config();

const express=require("express");
const cors=require("cors");

const app= express();

const connectDb = require("./src/config/db");
const authRoutes=require("./src/routes/authRoutes");

connectDb();

app.use(cors());
app.use(express.json());

app.use("/api/auth",authRoutes);

app.listen(process.env.PORT, (req, res) => {
  console.log(`listening on port ${process.env.PORT}`);
});
