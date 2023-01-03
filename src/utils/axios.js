import axios from "axios";
// import { Cookies } from "react-cookie";
// export const cookies = new Cookies();

export const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  //   timeout: 5000,
  //   headers: { Authorization: `Bearer ${cookies.get("accessToken")}` },
});

instance.interceptors.response.use(
  function (res) {
    return res;
  },
  function (e) {
    console.log(e);
    // if (e.response.data.statusCode === 401) {
    //   getRefreshToken();
    //   return;
    // }
    return Promise.reject(e);
  }
);

// export const getRefreshToken = async (params) => {
//   try {
//     console.log(`${cookies.get("refreshToken")}`);
//     const token = `${cookies.get("refreshToken")}`;
//     const res = await axios.post(
//       `https://dev-apis.kracker.kr/vendor/auth/getAccessToken`,
//       { refreshToken: token },
//       {
//         headers: {
//           "Content-Type": "application/json",
//         },
//       }
//     );
//     const today = new Date();
//     const expireDate = today.setDate(today.getDate() + 1);
//     cookies.set("accessToken", res.data.data.accessToken, {
//       secure: false,
//       expires: new Date(expireDate),
//       path: "/",
//     });
//     cookies.set("refreshToken", res.data.data.refreshToken, {
//       secure: false,
//       expires: new Date(expireDate),
//       path: "/",
//     });
//     window.location.reload();
//     return res.data;
//   } catch (e) {
//     cookies.remove("refreshToken");
//     cookies.remove("accessToken");
//     window.location.href = "/";
//     console.log(e);
//   }
// };
