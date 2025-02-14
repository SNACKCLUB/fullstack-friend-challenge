import { useApi } from "@/lib/useApi";

export async function createFriendRequest(userID: number) {
  const { data: response } = await useApi.post(`/friend-request`, {
    requested_user_id: userID,
  });

  return response.data;
}
