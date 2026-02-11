export const validate =
    (schema, property = "body") =>
    (req, res, next) => {
        try {
            const result = schema.safeParse(req[property]);

            if (!result.success) {
                return res.status(400).json({
                    success: false,
                    message: {
                        errors: result.errors.issues.map((e) => e.message),
                    },
                });
            }

            req[property] = result.data;
            next();
        } catch (err) {
            next(err);
        }
    };

export default validate;
