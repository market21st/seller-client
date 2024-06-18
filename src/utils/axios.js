import axios from "axios";
axios.defaults.withCredentials = true;

export const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

instance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (res) => {
    return res;
  },
  async (err) => {
    if (err.response.data.statusCode === 401) {
      try {
        const { data } = await axios.get(
          `${process.env.REACT_APP_API_URL}/auth/refresh`,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        // 토큰 재발급 성공시
        if (data?.statusCode === 200) {
          window.location.reload();
          return;
        }
      } catch (err) {
        localStorage.removeItem("isLogin");
        window.location.replace("/");
      }
    } else {
      return Promise.reject(err);
    }
  }
);
