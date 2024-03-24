import { useMutation } from "@tanstack/react-query";
import { bookAppointment } from "../../api/appointmentApi";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useBookAppointment() {
  const navigate = useNavigate();

  const {
    mutate: bookAppointmentQuery,
    isLoading,
    error,
  } = useMutation({
    mutationFn: bookAppointment,
    onSuccess: () => {
      toast.success("Appointment Booked");
      navigate("/", { replace: true });
    },
    onError: (err) => {
      console.log(err);
      
      toast.error(err.response.data.message);
    },
  });

  return { isLoading, bookAppointmentQuery, error };
}
