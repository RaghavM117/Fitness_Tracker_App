import bcrypt from "bcryptjs";
import createHttpError from "http-errors";
import { User } from "../models/index.js";

export const registerUser = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;

        const existingUser = await User.findOne({
            $or: [{ name: username }, { email }],
        });

        if (existingUser) {
            return next(createHttpError(409, "User Already Exists"));
        }

        const user = await User.create({
            name: username,
            email,
            password: password,
        });

        req.user = user; //stored or attaching mongodB user
        req.authAction = "register";
        next();
    } catch (err) {
        next(err);
    }
};

export const logIn = async (req, res, next) => {
    try {
        const { identifiers, password } = req.body;

        const user = await User.findOne({
            $or: [{ name: identifiers }, { email: identifiers }],
        }).select("+password");

        if (!user) {
            return next(createHttpError(404, "User not Found"));
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return next(createHttpError(401, "Invalid Credentials"));
        }

        req.user = user;
        req.authAction = "login"; // storing or attaching mongoDB user
        next();
    } catch (err) {
        next(err);
    }
};

export const logout = async (req, res) => {
    res.clearCookie("refreshToken", {
        httpOnly: true,
        sameSite: "Strict",
        secure: process.env.NODE_ENV === "production",
        path: "/",
    });

    res.clearCookie("accessToken", {
        httpOnly: true,
        sameSite: "Strict",
        secure: process.env.NODE_ENV === "production",
        path: "/",
    });

    req.authAction = "logout";
    res.status(200).json({
        success: true,
        message: "Logged Out Successfully!",
    });
};
