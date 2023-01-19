import axios from "axios";
import { Cookies } from "react-cookie";
export const cookies = new Cookies();

axios.defaults.withCredentials = true;

export const deleteCookie = function (name) {
  document.cookie = name + "=; expires=Thu, 01 Jan 1999 00:00:10 GMT;";
};

export const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

instance.interceptors.response.use(
  function (res) {
    return res;
  },
  function (err) {
    if (err.response.data.statusCode === 401) {
      if (process.env.NODE_ENV === "development") {
        getRefreshToken();
      }
      if (process.env.NODE_ENV === "production") {
        getToken();
      }
      return;
    } else {
      return Promise.reject(err);
    }
  }
);

export const getRefreshToken = async (params) => {
  try {
    const res = await axios.get(
      `${process.env.REACT_APP_API_URL}/auth/refresh`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    // const today = new Date();
    // const expireDate = today.setDate(today.getDate() + 1);
    // cookies.set("accessToken", res.data.data.accessToken, {
    //   secure: false,
    //   expires: new Date(expireDate),
    //   path: "/",
    // });
    // cookies.set("refreshToken", res.data.data.refreshToken, {
    //   secure: false,
    //   expires: new Date(expireDate),
    //   path: "/",
    // });
    window.location.reload();
    return res.data;
  } catch (err) {
    // deleteCookie("Refresh");
    // deleteCookie("refreshToken");
    // deleteCookie("Authentication");
    deleteCookie("PartnerAuth");
    deleteCookie("PartnerRefresh");
    window.localStorage.clear();
    window.location.href = "/";
  }
};

export const getToken = async (params) => {
  try {
    const res = await axios.get(
      `${process.env.REACT_APP_API_URL}/auth/refresh`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    window.location.reload();
    return res.data;
  } catch (e) {
    window.localStorage.clear();
    window.location.href = "/";
  }
};
