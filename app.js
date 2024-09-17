import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import morgan from 'morgan';

import { ipoRouter } from "./routes/ipo.js";
import { rightsRouter } from "./routes/rights.js";
import { bonusRouter } from "./routes/bonus.js";
import { smeRouter } from "./routes/sme.js";
import { dividendRouter } from "./routes/dividend.js";
import { splitsRouter } from "./routes/splits.js";

dotenv.config();

const port = 8080;
const app = express();
app.use(express.json());
app.use(morgan('combined'));
const connectDB = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://admin:${process.env.DB_PASSWORD}@trendingtimesapi.l72ul6k.mongodb.net/StockMarketDb?retryWrites=true&w=majority&appName=TrendingTimesAPI`
    );
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log("Error connecting to mongodb", error);
  }
};

await connectDB();

app.get("/", (req, res) => {
  res.send("HOLLOW WORLD");
});
app
  .use("/api", ipoRouter)
  .use("/api", rightsRouter)
  .use("/api", bonusRouter)
  .use("/api", smeRouter)
  .use("/api", dividendRouter)
  .use("/api", splitsRouter);

app.listen(port, () => {
  console.log("started listening");
});
