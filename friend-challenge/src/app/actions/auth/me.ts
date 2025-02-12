import { useApi } from "@/lib/useApi";

export async function getMe() {
  const { data: response } = await useApi.post("/auth/me");
  const { name, email, image } = response.data;

  return { name, email, image };
}
