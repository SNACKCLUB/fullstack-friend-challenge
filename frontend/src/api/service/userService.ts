import { UserCreateTypes, UserTypes } from "@/store/users/types";
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

const createUser = async ({
  email,
  password,
  name,
}: UserCreateTypes): Promise<void> => {
  try {
    const response = await axiosInstance.post(`users/`, {
      email,
      password,
      name,
    });

    return response.data;
  } catch (error: any) {
    throw new Error(error);
  }
};
export { getUsersByFilter, createUser };
