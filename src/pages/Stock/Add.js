import React, { useEffect, useState } from "react";
import styled from "styled-components";

import AlertModal from "../../components/AlertModal";
import ContentModal from "../../components/ContentModal";

// Mui
import { FormControl, Select, MenuItem } from "@mui/material";

// Api
import {
  getProductInfo,
  getGrade,
  getOptions,
  getPrice,
  postProduct,
} from "../../api/stock";

// styled
const InnerBox = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  margin-bottom: 12px;
  .MuiOutlinedInput-notchedOutline {
    border: 0;
  }
  label {
    width: 25%;
    font-size: 18px;
  }
  span {
    font-size: 14px;
    color: #505bca;
  }
  input {
    border-radius: 5px;
    padding: 14px;
    width: 100%;

    font-weight: 800;
    border: 1px solid #000;
    box-sizing: border-box;
  }
`;

const searchSelect = {
  borderRadius: "5px",
  background: "#fff",
  border: "1px solid #000",
  height: "50px",
};

const RowInner = styled.div`
  width: 75%;
`;

const AddModal = ({ isOpen, onClose }) => {
  const [productData, setProductData] = useState([]);
  const [data, setData] = useState([]);

  const [gradeList, setGradeList] = useState([]);

  const [name, setName] = useState("");
  const [productId, setProductId] = useState();
  const [option, setOption] = useState("");
  const [optionId, setOptionId] = useState("");
  const [optionList, setOptionList] = useState("");
  const [grade, setGrade] = useState("S");

  const [price, setPrice] = useState("");

  function onChange(e) {
    const { name, value } = e.target;
    setProductData({
      ...productData,
      [name]: value,
    });
  }

  // 가격, 재고 컴마
  const handlePrice = (e) => {
    if (!e.target.value || e.target.value < 1) {
      if (e.target.name == "price") {
        setProductData({
          ...productData,
          price: 0,
        });
        return;
      }
      if (e.target.name == "stock") {
        setProductData({
          ...productData,
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
        setProductData({
          ...productData,
          price: numValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
        });
      }
      if (e.target.name === "stock") {
        setProductData({
          ...productData,
          stock: numValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
        });
      }
    }
  };

  // 등급
  const getGrades = async () => {
    const { data, statusCode } = await getGrade();
    if (statusCode == 200) {
      setGradeList(data.results);
      setGrade(data.results[0].key);
    }
  };

  // 옵션
  const getOptionList = async () => {
    const { data, statusCode } = await getOptions(productId);
    if (statusCode === 200) {
      setOptionList(data);
      setOption(data[0]?.optionText);
      setOptionId(data[0]?.id);
    }
  };

  //   최저가
  const getPriceData = async () => {
    const list = {
      logic: 1,
      productInfoId: productId || 1,
      productOptionId: optionId || 1,
      grade: grade == "B" ? 0 : grade == "A" ? 1 : 2,
    };

    const { data, statusCode } = await getPrice(list);
    if (statusCode === 200) {
      if (!data) {
        setPrice("없음");
        return;
      }
      setPrice(data.price);
    }
  };

  const postEvent = async () => {
    if (
      !productData.price ||
      productData.price < 1 ||
      !productData.stock ||
      productData.stock < 1
    ) {
      setAlertText("가격과 재고는 1이상만 입력 가능합니다.");
      setAlertModal(true);
      return;
    }

    const list = {
      infoId: productId,
      optionId: optionId,
      grade: grade == "B" ? 0 : grade == "A" ? 1 : 2,
      price: String(productData.price).replace(/,/g, ""),
      stock: String(productData.stock).replace(/,/g, ""),
    };

    const { data, statusCode } = await postProduct(list);
    if (statusCode === 200) {
      setAlertText(
        "등록 성공! \n판매중으로 저장되었고 수정은 목록에서 진행바랍니다."
      );
      setAlertModal(true);
    }
    if (data.statusCode === 400) {
      setAlertText(data.message);
      setAlertModal(true);
    }
  };

  useEffect(() => {
    const getProduct = async () => {
      const { data, statusCode } = await getProductInfo();
      if (statusCode == 200) {
        setData(data);
        setName(data[0].name);
        setProductId(data[0].id);
      }
    };
    getProduct();
  }, []);

  useEffect(() => {
    getGrades();
    if (productId) getOptionList();
  }, [name]);

  useEffect(() => {
    getPriceData();
  }, [option, grade]);

  // Content Modal
  const [text, setText] = useState("상품 등록");

  const df = (
    <>
      <InnerBox>
        <label>제품명*</label>
        <RowInner>
          <FormControl sx={{ width: "100%" }}>
            <Select
              onChange={(e) => {
                setName(e.target.value);
                for (let i = 0; i < data.length; i++) {
                  if (data[i].name == e.target.value) {
                    setProductId(data[i].id);
                  }
                }
              }}
              displayEmpty
              inputProps={{ "aria-label": "Without label" }}
              value={name}
              name="infoId"
              sx={searchSelect}
            >
              {data &&
                data?.map((el, idx) => (
                  <MenuItem key={el.id} value={el.name}>
                    {el.name}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
        </RowInner>
      </InnerBox>
      <InnerBox>
        <label>옵션명*</label>
        <RowInner>
          <FormControl sx={{ width: "100%" }}>
            <Select
              onChange={(e) => {
                setOption(e.target.value);
                for (let i = 0; i < optionList.length; i++) {
                  if (optionList[i].optionText == e.target.value) {
                    setOptionId(optionList[i].id);
                  }
                }
              }}
              displayEmpty
              inputProps={{ "aria-label": "Without label" }}
              value={option}
              name="optionId"
              sx={searchSelect}
            >
              {optionList &&
                optionList?.map((el, idx) => (
                  <MenuItem key={el.id} value={el.optionText}>
                    {el.optionText}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
        </RowInner>
      </InnerBox>
      <InnerBox>
        <label>등급*</label>
        <RowInner>
          <FormControl sx={{ width: "100%" }}>
            <Select
              onChange={(e) => {
                setGrade(e.target.value);
              }}
              displayEmpty
              inputProps={{ "aria-label": "Without label" }}
              value={grade}
              name="grade"
              sx={searchSelect}
            >
              {gradeList &&
                gradeList?.map((el, idx) => (
                  <MenuItem key={el.value} value={el.key}>
                    {el.key}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
        </RowInner>
      </InnerBox>
      <InnerBox style={{ margin: "34px 0px 12px" }}>
        <label></label>
        <span>{`현재 최저가 : ${price.toLocaleString()}`}</span>
      </InnerBox>
      <InnerBox>
        <label>가격*</label>
        <RowInner>
          <input
            className="area"
            type="text"
            name="price"
            value={productData?.price || ""}
            onChange={handlePrice}
          />
        </RowInner>
      </InnerBox>
      <InnerBox>
        <label>재고*</label>
        <RowInner>
          <input
            className="area"
            type="text"
            name="stock"
            value={productData?.stock || ""}
            onChange={handlePrice}
          />
        </RowInner>
      </InnerBox>
    </>
  );

  // 모달
  const [alertModal, setAlertModal] = useState(false);
  const [alertText, setAlertText] = useState("");
  const [cancel, setCancel] = useState(false);
  const aleatHandleClose = () => {
    setAlertModal(false);

    if (alertText.includes("등록 성공")) {
      window.location.reload();
    }
  };

  return (
    <>
      <AlertModal
        isOpen={alertModal}
        onClose={aleatHandleClose}
        text={alertText}
        closeBtn={cancel}
      />
      <ContentModal
        isOpen={isOpen}
        text={text}
        closeBtn={onClose}
        contents={df}
        postEvent={postEvent}
        setState={setProductData}
      />
    </>
  );
};

export default AddModal;
