import { useMutation } from "@tanstack/react-query";
import { updateAppointmentStatus } from "../../api/appointmentApi";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useUpdateAppointmentStatus() {
  const navigate = useNavigate();

  const {
    mutate: updateAppointmentStatusQuery,
    isLoading,
    error,
  } = useMutation({
    mutationFn: updateAppointmentStatus,
    onSuccess: () => {
      toast.success("Appointment Updated Successfully");
      navigate("/", { replace: true });
    },
    onError: (err) => {
      console.log(err);
      
      toast.error(err.response.data.message);
    },
  });

  return { isLoading, updateAppointmentStatusQuery, error };
}
