import { UserTypes } from "@/common/types/UserTypes";
import axiosInstance from "../axios";

const getUsersByFilter = async ({
  userId,
  term,
}: {
  userId: string;
  term: string;
}): Promise<UserTypes[]> => {
  try {
    const response = await axiosInstance.get<UserTypes[]>(
      `users/getByFilter/${userId}`,
      { params: { term } }
    );

    return response.data;
  } catch (error: any) {
    throw new Error(error);
  }
};

export { getUsersByFilter };
