import { useQuery } from "@tanstack/react-query";
import { getUserAppointments } from "../../api/appointmentApi";
export function useUserAppointments(filterParams) {
  const { data, isLoading } = useQuery({
    queryKey: ["appointments", filterParams],
    queryFn: () => getUserAppointments(filterParams),
  });

  return { data, isLoading };
}
