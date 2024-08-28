import { instance } from "../utils/axios";

export const getStock = async (params) => {
  try {
    const res = await instance.get(`/product/info`, { params });
    return res.data;
  } catch (err) {
    return err.response.data;
  }
};
export const getMyProduct = async (id) => {
  try {
    const res = await instance.get(`/product/info/my/${id}`);
    return res.data;
  } catch (err) {
    return err.response.data;
  }
};
export const getGrade = async () => {
  try {
    const res = await instance.get(`/product/grade`);
    return res.data;
  } catch (err) {
    return err.response.data;
  }
};

export const getStockList = async (params) => {
  try {
    const res = await instance.get(`/product`, { params: params });
    return res.data;
  } catch (err) {
    return err.response.data;
  }
};

export const editStock = async (id, params) => {
  try {
    const res = await instance.patch(`/product/${id}`, params);
    return res.data;
  } catch (err) {
    return err.response.data;
  }
};

export const DeleteItem = async (id, params) => {
  try {
    const res = await instance.delete(`/product/${id}`);
    return res.data;
  } catch (err) {
    return err.response.data;
  }
};

export const getProductInfo = async () => {
  try {
    const res = await instance.get(`/product/info`);
    return res.data;
  } catch (err) {
    return err.response.data;
  }
};
export const getOptions = async (id) => {
  try {
    const res = await instance.get(`/product/info/${id}`);
    return res.data;
  } catch (err) {
    return err.response.data;
  }
};
export const getPrice = async (params) => {
  try {
    const res = await instance.get(`/product/price`, { params: params });
    return res.data;
  } catch (err) {
    return err.response.data;
  }
};

export const postProduct = async (params) => {
  try {
    const res = await instance.post(`/product`, params);
    return res.data;
  } catch (err) {
    return err.response.data;
  }
};

export const getCategoryListApi = async () => {
  try {
    const res = await instance.get(`/product/categoryList`);
    return res.data;
  } catch (err) {
    return err.response.data;
  }
};
