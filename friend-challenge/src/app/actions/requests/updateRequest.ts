import { useApi } from "@/lib/useApi";

type UpdateRequestData = {
  id: string;
  status: string;
};

export async function updateRequest({ id, status }: UpdateRequestData) {
  const { data: response } = await useApi.put(`/friend-request/${id}`, {
    status,
  });

  return response.data;
}
