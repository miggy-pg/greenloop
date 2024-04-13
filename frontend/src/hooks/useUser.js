import { useQuery } from "@tanstack/react-query";
import { fetchUser, fetchUsers } from "../api/user";

export const useUser = (companyId) => {
  console.log("companyId", companyId);
  const {
    data: userQuery = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["user"],
    queryFn: () => fetchUser(companyId),
  });

  return { userQuery, isLoading, error };
};

export const useUsers = () => {
  const {
    data: usersQuery = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["users"],
    queryFn: () => fetchUsers(),
  });

  return { usersQuery, isLoading, error };
};
