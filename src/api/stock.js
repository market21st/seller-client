import { instance } from "../utils/axios";

export const getStock = async () => {
  try {
    const res = await instance.get(`/product/info`);
    return res.data;
  } catch (e) {
    console.log(e);
    return;
  }
};
export const getGrade = async () => {
  try {
    const res = await instance.get(`/product/grade`);
    return res.data;
  } catch (e) {
    console.log(e);
    return;
  }
};

export const getStockList = async (params) => {
  try {
    const res = await instance.get(`/product`, { params: params });
    return res.data;
  } catch (e) {
    console.log(e);
    return;
  }
};

export const editStock = async (id, params) => {
  try {
    const res = await instance.patch(`/product/${id}`, params);
    return res.data;
  } catch (e) {
    console.log(e);
    return;
  }
};

export const DeleteItem = async (id, params) => {
  try {
    const res = await instance.delete(`/product/${id}`);
    return res.data;
  } catch (e) {
    console.log(e);
    return;
  }
};

export const getProductInfo = async () => {
  try {
    const res = await instance.get(`/product/info`);
    return res.data;
  } catch (e) {
    console.log(e);
    return;
  }
};
export const getOptions = async (id) => {
  try {
    const res = await instance.get(`/product/info/${id}`);
    return res.data;
  } catch (e) {
    console.log(e);
    return;
  }
};
export const getPrice = async (params) => {
  try {
    const res = await instance.get(`/product/price`, { params: params });
    return res.data;
  } catch (e) {
    console.log(e);
    return;
  }
};

export const postProduct = async (params) => {
  try {
    const res = await instance.post(`/product`, params);
    return res.data;
  } catch (err) {
    console.log(err.response);
    return err.response;
  }
};

// export const getGrade = async (params) => {
//   try {
//     const res = await instance.patch(`/manage/my`, params);
//     return res.data;
//   } catch (e) {
//     console.log(e);
//     return;
//   }
// };
