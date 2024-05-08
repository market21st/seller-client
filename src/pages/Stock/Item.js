import React, { useEffect, useState } from "react";
import styled from "styled-components";

import AlertModal from "../../components/AlertModal";

// Mui
import { FormControl, Select, MenuItem } from "@mui/material";
import { toast } from "react-hot-toast";
// Api
import { editStock, DeleteItem } from "../../api/stock";

const Item = ({
  id,
  thumb,
  optionText,
  gradeText,
  lowestPrice,
  price,
  stock,
  isActive,
  getList,
  curpage,
  setNum,
}) => {
  const [stockData, setStockData] = useState({
    price: price.toLocaleString(),
    stock: stock.toLocaleString(),
    isActive: "",
  });

  function onChange(e) {
    const { name, value } = e.target;

    if (name == "isActive") {
      setStockData({
        ...stockData,
        [name]: value,
      });
    } else {
      setStockData({
        ...stockData,
        [name]: value,
      });
    }
  }

  //가격,재고 컴마
  const handlePrice = (e) => {
    if (!e.target.value || e.target.value < 1) {
      if (e.target.name == "price") {
        setStockData({
          ...stockData,
          price: 0,
        });
        return;
      }
      if (e.target.name == "stock") {
        setStockData({
          ...stockData,
          stock: 0,
        });
        return;
      }
    }
    const numCheck = /^[0-9,]/.test(e.target.value);
    if (numCheck) {
      const numValue = e.target.value
        .replaceAll(",", "")
        .replace(/(^0+)/, "")
        .replace(".", "");
      if (e.target.name === "price") {
        setStockData({
          ...stockData,
          price: numValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
        });
      }
      if (e.target.name === "stock") {
        setStockData({
          ...stockData,
          stock: numValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
        });
      }
    }
  };

  const [alertModal, setAlertModal] = useState(false);
  // 저장
  const edit = async () => {
    if (!stockData.price || stockData.price < 0) {
      setText(`판매가가 0 이하일 수 없습니다.`);
      setAlertModal(true);
      return;
    }
    if (stockData.price?.slice(-3) != "000" || stockData?.price?.length < 4) {
      setText("천원단위 가격입력만 가능합니다.");
      setAlertModal(true);
      return;
    }
    const list = {
      price: String(stockData.price).replace(/,/g, ""),
      stock: String(stockData.stock).replace(/,/g, ""),
      isActive: stockData.isActive === "숨김" ? false : true,
    };
    const { data, statusCode } = await editStock(id, list);
    if (statusCode == 200) {
      toast.success(`저장 완료`);
      getList("", "", curpage);
    } else {
      toast.success(`저장 실패`);
    }
  };

  const deleteList = async () => {
    const { statusCode } = await DeleteItem(id);
    if (statusCode == 200) {
      toast.error(`삭제 완료`);
      getList("", "", curpage);
    } else {
      toast.error(`삭제 실패`);
    }
  };

  const [text, setText] = useState("");
  const aleatHandleClose = () => {
    setAlertModal(false);
    if (text.includes("저장 완료") || text.includes("삭제 완료")) {
      setNum(1);
      getList([]);
    }
    if (text.includes("정말 삭제")) {
      deleteList();
    }
  };

  const alertClose = () => {
    setAlertModal(false);
  };
  const [option, setOption] = useState();

  useEffect(() => {
    if (optionText) {
      const option1 = optionText.split(",")[0];
      const resulte = optionText.replace(`${option1},`, "");
      setOption(resulte);
    }
  }, [optionText]);

  useEffect(() => {
    setStockData({
      price: price.toLocaleString(),
      stock: stock.toLocaleString(),
      isActive: isActive == 0 ? "숨김" : "판매중",
    });
  }, [price, stock, isActive]);

  return (
    <>
      <AlertModal
        isOpen={alertModal}
        onClose={aleatHandleClose}
        text={text}
        closeBtn={text.includes("정말 삭제") ? alertClose : false}
      />
      <ItemBox>
        <img src={thumb} alt={optionText} style={{ width: "50px" }} />
        <h3 style={{ lineHeight: "30px" }}>{`${optionText}`}</h3>
        <Grade>{gradeText}</Grade>
        <Price>
          <span>최저가</span>
          {lowestPrice ? lowestPrice.toLocaleString() : "없음"}
        </Price>
        <EditArea>
          <p>
            <input
              type="text"
              placeholder="0"
              value={stockData.price || ""}
              onChange={handlePrice}
              name="price"
            ></input>
            <label>가격</label>
          </p>
          <p>
            <input
              type="text"
              placeholder="0"
              value={stockData.stock || ""}
              onChange={handlePrice}
              name="stock"
            />
            <label>재고</label>
          </p>

          <FormControl sx={{ width: "28%" }}>
            <Select
              onChange={onChange}
              displayEmpty
              inputProps={{ "aria-label": "Without label" }}
              value={
                stockData.isActive == ""
                  ? isActive == 0
                    ? "숨김"
                    : "판매중"
                  : stockData.isActive
              }
              name="isActive"
              sx={{
                background: "#fff",
                borderRadius: "5px",
                border: "1px solid #464646",
                height: "50px",
              }}
            >
              <MenuItem value="판매중">판매중</MenuItem>
              <MenuItem value="숨김">숨김</MenuItem>
            </Select>
          </FormControl>
        </EditArea>
        <ListBtnBox>
          <button onClick={deleteList}>삭제</button>
          <button onClick={edit}>저장</button>
        </ListBtnBox>
      </ItemBox>
    </>
  );
};

export default Item;

const ItemBox = styled.li`
  white-space: pre-line;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.1);
  h3 {
    padding-left: 20px;
    text-align: left;
    line-height: 1.3;
    width: 30%;
  }
`;

const Grade = styled.div`
  width: 3%;
  text-align: center;
`;

const EditArea = styled.div`
  justify-content: space-between;
  align-items: center;
  display: flex;
  width: 30%;
  input {
    width: 100%;
    border: 1px solid #464646;
    border-radius: 5px;
    padding-right: 12px;
    height: 46px;
    margin-right: 14px;
    text-align: right;
  }
  p {
    position: relative;
    label {
      position: absolute;
      top: -10%;
      left: 10%;
      background: #fff;
      font-size: 12px;
      padding: 0 3px;
    }
  }
  p:nth-child(1) {
    width: 32%;
  }
  p:nth-child(2) {
    width: 22%;
  }
`;

const Price = styled.p`
  width: 15%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 500;
  span {
    background: #fcbaba;
    border-radius: 5px;
    color: #404040;
    font-size: 10px;
    padding: 4px 5px;
    margin-right: 6px;
  }
`;

const ListBtnBox = styled.div`
  width: 15%;
  display: flex;
  justify-content: center;
  button {
    padding: 7px 19px;
    background: #e8e8e8;
    border-radius: 5px;
  }
  button:last-child {
    background: #0082ff;
    color: #fff;
    margin-left: 10px;
  }
`;
