import React from "react";
import axios from "axios";
import { logoutUser } from "../api/user";
// import { Cookies } from "react-cookie";
// export const cookies = new Cookies();

axios.defaults.withCredentials = true;

// export const deleteCookie = function (name) {
//   document.cookie = name + "=; expires=Thu, 01 Jan 1999 00:00:10 GMT;";
// };

//로그아웃 api
// export const logout = async () => {
//   console.log("1");
//   const { statusCode } = await logoutUser();
//   if (statusCode == 200) {
//     console.log("2");
//     window.localStorage.clear();
//     // window.location.href = "/";
//     // window.location.reload();
//   }
// };

// 로그아웃
// export const codeResulte = async () => {
//   const { statusCode, data } = await axios.get(
//     `${process.env.REACT_APP_API_URL}/auth/refresh`,
//     {
//       headers: {
//         "Content-Type": "application/json",
//       },
//     }
//   );

//   // const resulte = await statusCode;
//   // console.log(resulte);

//   // 토큰 재발급 성공시
//   if (statusCode === 200) {
//     debugger;
//     console.log("새로고침");
//     return;
//   }
// };

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
  // async
  (err) => {
    // if (err.response.data.statusCode === 401) {
    //   // dev
    //   if (process.env.NODE_ENV === "development") {
    //     try {
    //       const { data } = await axios.get(
    //         `${process.env.REACT_APP_API_URL}/auth/refresh`,
    //         {
    //           headers: {
    //             "Content-Type": "application/json",
    //           },
    //         }
    //       );
    //       // 토큰 재발급 성공시
    //       if (data?.statusCode === 200) {
    //         window.location.reload();
    //         return;
    //       }
    //     } catch (err) {
    //       try {
    //         const { data, statusCode } = await axios.post(
    //           `${process.env.REACT_APP_API_URL}/auth/logout`
    //         );
    //         if (statusCode === 200) {
    //           console.log("로그아웃 처리 성공");
    //         }
    //       } catch (err) {
    //         console.log(err);
    //         console.log("로그아웃 처리 실패");

    //         debugger;
    //       }
    //       // 토큰이 있다면 이라는 확인을 못하나
    //     }

    //     // return;
    //     // const { statusCode, data } = axios.get(
    //     //   `${process.env.REACT_APP_API_URL}/auth/refresh`,
    //     //   {
    //     //     headers: {
    //     //       "Content-Type": "application/json",
    //     //     },
    //     //   }
    //     // );

    //     // const resulte = await statusCode;
    //     // console.log(resulte);
    //     // if (statusCode === 200) {
    //     //   debugger;
    //     //   console.log("새로고침");
    //     //   return;
    //     // }
    //     // const originalResponse = await axios.request(error.config);
    //     // debugger;
    //     // return originalResponse.data.data;

    //     //   if (res.statusCode === 200) {
    //     //     console.log("토큰 재발급 완료");
    //     //     window.location.reload();
    //     //   }
    //   }

    //   // main
    //   if (process.env.NODE_ENV === "production") {
    //     // getToken();
    //   }
    // } else {
    return Promise.reject(err);
    // }
  }
);

// 토큰 재발급
// export const getRefreshToken = async (params) => {

//   try {
//     const res = await axios.get(
//       `${process.env.REACT_APP_API_URL}/auth/refresh`,
//       {
//         headers: {
//           "Content-Type": "application/json",
//         },
//       }
//     );
//     if (res.statusCode === 200) {
//       console.log("토큰 재발급 완료");
//       window.location.reload();
//     }
//   } catch (err) {
//     console.log("토큰 발급 실패");
//     // logout();
//     // window.localStorage.clear();
//   }
// };

// export const getToken = async (params) => {
//   try {
//     const res = await axios.get(
//       `${process.env.REACT_APP_API_URL}/auth/refresh`,
//       {
//         headers: {
//           "Content-Type": "application/json",
//         },
//       }
//     );
//     window.location.reload();
//     return res.data;
//   } catch (e) {
//     console.log("getToken 로그아웃");

//     // Logout();
//   }
// };
