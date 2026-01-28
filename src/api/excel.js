import dayjs from "dayjs";
import { instance } from "../utils/axios";
import axios from "axios";

export const getExcel = async (endUrl, fileName, params) => {
  try {
    const today = dayjs().format("YYYYMMDD");

    const res = await instance({
      method: "get",
      url: endUrl,
      responseType: "blob",
      params,
    });

    const url = window.URL.createObjectURL(
      new Blob([res.data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      })
    );

    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `${today}_${fileName}.xlsx`);
    document.body.appendChild(link);
    link.click();
  } catch (err) {
    return err.response.data;
  }
};

const REACT_APP_ORDER_EXCEL_API_URL = process.env.REACT_APP_ORDER_EXCEL_API_URL;

const ordersExcelApi = axios.create({
    baseURL: REACT_APP_ORDER_EXCEL_API_URL,
    headers: {
        "Content-Type": "application/json",
    },
    paramsSerializer: {
        indexes: null,
    }
});


export const getExcels = async (endUrl, fileName, params) => {
    try {
        const today = dayjs().format("YYYYMMDD");

        const res = await ordersExcelApi({
            method: "get",
            url: endUrl,
            responseType: "blob",
            params,
        });

        const url = window.URL.createObjectURL(
            new Blob([res.data], {
                type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            })
        );

        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `${today}_${fileName}.xlsx`);
        document.body.appendChild(link);
        link.click();
    } catch (err) {
        return err.response.data;
    }
};
