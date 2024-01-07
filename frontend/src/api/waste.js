import axios from "axios"

export const fetchWastes = async () => {
  return await axios.get("http://localhost:8000/api/wastes")

}
