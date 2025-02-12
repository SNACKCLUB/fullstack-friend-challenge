import { deleteSession } from "@/lib/session";
import { useApi } from "@/lib/useApi";

export async function logOut() {
  const { data: response } = await useApi.post("/auth/logout");

  deleteSession();

  return { response };
}
