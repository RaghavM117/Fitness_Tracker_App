import express from "express";
import cors from "cors";
import connectDB from "./config/connection.js";
import notFound from "./middlewares/notFound.js";
import errorHandler from "./middlewares/errorHandler.js";
import logger from "./middlewares/logger.js";
import apiRouter from "./routes/index.js";
import userRoutes from "./routes/api/userRoutes.js";
import workoutRoutes from "./routes/api/workoutRoutes.js";

const PORT = process.env.PORT || 5000;
const app = express();

await connectDB();
app.use(express.json());
app.use(cors());

app.use(logger);

// routes
app.use("/api", apiRouter);
app.use("/api/user", userRoutes);
app.use("/api/workout", workoutRoutes);

app.use(notFound);

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server is being listened on the PORT: `, PORT);
});
