import React, { useState } from "react";
import Heading from "../UI/Heading";
import AppointmentTable from "../components/Appointments/AppointmentTable";
import AppointmentFilter from "../components/Appointments/AppointmentFilter";
import { useLoggedInUser } from "../hooks/Auth/useGetMe";
import AppointmentTableDoctor from "../components/Appointments/AppointmentTableDoctor";
import { useUserAppointments } from "../hooks/Appointments/useUserAppointments";

const Appointments = () => {
  const { data: user } = useLoggedInUser();
  const [filterParams, setFilterParams] = useState([]);
  const { data } = useUserAppointments(filterParams);

  const appointments = data?.appointments;

  const handleFilter = (filters) => {
    setFilterParams(filters)
  };

  return (
    <div className="p-10 h-full ">
      <Heading>Appointments</Heading>
      <AppointmentFilter onFilter={handleFilter} />
      {user?.role === "doctor" ? (
        <AppointmentTableDoctor appointments={appointments} />
      ) : (
        <AppointmentTable appointments={appointments} />
      )}
    </div>
  );
};

export default Appointments;
