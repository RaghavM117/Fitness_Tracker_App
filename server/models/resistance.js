import mongoose from "mongoose";

const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const resistanceSchema = new Schema(
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
        weight: {
            value: {
                type: Number,
                required: true,
                min: 0,
            },
            unit: {
                type: String,
                required: true,
                enum: ["kg", "lbs"],
                default: "kg",
            },
        },
        sets: {
            type: Number,
            required: true,
            min: 1,
        },
        reps: {
            type: Number,
            required: true,
            min: 1,
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

// to automatically include total weights lifted after each workout
resistanceSchema.virtual("volume").get(function () {
    return this.weight * this.sets * this.reps;
});

// Optimizing user workout history queries
resistanceSchema.index({ user: 1, date: -1 });

export const Resistance = mongoose.model("Resistance", resistanceSchema);
