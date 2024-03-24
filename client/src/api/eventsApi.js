import axios from "axios";
import { EVENTS_URL } from "../utils/constants";

export const createEvent = async (eventData) => {
  console.log(eventData);

  const { data } = await axios.post(`${EVENTS_URL}`, eventData, {
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  });
  return data;
};

export const getEvents = async (filterParams) => {
  const { data } = await axios.get(`${EVENTS_URL}?limit=6`, {
    params: filterParams,
    withCredentials: true,
  });
  return data;
};

export const getEvent = async (eventId) => {
  const { data } = await axios.get(`${EVENTS_URL}/${eventId}`, {
    withCredentials: true,
  });
  return data;
};

export const deleteEvent = async (eventId) => {
  const { data } = await axios.delete(`${EVENTS_URL}/${eventId}`, {
    withCredentials: true,
  });

  return data;
};

export const updateEvent = async (eventData, eventId) => {
  const { data } = await axios.patch(`${EVENTS_URL}/${eventId}`, eventData, {
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  });
  return data;
};

export const getDoctorsEvents = async () => {
  const { data } = await axios.get(`${EVENTS_URL}/doctor`, {
    withCredentials: true,
  });

  return data;
};
