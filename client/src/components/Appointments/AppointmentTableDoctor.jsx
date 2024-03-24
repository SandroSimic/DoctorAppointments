import moment from "moment";
import Button from '../../UI/Button'
import { useUpdateAppointmentStatus } from "../../hooks/Appointments/useUpdateAppointmentStatus";
import { useCancelAppointment } from "../../hooks/Appointments/useCancelAppointment";
import { MdDelete } from "react-icons/md";
const AppointmentTableDoctor = ({ appointments }) => {
  const { updateAppointmentStatusQuery } = useUpdateAppointmentStatus();
  const { cancelAppointmentQuery } = useCancelAppointment();

  const handleAccept = (id) => {
    updateAppointmentStatusQuery({ appointmentId: id, status: "approved" });
  };

  const handleReject = (id) => {
    updateAppointmentStatusQuery({ appointmentId: id, status: "rejected" });
  };

  const handleCancel = (id) => {
    cancelAppointmentQuery(id);
  };

  return (
    <div className="mt-10">
      <table className="border-collapse border w-3/4">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 py-2 px-4">No</th>
            <th className="border border-gray-300 py-2 px-4">Patient</th>
            <th className="border border-gray-300 py-2 px-4">Booked </th>
            <th className="border border-gray-300 py-2 px-4">Date</th>
            <th className="border border-gray-300 py-2 px-4">Time</th>
            <th className="border border-gray-300 py-2 px-4">Status</th>
            <th className="border border-gray-300 py-2 px-4">Cancel</th>
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
                {appointment.patient.username}
              </td>
              <td className="border border-gray-300 py-2 px-4">
                {appointment.event.doctorFullName}
              </td>
              <td className="border border-gray-300 py-2 px-4">
                {moment(appointment.event.start_date).format("MM/DD/YYYY")}
              </td>
              <td className="border border-gray-300 py-2 px-4">
                {appointment.event.start_time}
              </td>
              <td className="border border-gray-300 py-2 px-4">
                {appointment.status === "pending" ? (
                  <div className="flex gap-3">
                    <button
                      className="text-white bg-green-500 p-1 rounded-lg text-md hover:bg-green-600"
                      onClick={() => handleAccept(appointment?._id)}
                    >
                      Accept
                    </button>
                    <button
                      className="text-white bg-red-500 p-1 rounded-lg text-md hover:bg-red-600"
                      onClick={() => handleReject(appointment?._id)}
                    >
                      Reject
                    </button>
                  </div>
                ) : (
                  <span
                    className={
                      appointment.status === "approved"
                        ? "bg-green-700 text-green-200 uppercase py-1 px-2 rounded"
                        : appointment.status === "rejected"
                        ? "bg-red-700 text-red-200 uppercase py-1 px-2 rounded"
                        : ""
                    }
                  >
                    {appointment.status}
                  </span>
                )}
              </td>
              {appointment.status !== "pending" && (
                <td className="border border-gray-300 py-2 px-4">
                  <Button
                    className="text-red-200 bg-red-900 p-2 rounded-lg text-xl hover:bg-red-200 hover:text-red-900"
                    onClick={() => handleCancel(appointment._id)}
                  >
                    <MdDelete />
                  </Button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AppointmentTableDoctor;
