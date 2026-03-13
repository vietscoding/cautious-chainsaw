import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import profileRoutes from "./routes/profileRoutes.js";
import transcriptRoutes from "./routes/transcriptRoutes.js";
import studentRoutes from "./routes/studentRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import dotenv from "dotenv";
import mysql from "mysql";

dotenv.config();

const app = express();

const port = 5000;

// create a single connection (could also use a pool for automatic reconnect)
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS, // update or store securely
    database: process.env.DB_NAME
});

// establish connection explicitly so we can log errors/fatal states
// any fatal error will mark the connection unusable and require a new one
db.connect(err => {
    if (err) {
        console.error("MySQL connect error", err);
        // optionally shutdown or try reconnect logic here
    } else {
        console.log("MySQL connected");
    }
});


app.use(cors());
app.use(express.json());

app.use("/api/api5", adminRoutes);
app.use("/api/api4", studentRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/transcript", transcriptRoutes);

// db.connect(err => {
//     if (err) {
//         console.error('MySQL connect error', err);
//         // tùy ý: process.exit(1) hoặc thử reconnect
//     } else {
//         console.log('MySQL connected');
//     }
// });

app.get("/accounts", (req, res) => {
    const query = "SELECT * FROM accounts LIMIT 10"
    db.query(query, (err, data) => {
        if (err) return res.json(err);
        console.log("working!");
        return res.json(data);
    })
})

app.get("/", (req, res) => {
    res.json("Hello this is the backend!");
})

app.listen(port, () =>
    console.log(`Server running on port ${port} at ${new Date().toLocaleString()}`)

);