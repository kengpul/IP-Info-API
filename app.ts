if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
import express, { Express, Request, Response } from "express";
import mongoose from "mongoose";
const app: Express = express();
import userRoute from "./routes/user";
import ipRoute from "./routes/ipInfo";
import cors from "cors";

const dbUrl = process.env.MONGO_URI || "mongodb://localhost:27017/ipinfo";
mongoose.set("strictQuery", false);
mongoose.connect(dbUrl);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
});

app.use(express.json());
app.use(cors());

app.use("/user", userRoute);
app.use("/ip", ipRoute);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port `, PORT);
});
