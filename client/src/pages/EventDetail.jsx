import Button from "../UI/Button";
import { Link, useParams } from "react-router-dom";
import { useEvent } from "../hooks/Events/useEvent";
import moment from "moment";
import { useBookAppointment } from "../hooks/Appointments/useBookAppointment";
import { useLoggedInUser } from "../hooks/Auth/useGetMe";
import { useDeleteEvent } from "../hooks/Events/useDeleteEvent";

const EventDetail = () => {
  const { eventId } = useParams();
  const { data: event, isLoading } = useEvent(eventId);
  const { isLoading: bookingLoading, bookAppointmentQuery } =
    useBookAppointment();
  const { data: user } = useLoggedInUser();
  const { deleteEventQuery } = useDeleteEvent();

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  function handleBookAppointment() {
    bookAppointmentQuery(event.event._id);
  }

  function handleDeleteEvent() {
    deleteEventQuery(event.event._id);
  }

  const isEventOwner = user?._id === event?.event?.doctor;
  console.log(isEventOwner);

  return (
    <div className="p-10 h-full  flex flex-col gap-11">
      <div className="flex   items-center justify-between">
        <div className="flex flex-col gap-3">
          <h1 className="text-5xl">{event?.event?.doctorFullName}</h1>
          <span className="text-xl">{event?.event?.specialization}</span>
        </div>
        {user.role !== "doctor" && (
          <Button
            className={"p-5"}
            onClick={handleBookAppointment}
            disabled={bookingLoading}
          >
            {bookingLoading ? "Booking..." : "Book Appointment"}
          </Button>
        )}
        {isEventOwner && (
          <div className="flex gap-5">
            <Link
              className="p-3 bg-blue-600 hover:bg-blue-300 text-white rounded-lg"
              to={`/event/${event.event._id}/update`}
            >
              Update
            </Link>
            <Button
              className="p-3 bg-red-600 hover:bg-red-300"
              onClick={handleDeleteEvent}
            >
              Delete
            </Button>
          </div>
        )}
      </div>

      <div className="flex  justify-between">
        <div className="flex flex-col gap-5">
          <h2 className="text-2xl font-bold">Experience: </h2>
          <span className="text-xl">{event?.event?.experience} Years</span>
        </div>
        <div className="flex flex-col gap-5">
          <h2 className="text-2xl font-bold">Consultation Fees:</h2>
          <span className="text-xl">{event?.event?.consultationFees}$</span>
        </div>
        <div className="flex flex-col gap-5">
          <h2 className="text-2xl font-bold">Start Date:</h2>
          <span className="text-xl">
            {moment(event?.event?.start_date).format("DD/MM/YYYY")}
          </span>
        </div>
        <div className="flex flex-col gap-5">
          <h2 className="text-2xl font-bold">Start Time:</h2>
          <span className="text-xl">{event?.event?.start_time}</span>
        </div>
        <div className="flex flex-col gap-5">
          <h2 className="text-2xl font-bold">Status:</h2>
          <span className="text-xl">{event?.event?.status}</span>
        </div>
      </div>
    </div>
  );
};

export default EventDetail;
