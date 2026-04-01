import axios from "axios";

//Create axios instance (base setup)
const axiosInstance = axios.create({
  baseURL: "http://localhost:5001", //Local backend
  //baseURL: 'http://3.26.96.188:5001', //Live backend
  headers: { "Content-Type": "application/json" },
});

//Interceptor runs before every request
axiosInstance.interceptors.request.use(
  (config) => {
    //Get user info from local storage
    const userInfo = localStorage.getItem("userInfo");

    if (userInfo) {
      const parsedUser = JSON.parse(userInfo);

      //If token exists → attach to headers
      if (parsedUser.token) {
        config.headers.Authorization = `Bearer ${parsedUser.token}`;
      }
    }

    return config; //Send request forward
  },
  (error) => {
    return Promise.reject(error); //Handle error
  },
);

export default axiosInstance;
