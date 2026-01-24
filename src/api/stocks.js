import { instance } from "../utils/axios";
import axios from "axios";

const PRODUCTS_API_BASE_URL = "http://localhost:8080/products";

// axios 인스턴스 생성 (products 전용)
const productsApi = axios.create({
    baseURL: PRODUCTS_API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

export const getStock = async (params) => {
  try {
    const res =  await productsApi.get(`/word/all`, { params});
    return res.data;
  } catch (err) {
    return err.response.data;
  }
};
export const getProductVarietyApi = async (params) => {
    try {
        const res = await productsApi.get(`/variety`, {params});
        return res.data;
    } catch (err) {
        return err.response.data;
    }
};
export const getPartnerProductVarietyApi = async (params ) => {
    try {
        const res = await productsApi.get(`/variety/partner`, {params});
        return res.data;
    } catch (err) {
        return err.response.data;
    }
};

export const postProductVarietyApi = async (params) => {
    try {
        const res = await productsApi.post(`/variety`, params);
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

export const getPrice = async (params) => {
  try {
    const res = await instance.get(`/product/price`, { params: params });
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
