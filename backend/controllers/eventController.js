import Event from "../models/eventModel.js";
import AppError from "../utils/appError.js";
import catchAsync from "../utils/catchAsync.js";
import Appointment from "../models/appointmentModel.js";

// @desc  Get events
// @route GET /api/event
// @access Protected
const getEvents = catchAsync(async (req, res, next) => {
  let query;

  //FILTERING - Removes unwanted fields from the query parameters and constructs the query string for filtering
  const reqQuery = { ...req.query };
  const removeFields = [
    "sort",
    "page",
    "limit",
    "skip",
    "search",
    "specialization",
    "status",
  ];
  removeFields.forEach((val) => delete reqQuery[val]);

  // SEARCHING - Constructs a search object based on the provided search keyword
  if (req.query.search) {
    reqQuery.doctorFullName = { $regex: new RegExp(req.query.search, "i") };
  }

  // SPECIALIZATION SEARCHING - Search based on an events specialization
  if (req.query.specialization) {
    reqQuery.specialization = {
      $regex: new RegExp(req.query.specialization, "i"),
    };
  }

  // STATUS FILTERING - Filter by status
  if (req.query.status) {
    reqQuery.status = { $regex: new RegExp(req.query.status, "i") };
  }

  query = Event.find(reqQuery);

  //PAGINATION - Extracts current page number and page size from request query, calculates skip value, and determines total number of pages
  const page = parseInt(req.query.page) || 1;
  const pageSize = parseInt(req.query.limit) || 1;
  const skip = (page - 1) * pageSize;
  const total = await Event.countDocuments(reqQuery);
  const pages = Math.ceil(total / pageSize);

  query = query.skip(skip).limit(pageSize);

  //SORTING - Parses and applies sorting parameters to the query
  if (req.query.sort) {
    const sortByArr = req.query.sort.split(",");

    const sortByStr = sortByArr.join(" ");

    query = query.sort(sortByStr);
  } else {
    query = query.sort("start_time");
  }

  // RESULTS - Fetches events based on the constructed query and sends the paginated result
  const events = await query;
  const allEvents = await Event.find();

  res.status(200).json({
    allEvents: allEvents.length,
    results: events.length,
    page,
    pages,
    data: events,
  });
});

//@desc Get Event by Id
//@route GET /api/event/:eventId
//@access protected
const getEventById = catchAsync(async (req, res, next) => {
  const eventId = req.params.eventId;

  const event = await Event.findById(eventId);

  if (!event) {
    return next(new AppError("Event not found", 404));
  }

  res.status(200).json({ event });
});

// @desc  Create event
// @route POST /api/event
// @access Restricted To Doctor
const createEvent = catchAsync(async (req, res, next) => {
  const {
    doctorFullName,
    specialization,
    experience,
    consultationFees,
    start_date,
    start_time,
  } = req.body;

  if (
    !doctorFullName ||
    !specialization ||
    !experience ||
    !consultationFees ||
    !start_date ||
    !start_time
  ) {
    return next(new AppError("All fields are required", 400));
  }

  //Create the new event
  const event = await Event.create({
    doctorFullName,
    specialization,
    experience,
    consultationFees,
    start_date,
    start_time,
    doctor: req.user._id,
  });

  //save the created event
  const newEvent = await event.save();

  res.status(200).json({ newEvent });
});

// @desc  Update event
// @route PATCH /api/event/eventId
// @access Restricted To Doctor
const updateEvent = catchAsync(async (req, res, next) => {
  const { eventId } = req.params;

  let event = await Event.findById(eventId);

  if (!event) {
    return next(new AppError("Event not found", 404));
  }

  if (event.doctor.toString() !== req.user._id.toString()) {
    return next(
      new AppError("You are not authorized to update this event", 403)
    );
  }

  const {
    doctorFullName,
    specialization,
    experience,
    consultationFees,
    start_date,
    start_time,
  } = req.body;

  event.doctorFullName = doctorFullName;
  event.specialization = specialization;
  event.experience = experience;
  event.consultationFees = consultationFees;
  event.start_date = start_date;
  event.start_time = start_time;

  event = await event.save();

  res.status(200).json({ event });
});

// @desc  Delete event
// @route DELETE /api/event/eventId
// @access Restricted To Doctor
const deleteEvent = catchAsync(async (req, res, next) => {
  const eventId = req.params.eventId;

  let event = await Event.findById(eventId);

  if (!event) {
    return next(new AppError("Event not found", 404));
  }

  // If the events owner is not the same as the logged in user
  if (event.doctor.toString() !== req.user._id.toString()) {
    return next(
      new AppError("You are not authorized to delete this event", 403)
    );
  }

  // Delete all appointments with the event in them
  await Appointment.deleteMany({ event: eventId });

  // Delete the event
  await Event.findByIdAndDelete(eventId);

  res.status(200).json({ message: "Event Deleted" });
});

// @desc  Get events for the currently logged-in doctor
// @route GET /api/event/doctor/me
// @access Protected
const getDoctorsEvents = catchAsync(async (req, res, next) => {
  const doctorId = req.user._id;

  const events = await Event.find({ doctor: doctorId });

  res.status(200).json({
    results: events.length,
    data: events,
  });
});

export {
  createEvent,
  updateEvent,
  deleteEvent,
  getEvents,
  getEventById,
  getDoctorsEvents,
};
