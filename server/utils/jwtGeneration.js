import jwt from "jsonwebtoken";
import createHttpError from "http-errors";

const access_secret = process.env.JWT_SECRET;

const signAccessToken = (userId, role) => {
    if (!access_secret) {
        throw createHttpError(500, "Access token Secret key missing!");
    }
    return jwt.sign({ id: userId, role }, access_secret, { expiresIn: "3h" });
};

export default signAccessToken;
