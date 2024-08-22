import React, { useEffect, useState } from "react";
import styled from "styled-components";
import AlertModal from "../common/AlertModal";
import {
  FormControl,
  Select,
  MenuItem,
  Button,
  TextField,
} from "@mui/material";
import { toast } from "react-hot-toast";
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

  const onChange = (e) => {
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
  };

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
      setText("가격 입력의 최소단위는 1,000원입니다.");
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
      toast.success(`저장 완료`, {
        duration: 4000,
        position: "bottom-center",
        style: {
          marginBottom: 100,
        },
      });
      getList("", "", curpage);
    } else {
      toast.success(`저장 실패`, {
        duration: 4000,
        position: "bottom-center",
        style: {
          marginBottom: 100,
        },
      });
    }
  };

  const deleteList = async () => {
    const { statusCode } = await DeleteItem(id);
    if (statusCode == 200) {
      toast.error(`삭제 완료`, {
        duration: 4000,
        position: "bottom-center",
        style: {
          marginBottom: 100,
        },
      });
      getList("", "", curpage);
    } else {
      toast.error(`삭제 실패`, {
        duration: 4000,
        position: "bottom-center",
        style: {
          marginBottom: 100,
        },
      });
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
      <AlertModal open={alertModal} onClose={alertClose} text={text} />
      <ItemBox>
        <div>
          <Image>
            <img src={thumb} alt={optionText} />
          </Image>
          <Name>{optionText}</Name>
          <Grade>{gradeText}</Grade>
          <Price>
            <span>최저가</span>
            {lowestPrice ? lowestPrice.toLocaleString() : "없음"}
          </Price>
          <EditArea>
            <TextField
              label="가격"
              placeholder="0"
              value={stockData.price || ""}
              onChange={handlePrice}
              name="price"
            />
            <TextField
              label="재고"
              placeholder="0"
              value={stockData.stock || ""}
              onChange={handlePrice}
              name="stock"
            />
            <FormControl sx={{ width: 200 }}>
              <Select
                name="isActive"
                value={
                  stockData.isActive == ""
                    ? isActive == 0
                      ? "숨김"
                      : "판매중"
                    : stockData.isActive
                }
                onChange={onChange}
              >
                <MenuItem value="판매중">판매중</MenuItem>
                <MenuItem value="숨김">숨김</MenuItem>
              </Select>
            </FormControl>
          </EditArea>
        </div>
        <ButtonWrap>
          <Button variant="outlined" size="large" onClick={deleteList}>
            삭제
          </Button>
          <Button variant="contained" size="large" onClick={edit}>
            저장
          </Button>
        </ButtonWrap>
      </ItemBox>
    </>
  );
};

export default Item;

const ItemBox = styled.li`
  width: 100%;
  padding: 10px 20px;
  border-radius: 10px;
  background: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  p {
    font-weight: 500;
  }
  & > div:first-of-type {
    width: 90%;
    display: flex;
    align-items: center;
    gap: 20px;
  }
`;

const Image = styled.div`
  display: flex;
  img {
    width: 50px;
    object-fit: contain;
  }
`;

const Name = styled.p`
  width: 20%;
`;

const Grade = styled.p`
  width: 5%;
`;

const Price = styled.p`
  width: 10%;
  display: flex;
  align-items: center;
  gap: 8px;
  span {
    padding: 4px 8px;
    font-size: 12px;
    background: #fcbaba;
    border-radius: 8px;
  }
`;

const EditArea = styled.div`
  display: flex;
  gap: 20px;
`;

const ButtonWrap = styled.div`
  display: flex;
  gap: 20px;
`;
