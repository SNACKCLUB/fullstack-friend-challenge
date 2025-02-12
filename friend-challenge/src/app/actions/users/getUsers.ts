import { useApi } from "@/lib/useApi";

export async function getUsers() {
  const { data: response } = await useApi.get("/user");

  return response.data;
}
