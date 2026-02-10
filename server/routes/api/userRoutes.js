import { Router } from "express";
import validate from "../../middlewares/validate.js";
import auth from "../../middlewares/auth.js";
import { sendAuthTokens } from "../../controllers/tokenControllers.js";
import {
    registerSchema,
    loginSchema,
    passwordSchema,
} from "../../validation/authSchema.js";
import { registerUser, logIn } from "../../controllers/authControllers.js";
import {
    changePassword,
    getUserProfile,
    patchUser,
    deleteUser,
} from "../../controllers/userControllers.js";
import { patchUserSchema } from "../../validation/userSchema.js";

const router = Router();

router.post(
    "/register",
    validate(registerSchema),
    registerUser,
    sendAuthTokens,
);

router.post("/login", validate(loginSchema), logIn, sendAuthTokens);

router.patch("/changePassword", auth, validate(passwordSchema), changePassword);

// profile management
router
    .route("/meProfile")
    .all(auth)
    .get(getUserProfile)
    .patch(validate(patchUserSchema), patchUser)
    .delete(deleteUser);

export default router;
