import axiosInstance from "../axios";

const getNotificationCount = async ({
  userId,
}: {
  userId: string;
}): Promise<{ count: number }> => {
  try {
    const response = await axiosInstance.get<{ count: number }>(
      `notifications/${userId}`
    );

    return response.data;
  } catch (error: any) {
    throw new Error(error);
  }
};

const updateNotification = async (id: string): Promise<void> => {
  try {
    const response = await axiosInstance.put(`notifications/${id}`);

    return response.data;
  } catch (error: any) {
    throw new Error(error);
  }
};

const cleanNotifications = async ({
  userId,
}: {
  userId: string;
}): Promise<void> => {
  try {
    const response = await axiosInstance.put(`notifications/clean/${userId}`);

    return response.data;
  } catch (error: any) {
    throw new Error(error);
  }
};

export { getNotificationCount, cleanNotifications, updateNotification };
