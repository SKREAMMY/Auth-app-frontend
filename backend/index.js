import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

mongoose.connect(process.env.MONGO).then(() => {
    console.log("Connected to MongoDB");
}).catch((err) => {
    console.log("error connecting mongodb ", err);
})


const app = express();


app.get('/', (req, res) => {
    res.send("Hello World");
});

app.listen(3000, () => {
    console.log("server listening at port 3000");
});