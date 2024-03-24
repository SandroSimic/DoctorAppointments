import { useQuery } from "@tanstack/react-query";
import { getEvents } from "../../api/eventsApi";


export function useGetEvents(filterParams) {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["events", filterParams],
    queryFn: () => getEvents(filterParams),
  });

  return { data, isLoading, refetch };
}
