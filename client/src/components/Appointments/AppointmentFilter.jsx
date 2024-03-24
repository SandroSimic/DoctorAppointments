import React, { useState } from "react";
import Input from "../../UI/Input";
import Button from "../../UI/Button";
import { FaSearch } from "react-icons/fa";

const statusOptions = ["any", "approved", "pending", "rejected"];

const AppointmentFilter = ({ onFilter }) => {
  const [status, setStatus] = useState("");

  if (status === "any") {
    setStatus("");
  }

  const handleFilter = () => {
    onFilter({ status });
  };

  return (
    <div className="flex gap-5 mt-10">
      <Input
        placeholder="Status"
        type={"select"}
        selectOptions={statusOptions}
        className={"p-0"}
        value={status}
        onChange={(e) => setStatus(e.target.value)}
      />
      <Button type="button" className={"p-3"} onClick={handleFilter}>
        <FaSearch />
      </Button>
    </div>
  );
};

export default AppointmentFilter;
