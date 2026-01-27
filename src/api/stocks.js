import { instance } from "../utils/axios";
import axios from "axios";

const PRODUCTS_API_BASE_URL = process.env.REACT_APP_PRODUCT_API_URL;

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

export const getCategoryListApi = async () => {
    try {
        const res = await productsApi.get(`/category`);
        return res.data;
    } catch (err) {
        return err.response.data;
    }
};

export const getStockList = async (params) => {
    try {
        const res = await productsApi.get(`/variety/stock`, { params });
        return res.data;
    } catch (err) {
        return err.response.data;
    }
};

export const patchProductVariety = async (params) => {
    try {
        const res = await productsApi.patch(`/variety`, params);
        return res.data.data;
    } catch (err) {
        return err.response.data;
    }
};

export const deleteProductVariety = async (id) => {
    try {
        const res = await productsApi.delete(`/variety/${id}`);
        console.log(res);
        return res.data.data;
    } catch (err) {
        return err.response.data;
    }
};



