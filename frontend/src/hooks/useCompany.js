import { useQuery } from "@tanstack/react-query";
import { fetchUser, fetchUsers } from "../api/user";

export const useCompany = (companyId) => {
  const {
    data: companyData = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["company"],
    queryFn: () => fetchUser(companyId),
  });

  return { companyData, isLoading, error };
};

export const useCompanies = () => {
  const {
    data: companiesData = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["companies"],
    queryFn: () => fetchUsers(),
  });

  return { companiesData, isLoading, error };
};
