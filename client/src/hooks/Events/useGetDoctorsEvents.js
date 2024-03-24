import { useQuery } from "@tanstack/react-query";
import { getDoctorsEvents } from "../../api/eventsApi";

export function useGetDoctorsEvents() {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["DoctorsEvents"],
    queryFn: () => getDoctorsEvents(),
  });

  return { data, isLoading, refetch };
}
