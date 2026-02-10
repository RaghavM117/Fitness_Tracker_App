import createHttpError from "http-errors";
import bcrypt from "bcryptjs";
import { User } from "../models/index.js";

export const getUserProfile = async (req, res, next) => {
    try {
        const { userId } = req.user._id;

        const user = await User.findById({ userId });

        if (!user) {
            return next(createHttpError(404, "User not Found"));
        }

        res.status(200).json({
            success: true,
            message: "User Info Retrieved successfully!",
            user,
        });
    } catch (err) {
        next(err);
    }
};

export const changePassword = async (req, res, next) => {
    try {
        const { currentPassword, newPassword } = req.body;
        const { userId } = req.user._id;

        const user = await User.findById({ userId }).select("+password");

        const isPassword = await bcrypt.compare(currentPassword, user.password);

        if (!isPassword) {
            return next(createHttpError(400, "Invalid Password"));
        }

        user.password = bcrypt.hash(newPassword, 10);
        await user.save();

        res.send(200).json({
            success: true,
            message: "Password Updated Successfully!",
        });
    } catch (err) {
        next(err);
    }
};

export const patchUser = async (req, res, next) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(
            req.user._id,
            req.body,
            { new: true, runValidators: true },
        );

        if (!updatedUser) {
            return next(createHttpError(404, "User not Found"));
        }

        res.status(200).json({
            success: true,
            message: "User Updated Successfully!",
            updatedUser,
        });
    } catch (err) {
        next(err);
    }
};

export const deleteUser = async (req, res, next) => {
    try {
        const { userId } = req.user._id;

        const user = await User.findByIdAndDelete(userId);

        if (!user) {
            return next(createHttpError(404, "User not Found"));
        }

        res.status(200).json({
            success: true,
            message: "User Deleted successfully!",
            user,
        });
    } catch (err) {
        next(err);
    }
};
