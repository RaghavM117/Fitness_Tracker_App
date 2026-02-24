import createHttpError from "http-errors";
import jwt from "jsonwebtoken";
import { User } from "../models/index.js";

const secret_key = process.env.JWT_SECRET;

const auth = async (req, res, next) => {
    try {
        let token;

        if (req.headers.authorization?.startsWith("Bearer ")) {
            token = req.headers.authorization.split(" ")[1];
        } else if (req.cookies?.accessToken) {
            token = req.cookies.accessToken;
        }

        if (!token) {
            return next(createHttpError(401, "Authentication Required"));
        }

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
