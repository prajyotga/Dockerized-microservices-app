const mongoose = require("mongoose");

const connectDb = async () => {
  try {
    console.log("MONGO_URL =", process.env.MONGO_URL);

    await mongoose.connect(process.env.MONGO_URL);
    console.log("MongoDB Connected");
    console.log("Connected DB:", mongoose.connection.name);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

module.exports = connectDb;