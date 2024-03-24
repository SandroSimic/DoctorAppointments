import Input from "../UI/Input";
import Heading from "../UI/Heading";
import { useState } from "react";
import { useUpdateProfile } from "../hooks/Auth/useUpdateUser";
import { useLoggedInUser } from "../hooks/Auth/useGetMe";
import { useGetDoctorsEvents } from "../hooks/Events/useGetDoctorsEvents";
import { Link } from "react-router-dom";
import EventBox from "../components/Home/EventBox";
import moment from "moment";

const Profile = () => {
  const { data: user } = useLoggedInUser();
  const { data } = useGetDoctorsEvents();
  const [username, setUsername] = useState(user?.username);
  const [email, setEmail] = useState(user?.email);
  const [password, setPassword] = useState("");
  const { isLoading, updateProfileQuery } = useUpdateProfile();

  const events = data?.data;
  console.log(events);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await updateProfileQuery({
        userData: {
          username,
          email,
          password,
        },
      });
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <div className="p-5">
      <Heading>Update Profile</Heading>
      <form
        className="flex flex-col gap-4 items-baseline  w-full my-10"
        onSubmit={handleSubmit}
      >
        <Input
          type="text"
          placeholder={user?.username}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="my-2"
        />
        <Input
          type="text"
          placeholder={user?.email}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="my-2"
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="my-2"
        />

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          disabled={isLoading}
        >
          {isLoading ? "Updating Profile" : "Update Profile"}
        </button>
      </form>

      {user?.role === "doctor" && (
        <>
          <Heading className={"mb-10"}>USERS EVENTS</Heading>
          <div className="w-full grid xl:grid-cols-5 gap-5">
            {events?.map((event) => (
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
        </>
      )}
    </div>
  );
};

export default Profile;
