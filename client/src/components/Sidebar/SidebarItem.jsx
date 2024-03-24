import React from "react";
import { Link } from "react-router-dom";

const SidebarItem = ({ icon, text, link }) => {
  return (
    <Link
      to={link}
      className="flex items-center gap-4 text-lg hover:cursor-pointer hover:text-[#4C36C6] font-bold"
    >
      <div>{icon}</div>
      <h2>{text}</h2>
    </Link>
  );
};

export default SidebarItem;
