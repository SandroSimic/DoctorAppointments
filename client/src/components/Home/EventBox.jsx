import React from "react";

const EventBox = ({
  doctorFullName,
  specialization,
  experience,
  status,
  date,
  time,
  fees,
}) => {
  return (
    <div className="border-2 p-4 w-full flex flex-col rounded-lg justify-between h-52 hover:bg-slate-500 hover:text-white hover:cursor-pointer">
      <div className="flex flex-col gap-3">
        <h1 className="font-bold text-2xl ">{doctorFullName}</h1>
        <p className="uppercase text-sm">{specialization}</p>
        <p className="uppercase text-sm ">Experience: {experience} years</p>
        <p className="uppercase text-sm">Status: {status}</p>
      </div>
      <div className="flex items-center justify-between">
        <h2 className="font-bold text-xl">{fees}$</h2>
        <div className="font-bold">
          <p>{date}</p>
          <p className="text-sm">{time}</p>
        </div>
      </div>
    </div>
  );
};

export default EventBox;
