import { useMutation } from "@tanstack/react-query";
import { deleteEvent } from "../../api/eventsApi";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useDeleteEvent() {
  const navigate = useNavigate();

  const {
    mutate: deleteEventQuery,
    isLoading,
    error,
  } = useMutation({
    mutationFn: deleteEvent,
    onSuccess: () => {
      toast.success("Event Deleted");
      navigate("/", { replace: true });
    },
    onError: (err) => {
      console.log(err);
      
      toast.error(err.response.data.message);
    },
  });

  return { isLoading, deleteEventQuery, error };
}
