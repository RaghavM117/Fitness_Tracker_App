import express from "express";
import auth from "../../middlewares/auth.js";
import {
    changePassword,
    getUserProfile,
    patchUser,
    deleteUser,
} from "../../controllers/userControllers.js";
import { patchUserSchema } from "../../validation/userSchema.js";
import { validate } from "../../middlewares/validate.js";
import { passwordSchema } from "../../validation/authSchema.js";

const router = express.Router();

router.patch("/changePassword", auth, validate(passwordSchema), changePassword);

// profile management
router
    .route("/meProfile")
    .all(auth)
    .get(getUserProfile)
    .patch(validate(patchUserSchema), patchUser)
    .delete(deleteUser);

export default router;
