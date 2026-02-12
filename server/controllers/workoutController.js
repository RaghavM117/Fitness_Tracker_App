import createHttpError from "http-errors";
import { Cardio, Resistance } from "../models/index.js";

// crud logic for Resistance
export const postResistance = async (req, res, next) => {
    try {
        const resistance = await Resistance.create({
            ...req.body,
            user: req.user._id,
        });

        res.status(201).json({
            success: true,
            message: "Resistance Created Successfully",
            data: resistance,
        });
    } catch (error) {
        next(error);
    }
};

export const getResistance = async (req, res, next) => {
    try {
        const readResistance = await Resistance.findOne({
            _id: req.params.id,
            user: req.user._id,
        });

        if (!readResistance) {
            return next(createHttpError(404, "Resistance not Found"));
        }

        res.status(200).json({
            success: true,
            message: "Resistance Found Successfully",
            data: readResistance,
        });
    } catch (err) {
        next(err);
    }
};

export const getAllResistance = async (req, res, next) => {
    try {
        const readAllResistance = await Resistance.find({ user: req.user._id });

        res.status(200).json({
            success: true,
            message: "All Resistance Found Successfully",
            data: readAllResistance,
        });
    } catch (err) {
        next(err);
    }
};

export const patchResistance = async (req, res, next) => {
    const { id } = req.params;

    try {
        const updatedResistance = await Resistance.findOneAndUpdate(
            { _id: id, user: req.user._id },
            req.body,
            { new: true, runValidators: true },
        );

        if (!updatedResistance) {
            return next(createHttpError(404, "Resistance not found"));
        }

        res.status(200).json({
            success: true,
            message: "Resistance Updated Successfully",
            data: updatedResistance,
        });
    } catch (err) {
        next(err);
    }
};

export const deleteResistance = async (req, res, next) => {
    const { id } = req.params;
    try {
        const deletedResistance = await Resistance.findOneAndDelete({
            _id: id,
            user: req.user._id,
        });

        if (!deletedResistance) {
            return next(createHttpError(404, "Resistance not found"));
        }

        res.status(200).json({
            success: true,
            message: "Resistance Deleted Successfully",
            data: deletedResistance,
        });
    } catch (err) {
        next(err);
    }
};

// crud logic for cardio
export const postCardio = async (req, res, next) => {
    try {
        const cardio = await Cardio.create({
            ...req.body,
            user: req.user._id,
        });

        res.status(201).json({
            success: true,
            message: "Cardio Created Successfully",
            data: cardio,
        });
    } catch (err) {
        next(err);
    }
};

export const getCardio = async (req, res, next) => {
    try {
        const cardio = await Cardio.findOne({
            _id: req.params.id,
            user: req.user._id,
        });

        if (!cardio) {
            return next(createHttpError(404, "Cardio not found"));
        }

        res.status(200).json({
            success: true,
            message: "Cardio Retrieved Successfully",
            data: cardio,
        });
    } catch (err) {
        next(err);
    }
};

export const getAllCardio = async (req, res, next) => {
    try {
        const cardio = await Cardio.find({ user: req.user._id });

        res.status(200).json({
            success: true,
            message: "Cardio Retrieved Successfully",
            data: cardio,
        });
    } catch (err) {
        next(err);
    }
};

export const patchCardio = async (req, res, next) => {
    try {
        const updatedCardio = await Cardio.findOneAndUpdate(
            { _id: req.params.id, user: req.user._id },
            ...req.body,
            { new: true, runValidators: true },
        );
        if (!updatedCardio) {
            return next(createHttpError(404, "Cardio not found"));
        }

        res.status(200).json({
            success: true,
            message: "Cardio Updated Successfully",
            data: updatedCardio,
        });
    } catch (err) {
        next(err);
    }
};

export const deleteCardio = async (req, res, next) => {
    try {
        const deletedCardio = await Cardio.findOneAndDelete({
            _id: req.params.id,
            user: req.user._id,
        });

        if (!deletedCardio) {
            return next(createHttpError(404, "Cardio not found"));
        }

        res.status(200).json({
            success: true,
            message: "Cardio Retrieved Successfully",
            data: deletedCardio,
        });
    } catch (err) {
        next(err);
    }
};
