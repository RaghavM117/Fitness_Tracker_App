import { Router } from "express";
import auth from "../../middlewares/auth.js";
import { validate } from "../../middlewares/validate.js";
import {
    getWorkoutQuerySchema,
    workoutId,
    postResistanceSchema,
    patchResistanceSchema,
    postCardioSchema,
    patchCardioSchema,
} from "../../validation/workoutSchema.js";
import {
    getCardioQuery,
    getResistanceQuery,
} from "../../utils/workoutQuery.js";
import {
    postResistance,
    // getAllResistance,
    getResistance,
    patchResistance,
    deleteResistance,
    postCardio,
    // getAllCardio,
    getCardio,
    patchCardio,
    deleteCardio,
} from "../../controllers/workoutController.js";

const router = Router();

// Resistance Routes
router
    .route("/resistance")
    .all(auth)
    .post(validate(postResistanceSchema), postResistance)
    // .get(getAllResistance)
    .get(validate(getWorkoutQuerySchema, "query"), getResistanceQuery); // to create and get all resistances also using query logic

router // crud for resistance except create so rud
    .route("resistance/:id")
    .all(auth, validate(workoutId, "params"))
    .get(getResistance)
    .patch(validate(patchResistanceSchema), patchResistance)
    .delete(deleteResistance);

//cardio Routes
router
    .route("/cardio")
    .all(auth)
    .post(validate(postCardioSchema), postCardio)
    // .get(getAllCardio)
    .get(validate(getWorkoutQuerySchema, "query"), getCardioQuery);

//crud for cardio again except created so rud
router
    .route("/cardio/:id")
    .all(auth, validate(workoutId, "params"))
    .get(getCardio)
    .patch(validate(patchCardioSchema), patchCardio)
    .delete(deleteCardio);

export default router;
