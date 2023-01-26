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

export const logoutUser = async () => {
  try {
    const res = await instance.post(`/auth/logout`);
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

// 로그인
export const LoginUser = async (params) => {
  try {
    const res = await instance.post(`/auth/login`, params);
    // const today = new Date();
    // const expireDate1 = today.setDate(today.getDate() + 10);
    // const expireDate2 = today.setDate(today.getDate() + 300);
    if (res.data.statusCode === 200) {
      // cookies.set("PartnerRefresh", res.data.data.PartnerRefresh, {
      //   secure: false,
      //   expires: new Date(expireDate2),
      //   // sameSite: "Secure",
      //   path: "/",
      // });
      // cookies.set("PartnerAuth", res.data.data.PartnerAuth, {
      //   secure: false,
      //   // sameSite: "Secure",
      //   expires: new Date(expireDate1),
      //   path: "/",
      // });

      window.localStorage.setItem("isLogin", "true");
      window.localStorage.setItem("corpLogo", res.data.data.corpImage);
      window.localStorage.setItem("corpCeo", res.data.data.corpCeo);
    }
    return res.data;
  } catch (err) {
    return err.response;
  }
};
