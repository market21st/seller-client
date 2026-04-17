import axios from "axios";
import logger from "./logger";

axios.defaults.withCredentials = true;

export const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

instance.interceptors.request.use(
  (config) => {
    logger.info(`[API Request] ${config.method?.toUpperCase()} ${config.url}`, {
      params: config.params,
      data: config.data,
    });
    return config;
  },
  (error) => {
    logger.error("[API Request Error]", error);
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (res) => {
    logger.info(`[API Response] ${res.config.method?.toUpperCase()} ${res.config.url}`, {
      status: res.status,
      data: res.data,
    });
    return res;
  },
  async (err) => {
    if (err.response.data.statusCode === 401) {
      logger.warn("[API] 401 Unauthorized - 토큰 재발급 시도");
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
          logger.info("[API] 토큰 재발급 성공 - 페이지 새로고침");
          window.location.reload();
          return;
        }
      } catch (err) {
        logger.error("[API] 토큰 재발급 실패 - 로그아웃 처리", err);
        localStorage.removeItem("isLogin");
        window.location.replace("/");
      }
    } else {
      logger.error(`[API Response Error] ${err.config?.method?.toUpperCase()} ${err.config?.url}`, {
        status: err.response?.status,
        data: err.response?.data,
      });
      return Promise.reject(err);
    }
  }
);
