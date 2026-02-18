import signAccessToken from "../utils/jwtGeneration.js";

export const sendAuthTokens = (req, res, next) => {
    try {
        const user = req.user;

        const accessToken = signAccessToken(user._id, user.role);

        const message =
            req.authAction === "register"
                ? `${user.name} Registered Successfuly!`
                : `${user.name} Logged In Successfully!`;

        res.status(200).json({
            success: true,
            message,
            accessToken,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
        });
    } catch (err) {
        next(err);
    }
};
