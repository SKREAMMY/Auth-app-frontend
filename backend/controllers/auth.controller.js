import User from "../models/user.model.js";
import bcryptjs from 'bcryptjs';
import { errorHandler } from "../utils/error.js";

export const signUp = async (req, res, next) => {
    const { userName, email, password } = req.body;
    const hashedPassword = bcryptjs.hashSync(password, 10);
    console.log(userName, email, password);
    const newUser = new User({ userName, email, password: hashedPassword });
    try {
        await newUser.save();

        res.status(201).json({
            message: "User created successfully"
        });
    } catch (err) {
        next(errorHandler(500, err.message));
    }

};