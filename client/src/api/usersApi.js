import axios from "axios";
import { USERS_URL } from "../utils/constants";

export const loginUser = async (userData) => {
  const { data } = await axios.post(`${USERS_URL}/login`, userData, {
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  });
  return data;
};

export const registerUser = async (userData) => {
  const { data } = await axios.post(`${USERS_URL}/register`, userData, {
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  });
  return data;
};

export const getLoggedInUser = async () => {
  const { data } = await axios.get(`${USERS_URL}/me`, {
    withCredentials: true,
  });

  return data.user;
};

export const logoutUser = async () => {
  await axios.post(`${USERS_URL}/logout`, null, {
    withCredentials: true,
  });
};

export const updateProfile = async (userData) => {
  const { data } = await axios.patch(`${USERS_URL}/update`, userData, {
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  });
  return data;
};
