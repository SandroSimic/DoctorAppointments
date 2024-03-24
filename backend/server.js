import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import connectDB from "./config/db.js";
import cookieParser from "cookie-parser";
import globalErrorHandler from "./controllers/errorControllers.js";
import userRouter from "./routes/userRoutes.js";
import eventRouter from "./routes/eventRoutes.js";
import appointmentRouter from "./routes/appointmentRoutes.js";
import { rejectExpiredAppointments } from "./middleware/rejectExpiredAppointmentsMiddleware.js";

connectDB();
const app = express();

app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(rejectExpiredAppointments)

app.use("/api/user", userRouter);
app.use("/api/event", eventRouter);
app.use("/api/appointment", appointmentRouter);

app.use(globalErrorHandler);

const port = process.env.PORT || 8000;
app.listen(port, (req, res) => {
  console.log(`Server Running on port ${port}`);
});
