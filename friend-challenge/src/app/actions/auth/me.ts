import { useApi } from "@/lib/useApi";

export async function getMe() {
  const { data: response } = await useApi.post("/auth/me");
  const { id, name, email, image } = response.data;

  return { id, name, email, image };
}
