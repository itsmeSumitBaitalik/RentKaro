import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import { userRoute } from "./routes/user.route.js";
import { connectDB } from "./db.js";
import cookieParser from "cookie-parser";

connectDB();
const app = express();

// ✅ Apply CORS middleware
app.use(cors())
app.use(cookieParser())

app.use(express.json());

app.use("/api/auth", userRoute);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
});
