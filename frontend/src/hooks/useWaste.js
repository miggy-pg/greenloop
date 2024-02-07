import { useQuery } from "@tanstack/react-query";
import { fetchWastes } from "../api/waste";

export const useWastes = () => {
  const {
    data: wasteObject,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["userWastes"],
    queryFn: fetchWastes,
    initialData: [],
  });

  const { data: wastes } = wasteObject;

  return { wastes, isLoading, error };
};
