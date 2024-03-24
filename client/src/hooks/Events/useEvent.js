import { useQuery } from "@tanstack/react-query";
import { getEvent } from "../../api/eventsApi";


export function useEvent(eventId) {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["event"],
    queryFn: () => getEvent(eventId),
  });

  return { data, isLoading, refetch };
}
