export const validate =
    (schema, property = "body") =>
    (req, res, next) => {
        try {
            const result = schema.safeParse(req[property]);

            if (!result.success) {
                return res.status(400).json({
                    success: false,
                    message: {
                        errors: result.error.issues.map((e) => e.message),
                    },
                });
            }

            // fix for the read query property - since query is only a read-only property express will throw a error if trying to write
            if (property === "query") {
                for (const key in req.query) delete req.query[key];
                Object.assign(req.query, result.data);
            } else {
                req[property] = result.data;
            }

            next();
        } catch (error) {
            next(error);
        }
    };

export default validate;
