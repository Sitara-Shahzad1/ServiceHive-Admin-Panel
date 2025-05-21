import axios from "axios";

const instance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

// Add a request interceptor
instance.interceptors.request.use(
  (config) => {
    debugger;
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor
instance.interceptors.response.use(
  (response) => {
    debugger;
    return response.data;
  },
  (error) => {
    if (
      error?.response &&
      error?.response?.data?.statusCode === 401 &&
      !error?.response?.data?.path?.includes("login")
    ) {
      if (typeof window !== "undefined") {
        window.location.href = "/";
      }
      // Redirect to /login when a 401 error occurs
    }
    return Promise.reject(error);
  }
);
export const axiosGet = async ({ path }) => {
  const res = await instance.get(path);
  return res;
};

export const axiosPost = async ({ path, payload }) => {
  const res = await instance.post(path, payload);
  return res;
};

export const axiosPatch = async ({ path, payload }) => {
  const res = await instance.patch(path, payload);
  return res;
};

export const axiosDelete = async ({ path }) => {
  const res = await instance.delete(path);
  return res;
};
