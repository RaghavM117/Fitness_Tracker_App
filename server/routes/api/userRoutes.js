import { Router } from "express";
import validate from "../../middlewares/validate.js";
import auth from "../../middlewares/auth.js";
import { sendAuthTokens } from "../../controllers/tokenControllers.js";

const router = Router();

router.post(
    "/register",
    validate(registerSchema),
    registerUser,
    sendAuthTokens,
);

router.post("/login", validate(loginSchema), logIn, sendAuthTokens);

router.patch("/changePassword", auth, validate(passwordSchema), changePassword);

export default router;
