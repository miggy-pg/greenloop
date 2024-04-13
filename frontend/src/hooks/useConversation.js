import { useQuery } from "@tanstack/react-query";
import { getConversations } from "../api/conversation";

export const useConversation = (companyId) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["conversations"],
    queryFn: () => getConversations(companyId),
    // staleTime: Infinity,
  });

  const conversations = data?.data;

  return { conversations, isLoading, error };
};
