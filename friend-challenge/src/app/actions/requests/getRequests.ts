import { useApi } from "@/lib/useApi";

export async function getRequests() {
  const { data: response } = await useApi.get(
    `/friend-request?selection=notification`
  );

  return response.data;
}
