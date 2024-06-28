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
  } catch (e) {
    console.log(e);
  }
};

export const idCheck = async (params) => {
  try {
    const res = await instance.get(`/auth/check/${params}`);
    return res.data;
  } catch (err) {
    console.log(err);
    return err.response.data;
  }
};

export const logoutUser = async () => {
  try {
    const res = await instance.post(`/auth/logout`);
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

// 로그인
export const loginUser = async (params) => {
  try {
    const res = await instance.post(`/auth/login`, params);
    if (res.data.statusCode === 200) {
      localStorage.setItem("isLogin", "true");
      localStorage.setItem("corpLogo", res.data.data.corpImage);
      localStorage.setItem("corpName", res.data.data.corpName);
      localStorage.setItem("id", res.data.data.id);
      localStorage.setItem(
        "deliveryPeriod",
        res.data.data.deliveryPeriod || ""
      );
      localStorage.setItem(
        "inspectionPassRate",
        res.data.data.inspectionPassRate || ""
      );
    }
    return res.data;
  } catch (err) {
    return err.response;
  }
};
