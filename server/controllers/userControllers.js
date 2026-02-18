import createHttpError from "http-errors";
import bcrypt from "bcryptjs";
import { User } from "../models/index.js";

export const getUserProfile = async (req, res, next) => {
    try {
        const { _id: userId } = req.user;

        const user = await User.findById(userId);

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
        const { _id: userId } = req.user;

        const user = await User.findById(userId).select("+password");

        if (!user) {
            return next(createHttpError(404, "User not found"));
        }

        const isPasswordValid = await bcrypt.compare(
            currentPassword,
            user.password,
        );

        if (!isPasswordValid) {
            return next(createHttpError(400, "Invalid Password"));
        }

        user.password = newPassword;

        await user.save();

        res.status(200).json({
            success: true,
            message: "Password Updated Successfully!",
        });
    } catch (err) {
        next(err);
    }
};

export const patchUser = async (req, res, next) => {
    try {
        const { _id: userId } = req.user;
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { name: req.body.username, email: req.body.email },
            {
                new: true,
                runValidators: true,
            },
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
        const { _id: userId } = req.user;
        const { confirm } = req.body || {}; // Look for a confirmation in the body

        if (!confirm) {
            return res.status(200).json({
                success: false,
                message:
                    "Are you sure? Please send 'confirm: true' to delete your profile permanently.",
            });
        }

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
