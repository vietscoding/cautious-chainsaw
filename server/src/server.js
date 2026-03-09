import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import transcriptRoutes from "./routes/transcriptRoutes.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/transcript", transcriptRoutes)

// app.use((req, res, next) => {

//     // giả lập user đã login
//     req.user = {
//         id: 1,
//         name: "Alice"
//     };


//     next();
// });

app.listen(port, () =>
    console.log(`Server running on port ${port}`)
);