const express=require("express");
const app=express();
const cors=require("cors");
const cookieParser = require("cookie-parser");
const authRoutes=require("./routes/authRoutes");
const userRoutes=require("./routes/userRoutes");
const restaurantRoutes=require("./routes/restaurantRoutes");
const menuRoutes=require("./routes/menuRoutes");



app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth",authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/restaurants",restaurantRoutes);
app.use("/api/menu",menuRoutes);


module.exports=app;