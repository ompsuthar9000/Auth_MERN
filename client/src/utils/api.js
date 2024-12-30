import axios from "axios";


const user = axios.create({
  baseURL: import.meta.env.VITE_API_URL ,
  withCredentials: true
});

export const createUser = async (payload) => {
  user.defaults.headers = {
    "Content-Type": "multipart/form-data",
  };
  return await user.post("/api/user/register", payload);
};

export const updateUser = async (id, payload) => {
  user.defaults.headers = {
    "Content-Type": "application/json",
  };
  return await user.put(`/api/user/update/${id}`, payload);
};

export const getAllUser = async () => {
 
  return await user.get(`/api/user/users`);
};

export const deleteUser = async (id) => {
  return await user.delete(`/api/user/delete/${id}`);
};
