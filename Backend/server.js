import express from "express";
import "dotenv/config";
import fetch from "node-fetch";
import cors from "cors";
import mongoose from "mongoose";
import chatRoutes from "./routes/chat.js";

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(cors());
app.use("/api", chatRoutes);

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


