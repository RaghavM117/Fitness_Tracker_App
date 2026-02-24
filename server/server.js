import express from "express";
import cors from "cors";
import connectDB from "./config/connection.js";
import notFound from "./middlewares/notFound.js";
import errorHandler from "./middlewares/errorHandler.js";
import logger from "./middlewares/logger.js";
import apiRouter from "./routes/index.js";
import userRoutes from "./routes/api/userRoutes.js";
import workoutRoutes from "./routes/api/workoutRoutes.js";
import passport from "./config/passport.js";
import authRoutes from "./routes/api/auth.routes.js";
import cookieParser from "cookie-parser";

const PORT = process.env.PORT || 7000;
const app = express();

await connectDB();
app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(passport.initialize()); //for OAuth

app.use(logger);

// routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/workout", workoutRoutes);
app.use("/", apiRouter);

app.use(notFound);

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server is being listened on the PORT:`, PORT);
});
