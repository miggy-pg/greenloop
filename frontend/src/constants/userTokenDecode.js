import { jwtDecode } from "jwt-decode";

export const token = jwtDecode(localStorage.getItem("user:token"));
