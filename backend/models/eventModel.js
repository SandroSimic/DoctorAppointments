import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import validator from "validator";

const eventSchema = new mongoose.Schema({
  doctorFullName: {
    type: String,
    required: [true, "Doctor First Name is required"],
  },
  specialization: {
    type: String,
    required: [true, "Specialization is required"],
  },
  experience: {
    type: String,
    required: [true, "Experience is required"],
  },
  consultationFees: {
    type: Number,
    required: [true, "Consultation fees is required"],
  },
  start_date: {
    type: Date,
    required: [true, "Event start date is required"],
  },
  start_time: {
    type: String,
    required: [true, "Event start time is required"],
  },
  status: {
    type: String,
    enum: ["taken", "available"],
    default: "available",
  },
  doctor: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: [true, "Event must belong to a user"],
  },
});

const Event = mongoose.model("Event", eventSchema);
export default Event;
