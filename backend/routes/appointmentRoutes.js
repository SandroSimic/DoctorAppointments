import express from "express";
import { protect, restrictTo } from "../middleware/authMiddleware.js";
import {
  bookAppointment,
  cancelAppointment,
  getUserAppointments,
  updateAppointment,
} from "../controllers/appointmentController.js";
import { rejectExpiredAppointments } from "../middleware/rejectExpiredAppointmentsMiddleware.js";

const router = express.Router();

router.use(rejectExpiredAppointments);

router
  .route("/")
  .get(protect, getUserAppointments)
  .post(protect, restrictTo("patient"), bookAppointment);
router
  .route("/:id")
  .patch(protect, updateAppointment)
  .delete(protect, cancelAppointment);

export default router;
