import dayjs from "dayjs";
import { instance } from "../utils/axios";

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
