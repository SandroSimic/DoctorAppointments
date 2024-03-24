import React, { useState } from "react";
import Input from "../../UI/Input";
import Button from "../../UI/Button";
import { FaSearch } from "react-icons/fa";

const eventOptions = ["all","available", "taken"];

const HomeFilter = ({ onFilter }) => {
  const [doctorName, setDoctorName] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [status, setStatus] = useState("");

  if(status === "all") {
    setStatus("")
  }


  const handleFilters = () => {
    onFilter({ search: doctorName, specialization, status });
  };

  return (
    <div className="flex gap-5 mt-10">
      <Input
        placeholder="Doctor Name"
        value={doctorName}
        onChange={(e) => setDoctorName(e.target.value)}
      />
      <Input
        placeholder="Specialization (ex: Dentist)"
        value={specialization}
        onChange={(e) => setSpecialization(e.target.value)}
      />
      <Input
        placeholder="status"
        type={"select"}
        selectOptions={eventOptions}
        value={status}
        onChange={(e) => setStatus(e.target.value)}
      />
      <Button type="button" className={"p-3"} onClick={handleFilters}>
        <FaSearch />
      </Button>
    </div>
  );
};

export default HomeFilter;
