import Appointment from "../models/appointmentModel.js";
import catchAsync from "../utils/catchAsync.js";

const rejectExpiredAppointments = catchAsync(async (req, res, next) => {
  // Find all appointments with events where start_date is in the past
  const expiredAppointments = await Appointment.find().populate("event");


  // Find the appointment where the start date is less then the current date (find the appointments that are late)
  const filteredAppointments = expiredAppointments.filter((appointment) => {
    const startTimestamp = Date.parse(appointment.event.start_date);
    return startTimestamp < Date.now();
  });

  // Update status of expired appointments to "rejected"
  for (const appointment of filteredAppointments) {
    appointment.status = "rejected";
    await appointment.save();
  }

  next();
});

export { rejectExpiredAppointments };
