import { useQuery } from "@tanstack/react-query";
import { getLoggedInUser } from "../../api/usersApi";
export function useLoggedInUser() {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["user"],
    queryFn: getLoggedInUser,
  });

  return { data, isLoading, refetch };
}
