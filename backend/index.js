import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import userRoutes from './routes/user.route.js';
import authRoutes from './routes/auth.route.js';

dotenv.config();

mongoose.connect(process.env.MONGO).then(() => {
    console.log("Connected to MongoDB");
}).catch((err) => {
    console.log("error connecting mongodb ", err);
})


const app = express();

app.use(express.json());


app.listen(3000, () => {
    console.log("server listening at port 3000");
});



app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);


app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    return res.status(statusCode).json({
        success: false,
        error: message,
        statusCode: statusCode
    })
});
