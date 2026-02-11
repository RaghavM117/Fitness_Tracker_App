import mongoose from "mongoose";

const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const cardioSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
            maxlength: 50,
        },
        description: {
            type: String,
            required: true,
            trim: true,
            maxlength: 255,
        },
        duration: {
            value: {
                type: Number,
                required: true,
                min: 0,
            },
            unit: {
                type: String,
                required: true,
                enum: ["s", "min", "h"],
                default: "min",
            },
        },
        distance: {
            value: {
                type: Number,
                required: true,
                min: 0,
            },
            unit: {
                type: String,
                required: true,
                enum: ["km", "miles", "m"],
                default: "m",
            },
        },
        date: {
            type: Date,
            default: Date.now,
        },
        user: {
            type: ObjectId,
            ref: "User",
            required: true,
            index: true,
        },
    },
    { timestamps: true, versionKey: false },
);

// compounding index for faster user-date queries
cardioSchema.index({ user: 1, date: -1 });

export const Cardio = mongoose.model("Cardio", cardioSchema);
