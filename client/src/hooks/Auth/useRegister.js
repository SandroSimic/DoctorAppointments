import { useMutation, useQueryClient } from "@tanstack/react-query";
import { registerUser } from "../../api/usersApi";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export function useRegister() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const {
    mutate: registerUserQuery,
    isLoading,
    error,
  } = useMutation({
    mutationFn: registerUser,
    onSuccess: (user) => {
      toast.success("User Registered");
      queryClient.setQueryData(["user"], user);
      navigate("/", { replace: true });
    },
    onError: (err) => {
      toast.error(err.response.data.message);
    },
  });

  return { isLoading, registerUserQuery, error };
}
