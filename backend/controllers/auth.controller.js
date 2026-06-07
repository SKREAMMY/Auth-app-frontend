import User from "../models/user.model.js";
import bcryptjs from 'bcryptjs';
import { errorHandler } from "../utils/error.js";
import jwt from 'jsonwebtoken';

export const signUp = async (req, res, next) => {
    const { userName, email, password } = req.body;
    const hashedPassword = bcryptjs.hashSync(password, 10);
    console.log(userName, email, password);
    const newUser = new User({ userName, email, password: hashedPassword });
    try {
        await newUser.save();

        res.status(201).json({
            statusCode: 201,
            success: true,
            message: "User created successfully"
        });
    } catch (err) {
        next(errorHandler(500, err.message));
    }

};

export const signin = async (req, res, next) => {
    const { email, password } = req.body;
    console.log("email and password ", email, password);
    try {
        const validUser = await User.findOne({ email });
        if (!validUser) {
            return next(errorHandler(404, "Invalid Credentials"));
        }

        const validPassword = bcryptjs.compareSync(password, validUser.password);
        if (!validPassword) {
            return next(errorHandler(401, "Wrong Credentials"));
        }


        const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
        console.log("token ", token);
        const { password: hashedPassword, ...rest } = validUser._doc;
        res.cookie('access_token', token, { httpOnly: true }).status(200).json(rest);

    } catch (err) {
        next(err);
    }
}