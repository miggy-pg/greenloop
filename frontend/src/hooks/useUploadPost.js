import { useQuery } from "@tanstack/react-query";
import { uploadPost } from "../api/user";

export const useUploadPost = (formData) => {
  useQuery({
    queryKey: ["uploadPost"],
    queryFn: () => uploadPost(formData),
  });
  // return <div>useUploadPost</div>;
};
