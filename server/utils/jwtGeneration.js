import jwt from "jsonwebtoken";
import createHttpError from "http-errors";

const access_secret = process.env.JWT_SECRET;
const refresh_secret = process.env.JWT_REFRESH_SECRET;

export const signAccessToken = (userId, role) => {
    if (!access_secret) {
        throw createHttpError(500, "Access token Secret key missing!");
    }
    return jwt.sign({ id: userId, role }, access_secret, { expiresIn: "30m" });
};

export const signRefreshToken = (userId, role) => {
    if (!refresh_secret) {
        throw createHttpError(500, "Refresh token Secret key missing!");
    }
    return jwt.sign({ id: userId, role }, refresh_secret, { expiresIn: "7d" });
};
