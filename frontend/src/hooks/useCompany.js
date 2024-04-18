import { useQuery } from "@tanstack/react-query";
import { fetchCompany, fetchCompanies } from "../api/company";

export const useFetchCompany = (companyId) => {
  const {
    data: companyData = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["company"],
    queryFn: () => fetchCompany(companyId),
  });

  return { companyData, isLoading, error };
};

export const useFetchCompanies = () => {
  const {
    data: companiesData = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["companies"],
    queryFn: () => fetchCompanies(),
  });

  return { companiesData, isLoading, error };
};
