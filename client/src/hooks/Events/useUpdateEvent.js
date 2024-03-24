import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateEvent } from "../../api/eventsApi";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

export function useUpdateEvent() {
  const queryClient = useQueryClient();
  const { eventId } = useParams();

  const navigate = useNavigate();

  const {
    mutate: updateEventQuery,
    isLoading,
    error,
  } = useMutation({
    mutationFn: ({eventData, eventId}) => updateEvent(eventData, eventId),

    onSuccess: () => {
      toast.success("Event Updated");

      queryClient.invalidateQueries(["event", eventId]);
      navigate("/", { replace: true });
    },
    onError: (err) => {
      console.log(err);
      toast.error(err.response?.data?.message || "Error updating event");
    },
  });

  return { isLoading, updateEventQuery, error };
}
