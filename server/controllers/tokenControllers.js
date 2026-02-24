import { signAccessToken, signRefreshToken } from "../utils/jwtGeneration.js";

export const sendAuthTokens = async (req, res, next) => {
    try {
        const user = req.user;

        const accessToken = signAccessToken(user._id, user.role);
        const refreshToken = signRefreshToken(user._id, user.role);

        user.refreshToken = refreshToken;
        await user.save();

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "Strict",
            maxAge: 7 * 24 * 60 * 60 * 1000,
            path: "/",
        });

        res.cookie("accessToken", accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "Strict",
            maxAge: 15 * 60 * 1000,
            path: "/",
        });

        if (user.provider === "github") {
            return res.redirect("http://localhost:5173/auth-success");
        }

        const message =
            req.authAction === "register"
                ? `${user.name} Registered Successfully!`
                : req.authAction === "login"
                  ? `${user.name} Logged In Successfully!`
                  : `${user.name} logged out successfully!`;

        res.status(200).json({
            success: true,
            message,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                avatar: user.avatar,
            },
        });
    } catch (err) {
        next(err);
    }
};
