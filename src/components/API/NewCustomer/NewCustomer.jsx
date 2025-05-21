// import { axiosGet, axiosPost } from "../../../utils/Intercept";

// export const customerTable = async () => {
//   const res = await axiosGet({
//     path: "admin/get-all-users?role=CUSTOMER&page=1&limit=5",
//   });

//   return res;
// };

// export const UserTable = async () => {
//   const res = await axiosPost({
//     path: "/api/v1/admin/create-customer",
//   });

//   return res;
// };

// export const updateUser = async (id, payload) => {
//   const res = await axiosPatch({
//     path: "/admin/update-user?userId=${id}",
//     payload,
//   });

//   return res;
// };






import { axiosGet, axiosPost } from "../../../utils/Intercept";



export const userStatistics = async () => {
  const res = await axiosGet({
    path: 'admin/user-statistics',
  });

  return res;
};
export const createCustomer = async (payload) => {
  const res = await axiosPost({
    path: 'admin/create-customer',
    payload
  });

  return res;
};

export const getUserById = async (id) => {
  const res = await axiosGet({
    path: `${ADMIN}find-by-userId?userId=${id}`,
  });

  return res;
};

export const getServiceProviderById = async (id) => {
  const res = await axiosGet({
    path: `${ADMIN}find-serviceProvider-by-id?serviceProviderId=${id}`,
  });

  return res;
};