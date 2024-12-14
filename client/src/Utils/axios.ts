import axios from "axios";
import { APIVersion, hostName } from "../Host";

const loginInstance = axios.create({
    baseURL: `${hostName}${APIVersion}`,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
      }
})



loginInstance.interceptors.response.use((config)=>{
    console.log("from loginInstance", config)
    return config;
  },
  (error) => {
    return Promise.reject(error);
  })

 const axiosInstance = axios.create({
    baseURL: `${hostName}${APIVersion}`,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
      }
})

axiosInstance.interceptors.request.use(
    (config) => {
    console.log("ayy check axiosInstance interceptors")
      const token = document?.cookie?.split('; ')?.find(row => row.startsWith('token='))?.split('=')[1];
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

export {loginInstance, axiosInstance};