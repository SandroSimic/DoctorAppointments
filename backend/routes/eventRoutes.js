import express from "express";
import { protect, restrictTo } from "../middleware/authMiddleware.js";
import {
  createEvent,
  deleteEvent,
  getDoctorsEvents,
  getEventById,
  getEvents,
  updateEvent,
} from "../controllers/eventController.js";

const router = express.Router();

router.route("/doctor").get(protect, getDoctorsEvents);
router
  .route("/")
  .post(protect, restrictTo("doctor"), createEvent)
  .get(protect, getEvents);
router
  .route("/:eventId")
  .get(protect, getEventById)
  .patch(protect, restrictTo("doctor"), updateEvent)
  .delete(protect, restrictTo("doctor"), deleteEvent);

export default router;
