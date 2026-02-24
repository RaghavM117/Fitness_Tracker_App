import Router from "express";
import { sendAuthTokens } from "../../controllers/tokenControllers.js";
import {
    registerUser,
    logIn,
    logout,
} from "../../controllers/authControllers.js";
import { registerSchema, loginSchema } from "../../validation/authSchema.js";
import validate from "../../middlewares/validate.js";
import passport from "passport";
import { refreshAccessToken } from "../../controllers/refreshControllers.js";

const router = Router();

// local Auth
router.post(
    "/register",
    validate(registerSchema),
    registerUser,
    sendAuthTokens,
);

router.post("/login", validate(loginSchema), logIn, sendAuthTokens);

router.post("/logout", logout);

// Github Auth Trigger
router.get(
    "/github",
    passport.authenticate("github", { scope: ["user:email"] }),
);

// github auth callback
router.get(
    "/github/callback",
    passport.authenticate("github", {
        session: false,
        failureRedirect: "/login",
    }),
    (req, res, next) => next(),
    sendAuthTokens,
);

router.post("/refresh", refreshAccessToken);

export default router;
