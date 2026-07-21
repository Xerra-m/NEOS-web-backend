// dependencies
import dotenv from "dotenv";
import ConnectDB from "./src/configs/db.js";

// load dotenv configs
dotenv.config();

// connect database
ConnectDB();

// import app
import app from "./src/app.js";

// port
const PORT = process.env.PORT || 3000;

// port listen
app.listen(PORT, () => {
  console.log(`Xerra Log - Backend Server jalan di port ${PORT}`);
});
