import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEvent } from "../../api/eventsApi";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useCreateEvent() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const {
    mutate: createEventQuery,
    isLoading,
    error,
  } = useMutation({
    mutationFn: createEvent,
    onSuccess: (event) => {
      toast.success("Event Created");
      queryClient.setQueryData(["event"], event);
      navigate("/", { replace: true });
    },
    onError: (err) => {
      console.log(err);
      
      toast.error(err.response.data.message);
    },
  });

  return { isLoading, createEventQuery, error };
}
