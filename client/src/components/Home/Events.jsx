import EventBox from "./EventBox";
import { useGetEvents } from "../../hooks/Events/useGetEvents";
import moment from "moment";
import { Link } from "react-router-dom";
const Events = ({ data, isLoading }) => {
  return (
    <div className="mt-10 w-full grid xl:grid-cols-5 gap-5">
      {data?.map((event) => (
        <Link key={event._id} to={`/event/${event._id}`}>
          <EventBox
            doctorFullName={event.doctorFullName}
            specialization={event.specialization}
            experience={event.experience}
            status={event.status}
            date={moment(event.start_date).format("DD/MM/YYYY")}
            time={event.start_time}
            fees={event.consultationFees}
          />
        </Link>
      ))}
    </div>
  );
};

export default Events;
