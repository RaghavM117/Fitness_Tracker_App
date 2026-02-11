import { Router } from "express";
import auth from "../../middlewares/auth";
import validate from "../../middlewares/validate";
import {
    getWorkoutQuerySchema,
    workoutId,
} from "../../validation/workoutSchema";

const router = Router();

// Resistance Routes
router
    .route("/resistance")
    .all(auth)
    .post(validate(postResistanceSchema), postResistance)
    .get(validate(getWorkoutQuerySchema, "query"), getResistances); // to create and get all resistances also using query logic

router // crud for resistance except create so rud
    .route("resistance/:id")
    .all(auth, validate(workoutId, "params"))
    .get(getResistance)
    .patch(validate(patchResistanceSchema))
    .delete(deleteResistance);

//cardio Routes
router
    .route("/cardio")
    .all(auth)
    .post(validate(postCardioSchema), postCardio)
    .get(validate(getWorkoutQuerySchema, "query"), getCardios);

//crud for cardio again except created so rud
router
    .route("/cardio/:id")
    .all(auth, validate(workoutId, "params"))
    .get(getCardio)
    .patch(validate(patchCardioSchema))
    .delete(deleteCardio);

export default router;
