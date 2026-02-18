import { Resistance, Cardio } from "../models/index.js";

const workoutQuery = (Model) => async (req, res, next) => {
    try {
        // Destructure with default fallbacks for pagination
        // This ensures (page - 1) * limit never results in NaN
        const {
            name,
            from,
            to,
            sort = "desc",
            limit = 10,
            page = 1,
        } = req.query;

        const filter = { user: req.user._id };

        if (name) {
            filter.name = { $regex: name, $options: "i" };
        }

        if (from || to) {
            filter.date = {};
            if (from) filter.date.$gte = new Date(from);
            if (to) filter.date.$lte = new Date(to);
        }

        // Ensure limit and page are treated as numbers
        const limitVal = parseInt(limit);
        const pageVal = parseInt(page);
        const skip = (pageVal - 1) * limitVal;

        const data = await Model.find(filter)
            .sort({ date: sort === "asc" ? 1 : -1 })
            .skip(skip)
            .limit(limitVal);

        res.status(200).json({
            success: true,
            count: data.length,
            data,
        });
    } catch (err) {
        next(err);
    }
};

export const getResistanceQuery = workoutQuery(Resistance);
export const getCardioQuery = workoutQuery(Cardio);
