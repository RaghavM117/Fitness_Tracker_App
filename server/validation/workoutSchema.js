import z from "zod";

// zod validation for resistance
export const postResistanceSchema = z
    .object({
        name: z.string().trim().min(2).max(100),
        description: z.string().trim().min(20).max(255),
        weight: z.object({
            value: z.coerce
                .number()
                .nonnegative()
                .min(0, "Weight Cannot be Negative"),
            unit: z
                .enum(["kg", "lbs"], { message: "Invalid Weight Unit" })
                .default("kg"),
        }),
        sets: z.coerce.number().nonnegative().min(1, "Set must be at least 1"),
        reps: z.coerce.number().nonnegative().min(1, "Reps must be at least 1"),
        date: z.coerce.date().optional(),
    })
    .strict();

export const patchResistanceSchema = postResistanceSchema
    .partial()
    .strict()
    .refine((data) => Object.keys(data).length > 0, {
        message: "At least one field must be provided for update",
    });

export const getWorkoutQuerySchema = z.object({
    // validating query logic for both resistances and query
    name: z.string().trim().min(2).max(1000).optional(),
    sort: z.enum(["asc", "desc"]).default("desc"),
    from: z.coerce.date().optional(),
    to: z.coerce.date().optional(),
    before: z.coerce.date().optional(),
    after: z.coerce.date().optional(),
    // pagination: always good for performance
    limit: z.coerce.number().int().positive().default(10),
    page: z.coerce.number().int().positive().default(1),
});

// zod validation for cardio
export const postCardioSchema = z
    .object({
        name: z.string().trim().min(2).max(100),
        description: z.string().trim().min(20).max(255),
        duration: z.object({
            value: z.coerce
                .number()
                .nonnegative()
                .min(1, "Duration Cannot be Negative"),
            unit: z
                .enum(["s", "min", "h"], { message: "Invalid Duration Unit" })
                .default("min"),
        }),
        distance: z.object({
            value: z.coerce
                .number()
                .nonnegative()
                .min(1, "Distance Cannot be Negative"),
            unit: z
                .enum(["m", "km", "miles"], {
                    message: "Invalid Distance Unit",
                })
                .default("m"),
        }),
        date: z.coerce.date().optional(),
    })
    .strict();

export const patchCardioSchema = postCardioSchema
    .partial()
    .strict()
    .refine((data) => Object.keys(data).length > 0, {
        message: "At least one field must be provided to update",
    });

export const workoutId = z.object({
    id: z.string().regex(/^[a-f\d]{24}$/i, "Invalid Mongo ID"),
});
