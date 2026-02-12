import { Resistance, Cardio } from "../models/index.js";

const workoutQuery = (Model) => async (req, res, next) => {
    try {
        const { name, from, to, sort, limit, page } = req.query;

        const filter = { user: req.user._id };

        // name filtering
        if (name) {
            filter.name = { $regex: name, $options: "i" };
        }

        // date filtering
        if (from || to) {
            filter.date = {};
            if (from) filter.date.$gte = from;
            if (to) filter.date.$lte = to;
        }

        const skip = (page - 1) * limit;

        const data = await Model.find(filter)
            .sort({ date: sort === "asc" ? 1 : -1 })
            .skip(skip)
            .limit(limit);

        res.status(200).json({
            success: true,
            data,
        });
    } catch (err) {
        next(err);
    }
};

export const getResistanceQuery = workoutQuery(Resistance);
export const getCardioQuery = workoutQuery(Cardio);
