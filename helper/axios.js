import axios from "axios";
import { getSession } from "next-auth"; // only work for client side

const httpClient = axios.create({
  headers: {
    'Content-Type': 'application/json'
  }
});

httpClient.interceptors.request.use(async config => {
  const session = await getSession();
  config.headers["Authorization"] = `Bearer ${session?.accessToken}`;
  return config; 
});

export default ax
