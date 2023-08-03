import { instance } from "../utils/axios";

// 전체
export const getOrder = async (params) => {
  try {
    const res = await instance.get(`/order`, { params: params });

    return res.data;
  } catch (e) {
    return;
  }
};

// 상태
export const getState = async () => {
  try {
    const res = await instance.get(`/order/status`);
    return res.data;
  } catch (e) {
    return;
  }
};

// 상세
export const getDetail = async (id) => {
  try {
    const res = await instance.get(`/order/info/${id}`);
    return res.data;
  } catch (e) {
    console.log(e);
    return;
  }
};

// 상세
export const OrderMemo = async (id, params) => {
  try {
    const res = await instance.patch(`/order/memo/${id}`, params);
    return res.data;
  } catch (e) {
    console.log(e);
    return;
  }
};

// 타입조회
export const getHistory = async (id, type) => {
  try {
    const list = {
      orderId: id,
      type: type,
    };
    const res = await instance.get(`/order/history`, { params: list });
    return res.data;
  } catch (e) {
    console.log(e);
    return;
  }
};

// 상태변경
export const editStatus = async (id, params) => {
  try {
    const res = await instance.patch(`/order/status/${id}`, params);
    return res.data;
  } catch (err) {
    console.log(err);
    return err.response.data;
  }
};

// 택배사조회
export const getDelivery = async () => {
  try {
    const res = await instance.get(`/order/deliveryCorp`);
    return res.data;
  } catch (e) {
    console.log(e);
    return;
  }
};
