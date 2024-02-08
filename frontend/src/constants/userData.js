import { jwtDecode } from "jwt-decode";

export const userTokenDecode = jwtDecode(localStorage.getItem("user:token"));
