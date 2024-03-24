import React, { useState } from "react";
import Input from "../UI/Input";
import { useEvent } from "../hooks/Events/useEvent";
import { useParams } from "react-router-dom";
import moment from "moment";
import { useUpdateEvent } from "../hooks/Events/useUpdateEvent";
import toast from "react-hot-toast";

const UpdateEvent = () => {
  const { eventId } = useParams();
  const { data } = useEvent(eventId);
  const event = data?.event;

  const [doctorFullName, setDoctorFullName] = useState(
    event?.doctorFullName || ""
  );
  const [specialization, setSpecialization] = useState(
    event?.specialization || ""
  );
  const [experience, setExperience] = useState(event?.experience || "");
  const [consultationFees, setConsultationFees] = useState(
    event?.consultationFees || ""
  );
  const [startDate, setStartDate] = useState(
    moment(event?.start_date).format("YYYY-MM-DD") || ""
  );
  const [startTime, setStartTime] = useState(event?.start_time || "");

  const { updateEventQuery, isLoading, error } = useUpdateEvent();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const eventData = {
      doctorFullName,
      specialization,
      experience,
      consultationFees,
      start_date: startDate,
      start_time: startTime,
    };

    try {
      console.log(eventData);

      await updateEventQuery({eventData, eventId});
    } catch (error) {
      console.log("Error updating event: ", error);
      toast.error("Error updating event");
    }
  };

  return (
    <div>
      <form
        className="flex flex-col gap-4 items-center h-screen w-full justify-center"
        onSubmit={handleSubmit}
      >
        <Input
          type="text"
          placeholder="Doctor Full Name"
          className="my-2"
          value={doctorFullName}
          onChange={(e) => setDoctorFullName(e.target.value)}
        />
        <Input
          type="text"
          placeholder="Specialization"
          className="my-2"
          value={specialization}
          onChange={(e) => setSpecialization(e.target.value)}
        />
        <Input
          type="text"
          placeholder="Experience"
          className="my-2"
          value={experience}
          onChange={(e) => setExperience(e.target.value)}
        />
        <Input
          type="number"
          placeholder="Consultation Fees"
          className="my-2"
          value={consultationFees}
          onChange={(e) => setConsultationFees(e.target.value)}
        />
        <Input
          type="date"
          placeholder="Start Date"
          className="my-2"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
        <Input
          type="time"
          placeholder="Start Time"
          className="my-2"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
        />

        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
          Update Event
        </button>
      </form>
    </div>
  );
};

export default UpdateEvent;
