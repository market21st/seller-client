import { instance } from "../utils/axios";

export const myInfo = async () => {
  try {
    const res = await instance.get(`/manage/my`);
    return res.data;
  } catch (e) {
    console.log(e);
    return;
  }
};

export const editMyInfo = async (params) => {
  try {
    const res = await instance.patch(`/manage/my`, params);
    return res.data;
  } catch (e) {
    console.log(e);
    return;
  }
};
