import { jwtDecode } from "jwt-decode";
import { useQuery } from "@tanstack/react-query";
import { fetchUser, fetchUsers } from "../api/user";
import { token } from "../constants/userData";

export const useUser = (userId) => {
  const {
    data: user,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["user"],
    queryFn: () => fetchUser(userId),
    initialData: {},
  });
  console.log(
    "userLoggiog: ",
    useQuery({
      queryKey: ["user"],
      queryFn: () => fetchUser(userId),
      initialData: {},
      staleTime: Infinity,
    })
  );

  console.log("token: ", token);
  console.log("userjwtDecode: ", user);

  const { data: userData } = !isLoading && user;

  return { userData, isLoading, error };
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
