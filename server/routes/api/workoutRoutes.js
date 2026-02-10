import { Router } from "express";

const router = Router();

// seperate routes for cardio and resistances and defined under /api/cardio and /api/resistance
// cardio routes and resistance routes both include the same routes but dont merge them create seperately
// (POST   /resistance
// GET    /resistance
// GET    /resistance/:id
// PATCH  /resistance/:id
// DELETE /resistance/:id ) for cardio as well

// optional but instead of Get single or Get all resistance or cardio if we want timed get like from this time to that time use query filter
// something like this route ig
// router.get("/getCardio", getCardio) and then this define just using more query filering logic described in workout controller
export default router;
