require("dotenv").config();

const app = require("./src/app.js");
const connectDb = require("./src/config/db");

connectDb();

app.listen(process.env.PORT, (req, res) => {
  console.log(`listening on port ${process.env.PORT}`);
});
