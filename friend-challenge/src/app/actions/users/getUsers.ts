import { useApi } from "@/lib/useApi";

export async function getUsers(query?: string) {
  const { data: response } = await useApi.get(`/user${query}`);

  return response.data;
}
