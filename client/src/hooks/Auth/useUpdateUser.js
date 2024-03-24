import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { updateProfile } from "../../api/usersApi";

export function useUpdateProfile() {
  const queryClient = useQueryClient();
  const { eventId } = useParams();

  const navigate = useNavigate();

  const {
    mutate: updateProfileQuery,
    isLoading,
    error,
  } = useMutation({
    mutationFn: ({ userData }) => updateProfile(userData),

    onSuccess: () => {
      toast.success("User Updated");

      queryClient.invalidateQueries(["user", eventId]);
      navigate("/", { replace: true });
    },
    onError: (err) => {
      console.log(err);
      toast.error(err.response?.data?.message || "Error updating event");
    },
  });

  return { isLoading, updateProfileQuery, error };
}
