import axios from "axios";
import { logoutUser } from "../api/user";
import { Cookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
export const cookies = new Cookies();

axios.defaults.withCredentials = true;

export const deleteCookie = function (name) {
  document.cookie = name + "=; expires=Thu, 01 Jan 1999 00:00:10 GMT;";
};

//로그아웃 api
export const Logout = async () => {
  const navigate = useNavigate();
  const { statusCode } = await logoutUser();
  if (statusCode == 200) {
    window.localStorage.clear();
    navigate("/");
    window.location.reload();
  }
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
    window.location.reload();
    return res.data;
  } catch (err) {
    Logout();
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
    Logout();
  }
};
