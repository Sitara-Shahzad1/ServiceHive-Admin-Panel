import {  axiosPost } from "../../../utils/Intercept";

export const customerTable = async () => {
  const res = await axiosPost({
    path: "admin/create-customer",
  });

  return res;
};
