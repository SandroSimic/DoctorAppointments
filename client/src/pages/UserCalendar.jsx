import { Calendar, momentLocalizer } from "react-big-calendar";
import { useState, useEffect } from "react";
import { useUserAppointments } from "../hooks/Appointments/useUserAppointments";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

const UserCalendar = () => {
  const [allEvents, setAllEvents] = useState([]);
  const { data: appointments, isLoading } = useUserAppointments();

  useEffect(() => {
    if (appointments) {
      const formattedAppointments = appointments?.appointments?.map(
        (appointment) => {
          const startDate = moment(`${appointment.event.start_date}`).format(
            "MM/DD/YYYY"
          );
          const startTime = moment(
            `${appointment.event.start_time}`,
            "HH:mm"
          ).format("HH:mm");
          const endDate = moment(`${appointment.event.start_date}`).format(
            "MM/DD/YYYY"
          );
          const titleWithTime = `${appointment.event.doctorFullName} (${startTime})`;

          return {
            title: titleWithTime,
            start: startDate,
            end: endDate,
            status: appointment.status,
          };
        }
      );

      setAllEvents(formattedAppointments);
    }
  }, [appointments]);

  const eventStyleGetter = (event) => {
    let backgroundColor = "";
    switch (event.status) {
      case "pending":
        backgroundColor = "bg-gray-400";
        break;
      case "rejected":
        backgroundColor = "bg-red-400";
        break;
      case "approved":
        backgroundColor = "bg-green-400";
        break;
      default:
        backgroundColor = "bg-blue-400";
    }
    return { className: backgroundColor };
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      <Calendar
        localizer={localizer}
        events={allEvents}
        startAccessor="start"
        endAccessor="end"
        eventPropGetter={eventStyleGetter}
        style={{ height: "100vh", padding: "50px" }}
        views={["month"]}
        defaultView="month"
      />
    </div>
  );
};

export default UserCalendar;
