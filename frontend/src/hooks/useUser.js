import { useQuery } from "@tanstack/react-query";
import { fetchUser, fetchUsers } from "../api/user";

export const useUser = (userId) => {
  const {
    data: userQuery = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["user"],
    queryFn: () => fetchUser(userId),
    initialData: {},
  });

  return { userQuery, isLoading, error };
};

export const useUsers = () => {
  const {
    data: users,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["users"],
    queryFn: () => fetchUsers(),
    initialData: [],
  });
  const { data: allUsers } = !isLoading && users;

  return { allUsers, isLoading, error };
};
