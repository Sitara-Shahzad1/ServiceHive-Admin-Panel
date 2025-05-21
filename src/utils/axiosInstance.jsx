import axios from 'axios';

// Create a reusable axios instance
const axiosInstance = axios.create({
  baseURL: 'http://142.93.211.139/api/v1', 
});

// Attach the token dynamically using interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;

const ADMIN = '/admin/';

export const getServiceProviderById = async (id) => {
  const res = await axiosGet({
    path: `${ADMIN}find-serviceProvider-by-id?serviceProviderId=${id}`,
  });
  return res;
};


export const createNewService = async (payload) => {
  const res = await axiosPost({
    path: service,
    payload,
  });

  return res;
};


export const axiosPost = async ({ path, payload }) => {
  const response = await axios.post(path, payload);
  return response.data;
};

const service = 'service-providers/:id/services';


export const getAllServices = async (id, page = 1, limit = 10) => {
  const res = await axiosGet({
    path: `${service}/find-services-by-serviceProviderId?serviceProviderId=${id}&page=${page}&limit=${limit}`,
  });

  return res;
};


// export const getServiceCategories = async () => {
//   return await axios.get('https://api.example.com/service-categories');
// };

// export const getServiceCategories = async () => {
//   const response = await axios.get("http://142.93.211.139/api/V1/service-category?page=1&limit=10");
//   return response.data; // 👈 ensure you're returning .data
// };


export const getServiceCategories = async () => {
  const response = await axios.get(
    "http://142.93.211.139/api/V1/service-category?page=1&limit=10"
  );
  return response; // or return response.data based on usage
};
