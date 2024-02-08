import { useQuery } from "@tanstack/react-query";
import { fetchUser } from "../api/user";
import { userTokenDecode } from "../constants/userData";

export const useUser = (userId = userTokenDecode.userId) => {
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
