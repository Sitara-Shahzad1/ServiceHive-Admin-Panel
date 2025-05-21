import { axiosGet } from "../../../utils/Intercept";

export const userStatistics = async () => {
  const res = await axiosGet({
    path: "admin/user-statistics",
  });

  return res;
};
