import mongoose from "mongoose";


const appointmentSchema = new mongoose.Schema({
  patient: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: [true, "An appointment must have a patient"],
  },
  doctor: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: [true, "An appointment must have a patient"],
  },
  event: {
    type: mongoose.Schema.ObjectId,
    ref: "Event",
    required: [true, "An appointment must have an event"],
  },
  status: {
    type: String,
    enum: ["approved", "pending", "rejected"],
    default: "pending",
    required: true
  },
});

const Appointment = mongoose.model("Appointment", appointmentSchema);
export default Appointment;
