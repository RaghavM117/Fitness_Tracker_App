import createHttpError from "http-errors";

export const adminOnly = (req, res, next) => {
    if (req.user.role !== "admin") {
        return next(createHttpError(403, "Admin Access Only!"));
    }
    next();
};

export default adminOnly;
