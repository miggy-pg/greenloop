import { useQuery } from "@tanstack/react-query";
import { fetchWastes } from "../api/waste";

export const useWastes = () => {
  const {
    data: wasteQuery = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["companyWastes"],
    queryFn: fetchWastes,
  });

  return { wasteQuery, isLoading, error };
};
