import createHttpError from "http-errors";
import jwt from "jsonwebtoken";
import { User } from "../models/index.js";

const secret_key = process.env.JWT_SECRET;

const auth = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            throw createHttpError(401, "Authentication Required");
        }

        const token = authHeader.split(" ")[1];

        const decoded = jwt.verify(token, secret_key);

        const user = await User.findById(decoded.id);

        if (!user) {
            throw createHttpError(401, "User no Longer exists");
        }
        req.user = user; // storing real mongoDB user in mongoDB
        next();
    } catch (err) {
        return next(createHttpError(401, "Invalid or Expired token"));
    }
};

export default auth;
