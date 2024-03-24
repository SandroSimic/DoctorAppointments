import { MdDelete } from "react-icons/md";
import moment from "moment";
import { useCancelAppointment } from "../../hooks/Appointments/useCancelAppointment";

const AppointmentTable = ({ appointments }) => {
  const { cancelAppointmentQuery } = useCancelAppointment();

  const handleCancel = (id) => {
    cancelAppointmentQuery(id);
  };

  return (
    <div className="mt-10">
      <table className="border-collapse border w-full">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 py-2 px-4">No</th>
            <th className="border border-gray-300 py-2 px-4">Doctor</th>
            <th className="border border-gray-300 py-2 px-4">Specialization</th>
            <th className="border border-gray-300 py-2 px-4">Date</th>
            <th className="border border-gray-300 py-2 px-4">Time</th>
            <th className="border border-gray-300 py-2 px-4">Status</th>
            <th className="border border-gray-300 py-2 px-4">Action</th>
          </tr>
        </thead>
        <tbody>
          {appointments?.map((appointment, index) => (
            <tr
              key={appointment._id}
              className={index % 2 === 0 ? "bg-gray-50" : ""}
            >
              <td className="border border-gray-300 py-2 px-4">{index + 1}</td>
              <td className="border border-gray-300 py-2 px-4">
                {appointment.event.doctorFullName}
              </td>
              <td className="border border-gray-300 py-2 px-4">
                {appointment.event.specialization}
              </td>
              <td className="border border-gray-300 py-2 px-4">
                {moment(appointment.event.start_date).format("MM/DD/YYYY")}
              </td>
              <td className="border border-gray-300 py-2 px-4">
                {appointment.event.start_time}
              </td>
              <td className="border border-gray-300 py-2 px-4">
                <span
                  className={
                    appointment.status === "pending"
                      ? "bg-gray-700 text-gray-200 uppercase py-1 px-2 rounded"
                      : appointment.status === "approved"
                      ? "bg-green-700 text-green-200 uppercase py-1 px-2 rounded"
                      : appointment.status === "rejected"
                      ? "bg-red-700 text-red-200 uppercase py-1 px-2 rounded"
                      : ""
                  }
                >
                  {appointment.status}
                </span>
              </td>
              {appointment.status !== "pending" && (
                <td className="border border-gray-300 py-2 px-4">
                  <button
                    className="text-red-200 bg-red-900 p-2 rounded-lg text-xl hover:bg-red-200 hover:text-red-900"
                    onClick={() => handleCancel(appointment._id)}
                  >
                    <MdDelete />
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AppointmentTable;
