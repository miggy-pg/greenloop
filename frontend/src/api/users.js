export const fetchUsersAPI = async (user) => {
  const res = await fetch(`http://localhost:8000/api/users/${user?.id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const resData = await res.json();
  return resData;
};
