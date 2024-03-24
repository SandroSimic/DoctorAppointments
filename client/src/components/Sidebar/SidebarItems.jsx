/* eslint-disable react/prop-types */
import React from "react";
import { MdDashboard, MdHome, MdPages } from "react-icons/md";
import { FaCalendar, FaBookOpen, FaUser } from "react-icons/fa";
import { IoIosPaper } from "react-icons/io";

import { FaBookmark } from "react-icons/fa6";
import SidebarItem from "./SidebarItem";

const links = [
  {
    icon: <MdHome />,
    text: "Home",
    link: "/",
  },
  {
    icon: <IoIosPaper />,
    text: "Appointments",
    link: "/appointments",
  },
  {
    icon: <FaUser />,
    text: "Profile",
    link: "/profile",
  },
  {
    icon: <FaCalendar />,
    text: "Calendar",
    link: "/calendar",
  },
];

const doctorlinks = [
  {
    icon: <MdHome />,
    text: "Home",
    link: "/",
  },
  {
    icon: <FaBookOpen />,
    text: "Create Event",
    link: "/create-event",
  },
  {
    icon: <IoIosPaper />,
    text: "Appointments",
    link: "/appointments",
  },
  {
    icon: <FaUser />,
    text: "Profile",
    link: "/profile",
  },
  {
    icon: <FaCalendar />,
    text: "Calendar",
    link: "/calendar",
  },
];

const SidebarItems = ({ user }) => {
  if (user?.role === "doctor") {
    return (
      <nav className="flex flex-col h-full mt-10 gap-5 ">
        {doctorlinks.map((link, index) => (
          <SidebarItem
            key={index}
            icon={link.icon}
            text={link.text}
            link={link.link}
          />
        ))}
      </nav>
    );
  }

  return (
    <nav className="flex flex-col h-full mt-10 gap-5 ">
      {links.map((link, index) => (
        <SidebarItem
          key={index}
          icon={link.icon}
          text={link.text}
          link={link.link}
        />
      ))}
    </nav>
  );
};

export default SidebarItems;
