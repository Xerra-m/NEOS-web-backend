import express from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";

const app = express();

app.use(helmet());
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

export default app;
