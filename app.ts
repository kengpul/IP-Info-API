import express, { Express, Request, Response } from "express";
import mongoose from "mongoose";
const app: Express = express();
import userRoute from "./routes/user"

const dbUrl = process.env.MONGO_URI || "mongodb://localhost:27017/ipinfo";
mongoose.set("strictQuery", false);
mongoose.connect(dbUrl);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
    res.send("Hellos")
})

app.use("/user", userRoute)


app.listen(3000, () => {
    console.log("running on port 3000")
})