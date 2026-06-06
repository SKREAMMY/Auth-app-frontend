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
