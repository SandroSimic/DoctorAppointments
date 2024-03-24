import { useState } from "react";
import Input from "../UI/Input";
import { useCreateEvent } from "../hooks/Events/useCreateEvent";

const CreateEvent = () => {
  const [doctorFullName, setDoctorFullName] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [experience, setExperience] = useState("");
  const [consultationFees, setConsultationFees] = useState("");
  const [startDate, setStartDate] = useState("");
  const [startTime, setStartTime] = useState("");

  const { createEventQuery } = useCreateEvent();

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
      await createEventQuery(eventData);
    } catch (error) {
      console.log("Error creating event: ", error);
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
          Create Event
        </button>
      </form>
    </div>
  );
};

export default CreateEvent;
