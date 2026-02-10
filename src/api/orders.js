import { instance } from "../utils/axios";
import axios from "axios";

const ORDERS_API_BASE_URL = "http://localhost:8080/orders"; //process.env.REACT_APP_ORDER_API_URL;;

const ordersApi = axios.create({
    baseURL: ORDERS_API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
    paramsSerializer: {
        indexes: null,
    }
});

// 전체
export const getOrder = async (params) => {
  try {
    const res = await ordersApi.get(`/partner`, { params });
    return res.data;
  } catch (err) {
    return err.response.data;
  }
};

/*
// 상태
export const getState = async () => {
  try {
    const res = await ordersApi.get(`/order/status`);
    return res.data;
  } catch (err) {
    return err.response.data;
  }
};
*/

// 상태변경
export const editOrderStatus = async (params) => {
    try {
        const res = await ordersApi.patch(`/status`, params);
        return res.data;
    } catch (err) {
        return err.response.data;
    }
};

// 상세
export const getOrderDetail = async (id) => {
  try {
    const res = await ordersApi.get(`/item/${id}`);
    return res.data;
  } catch (err) {
    return err.response.data;
  }
};
// 타입조회
export const getOrderHistory = async (id, type) => {
  try {
    const list = {
      orderId: id,
      type: type,
    };
    const res = await ordersApi.get(`/order/history`, { params: list });
    return res.data;
  } catch (err) {
    return err.response.data;
  }
};



// 상세
export const OrderMemo = async (id, params) => {
    try {
        const res = await instance.patch(`/order/memo/${id}`, params);
        return res.data;
    } catch (err) {
        return err.response.data;
    }
};



// 택배사조회
export const getDelivery = async () => {
  try {
    const res = await instance.get(`/order/deliveryCorp`);
    return res.data;
  } catch (err) {
    return err.response.data;
  }
};
