import Appointment from "../models/appointmentModel.js";
import User from "../models/userModel.js";
import Event from "../models/eventModel.js";
import catchAsync from "../utils/catchAsync.js";
import AppError from "../utils/appError.js";

// @desc  Get users appointments
// @route GET /api/appointment
// @access Protected
const getUserAppointments = catchAsync(async (req, res, next) => {
  const userId = req.user._id;

  let query;

  const reqQuery = { ...req.query };
  const removeFields = ["status"];
  removeFields.forEach((val) => delete reqQuery[val]);

  if (req.query.status) {
    reqQuery.status = { $regex: new RegExp(req.query.status, "i") };
  }

  const appointments = await Appointment.find({
    $or: [{ doctor: userId }, { patient: userId }],
    ...reqQuery,
  }).populate("doctor patient event");

  res.status(200).json({ result: appointments.length, appointments });
});

// @desc  Book appointment
// @route POST /api/appointment
// @access Restricted To patients
const bookAppointment = catchAsync(async (req, res, next) => {
  const { eventId } = req.body;
  const patientId = req.user._id;

  const existingAppointment = await Appointment.findOne({
    patient: patientId,
    event: eventId,
  });

  if (existingAppointment) {
    return next(new AppError("Appointment already booked", 400));
  }

  const patient = await User.findById(patientId);
  const event = await Event.findById(eventId);

  if (!patient || !event) {
    return next(new AppError("Patient or Event not found", 404));
  }

  const doctor = await User.findById(event.doctor);

  if (!doctor) {
    return next(new AppError("Doctor not found", 404));
  }

  const appointment = await Appointment.create({
    patient,
    doctor,
    event,
    status: "pending",
  });

  res.status(200).json({
    appointment,
  });
});

// @desc  Update appointment
// @route PATCH /api/appointment/:id
// @access Protected (for doctors and possibly patients)
const updateAppointment = catchAsync(async (req, res, next) => {
  const appointmentId = req.params.id;
  const { status } = req.body;
  const userId = req.user._id;

  // This finds the appointment from the appointmentId that is in the params and populates the event
  const appointment = await Appointment.findById(appointmentId).populate(
    "event"
  );

  if (!appointment) {
    return next(new AppError("Appointment not found"));
  }

  // Can not update the appointment if the doctor is not in the appointment
  if (appointment.event.doctor.toString() !== userId.toString()) {
    return next(
      new AppError("You are not authorized to update this appointment", 403)
    );
  }

  appointment.status = status;

  // Update event status to taken if appointment is approved
  if (status === "approved") {
    await Event.findByIdAndUpdate(
      appointment.event._id,
      { status: "taken" },
      { new: true }
    );
  }

  // Save the appointment
  await appointment.save();

  // If there are many users that booked an appointment, only one can be approved. If someone is approved, the others will be rejected
  if (status === "approved") {
    await Appointment.updateMany(
      {
        event: appointment.event,
        _id: { $ne: appointment._id },
      },
      { $set: { status: "rejected" } }
    );
  }

  res.status(200).json({
    appointment,
  });
});

// @desc  Cancel appointment
// @route DELETE /api/appointment/:id
// @access Protected (for patients and possibly doctors)
const cancelAppointment = catchAsync(async (req, res, next) => {
  const appointmentId = req.params.id;
  const userId = req.user._id;

  const appointment = await Appointment.findById(appointmentId).populate(
    "event"
  );

  if (!appointment) {
    return next(new AppError("Appointment not found", 404));
  }

  // Check if user is doctor or patient in the appointment
  const isDoctor = appointment.event.doctor.toString() === userId.toString();
  const isPatient = appointment.patient.toString() === userId.toString();

  if (!isDoctor && !isPatient) {
    return next(
      new AppError("You are not authorized to cancel this appointment", 403)
    );
  }

  // Remove the appointment
  await appointment.deleteOne();

  res.status(200).json({ message: "Appointment canceled" });
});

export {
  bookAppointment,
  updateAppointment,
  cancelAppointment,
  getUserAppointments,
};
