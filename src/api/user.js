import { instance } from "../utils/axios";
import { Cookies } from "react-cookie";

export const cookies = new Cookies();

export const registerUser = async (params) => {
  try {
    const res = await instance.post(`/auth/signup`, params, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data;
  } catch (err) {
    return err.response.data;
  }
};

export const idCheck = async (params) => {
  try {
    const res = await instance.get(`/auth/check/${params}`);
    return res.data;
  } catch (err) {
    return err.response.data;
  }
};

export const logoutUser = async () => {
  try {
    const res = await instance.post(`/auth/logout`);
    return res.data;
  } catch (err) {
    return err.response.data;
  }
};

// 로그인
export const loginUser = async (params) => {
  try {
    const res = await instance.post(`/auth/login`, params);
    return res.data;
  } catch (err) {
    return err.response.data;
  }
};
