// dependencies
import express from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";

// import routes
import prRoutes from "./routes/prRoutes.js";

// import middlewares
import { globalError } from "./middlewares/errorHandler.js";

// app
const app = express();

app.use(helmet());
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

// routes, endpoint api
app.use("/api/jadwal", prRoutes);

// error handler
app.use((req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
});
app.use(globalError);

export default app;
