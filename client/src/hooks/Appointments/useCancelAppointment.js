import { useMutation, useQueryClient } from "@tanstack/react-query";
import { cancelAppointment } from "../../api/appointmentApi";
import toast from "react-hot-toast";

export function useCancelAppointment() {
  const queryClient = useQueryClient();

  const {
    mutate: cancelAppointmentQuery,
    isLoading,
    error,
  } = useMutation({
    mutationFn: cancelAppointment,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["appointments"] });
      toast.success("Appointment Updated Successfully");
    },
    onError: (err) => {
      console.log(err);

      toast.error(err.response.data.message);
    },
  });

  return { isLoading, cancelAppointmentQuery, error };
}
