import { instance } from "../utils/axios";
import { Cookies } from "react-cookie";
export const cookies = new Cookies();

export const RegisterUser = async (params) => {
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

// 로그인
export const LoginUser = async (params) => {
  try {
    const res = await instance.post(`/auth/login`, params);
    // const today = new Date();
    // const expireDate = today.setDate(today.getDate() + 1);
    if (res.data.statusCode === 200) {
      // cookies.set("Authentication", res.data.data.Authentication, {
      //   secure: false,
      //   expires: new Date(expireDate),
      //   // sameSite: "Secure",
      //   path: "/",
      // });
      // cookies.set("Refresh", res.data.data.Refresh, {
      //   secure: false,
      //   // sameSite: "Secure",
      //   expires: new Date(expireDate),
      //   path: "/",
      // });
      window.localStorage.setItem("corpLogo", res.data.data.corpImage);
      window.localStorage.setItem("corpCeo", res.data.data.corpCeo);
    }
    return res.data;
  } catch (err) {
    return err.response;
  }
};
