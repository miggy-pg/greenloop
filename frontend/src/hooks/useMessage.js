import { useQuery } from "@tanstack/react-query";
import { getMessages } from "../api/conversation";

export const useMessage = (conversationId, companyId, receiverId) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["messages"],
    queryFn: () => getMessages(conversationId, companyId, receiverId),
  });

  return { data, isLoading, error };
};
