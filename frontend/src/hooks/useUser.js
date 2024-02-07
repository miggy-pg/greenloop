import { useQuery } from "@tanstack/react-query";
import { fetchUser } from "../api/user";
import { token } from "../constants/userTokenDecode";

export const useUser = (userId = token.userId) => {
  const {
    data: user,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["user"],
    queryFn: () => fetchUser(userId),
    initialData: {},
  });

  const { data: userData } = user;

  return { userData, isLoading, error };
};
