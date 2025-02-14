import { useApi } from "@/lib/useApi";

export async function removeFriend(friendID: number) {
  const { data: response } = await useApi.post(`/friend-remove`, {
    friend_id: friendID,
  });

  return response.data;
}
