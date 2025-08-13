import express from "express";
import "dotenv/config";
import fetch from "node-fetch";
import cors from "cors";
import mongoose from "mongoose";
import chatRoutes from "./routes/chat.js";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const PORT = process.env.PORT || 8080;


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());
app.use(cors());
app.use("/api", chatRoutes);


app.use(express.static(path.join(__dirname, "../Frontend/dist")));
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../Frontend/dist", "index.html"));
});

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Connected with Database!");

        app.listen(PORT, () => {
            console.log(`server running on ${PORT}`);
        });

    } catch (err) {
        console.log("Failed to connect with Db", err);
    }
};

connectDB();

