import axiosInstance from "./globalAxios";

export default async function isAuthenticated() {
  try {
    const username = await axiosInstance.get("/todo/me");
    return username;
  } catch (error) {
    return null;
  }
}
