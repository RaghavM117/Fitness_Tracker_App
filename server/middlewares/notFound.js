import createHttpError from "http-errors";

const notFound = (req, res, next) => {
    return next(createHttpError(404, `Route ${req.originalUrl} not found`));
};

export default notFound;
