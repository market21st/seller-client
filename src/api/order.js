import toast from "react-hot-toast";
import { instance } from "../utils/axios";

// 전체
export const getOrder = async (params) => {
  try {
    const res = await instance.get(`/order`, { params: params });
    return res.data;
  } catch (err) {
    return err.response.data;
  }
};

// 상태
export const getState = async () => {
  try {
    const res = await instance.get(`/order/status`);
    return res.data;
  } catch (err) {
    return err.response.data;
  }
};

// 상세
export const getOrderDetail = async (id) => {
  try {
    const res = await instance.get(`/order/info/${id}`);
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

// 타입조회
export const getOrderHistory = async (id, type) => {
  try {
    const list = {
      orderId: id,
      type: type,
    };
    const res = await instance.get(`/order/history`, { params: list });
    return res.data;
  } catch (err) {
    return err.response.data;
  }
};

// 상태변경
export const editOrderStatus = async (id, params) => {
  try {
    const res = await instance.patch(`/order/status/${id}`, params);
    return res.data;
  } catch (err) {
    // if (err.response.data.statusCode === 400) {
    //   toast.error(err.response.data.message, {
    //     duration: 4000,
    //     style: {
    //       marginTop: "20px",
    //     },
    //   });
    // }
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
