import axios from "axios";
import { APPOINTMENT_URL } from "../utils/constants";

export const getUserAppointments = async (filterParams) => {
  const { data } = await axios.get(`${APPOINTMENT_URL}`, {
    withCredentials: true,
    params: filterParams,
  });
  return data;
};

export const bookAppointment = async (eventId) => {
  const { data } = await axios.post(
    `${APPOINTMENT_URL}`,
    { eventId },
    {
      withCredentials: true,
    }
  );
  return data;
};

export const updateAppointmentStatus = async ({ appointmentId, status }) => {
  const { data } = await axios.patch(
    `${APPOINTMENT_URL}/${appointmentId}`,
    { status },
    {
      withCredentials: true,
    }
  );

  return data;
};

export const cancelAppointment = async (appointmentId) => {
  await axios.delete(`${APPOINTMENT_URL}/${appointmentId}`, {
    withCredentials: true,
  });
};
