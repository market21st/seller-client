import React, { useEffect, useCallback, useState } from "react";
import styled from "styled-components";
import Item from "../../components/stock/Item";
import { Grid, TextField, Pagination, Tabs, Tab, Button } from "@mui/material";
import { getStockList } from "../../api/stock";
import defaultIcon from "../../assets/default.png";
import GradeModal from "../../components/stock/GradeModal";
import { debounce } from "../../utils/debounce";
import SearchIcon from "@mui/icons-material/Search";
import { TemplateTitleWrap, TemplateWrap } from "../order";

const StockList = () => {
  const [listData, setListData] = useState([]);
  const [optionText, setOptionText] = useState(null);
  const [total, setTotal] = useState(0);
  const [curpage, setCurPage] = useState(1);
  const [gradeModal, setGradeModal] = useState(false);
  const [type, setType] = useState("ALL");
  const getList = async (txt, t, v = 1) => {
    const { data, statusCode } = await getStockList({
      take: 10,
      page: v ? v : curpage,
      productInfoId: "",
      isActive: "",
      optionText: txt ? txt : optionText,
      type: t ? t : type,
    });
    if (statusCode === 200) {
      setTotal(data.total);
      setListData(data.results);
    }
  };
  const gradeModalClose = () => {
    setGradeModal(false);
  };
  const onChangePage = (v) => {
    setCurPage(v);
    getList("", "", v);
  };
  const debounceInfo = debounce(getList, 100);
  const handleChange = (event, newValue) => {
    setType(newValue);
    setCurPage(1);
    setOptionText(null);
  };
  const getdebounceInfo = useCallback((txt, t) => {
    debounceInfo(txt, t);
  }, []);
  useEffect(() => {
    if (optionText !== null) getdebounceInfo(optionText, type);
  }, [optionText]);

  useEffect(() => {
    getList();
  }, [type]);

  return (
    <>
      <GradeModal isOpen={gradeModal} onClose={gradeModalClose} />
      <TemplateWrap>
        <TemplateTitleWrap>
          <h2>판매중인 상품</h2>
        </TemplateTitleWrap>
        <SearchArea>
          <Grid container position={"relative"} alignItems="center">
            <TextField
              size="small"
              placeholder={"모델명을 입력하세요."}
              value={optionText || ""}
              inputProps={{
                style: {
                  paddingLeft: "36px",
                  height: "30px",
                  width: "500px",
                },
              }}
              onChange={(e) => setOptionText(e.target.value)}
            />
            <Grid height="24px" sx={{ position: "absolute", left: "10px" }}>
              <SearchIcon />
            </Grid>
          </Grid>
        </SearchArea>
        <InfoTitle>
          <p>
            우선판매권을 얻으려면 <span>현재 최저가미만의 가격</span>을
            입력해야합니다.
          </p>
          <Button
            variant="contained"
            size="large"
            onClick={() => {
              setGradeModal(true);
            }}
          >
            등급 기준 보기
          </Button>
        </InfoTitle>
        <div>
          <Tabs
            value={type}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab label="전체" value={"ALL"} />
            <Tab label="최저가" value={"1"} />
            <Tab label="최저가 아닌 상품" value={"2"} />
            <Tab label="오늘 등록한 상품" value={"3"} />
          </Tabs>
          <List>
            {listData.length > 0 ? (
              listData.map((el, idx) => (
                <Item
                  key={idx}
                  id={el.id}
                  thumb={el.thumb ? el.thumb : defaultIcon}
                  optionText={el.optionText}
                  gradeText={el.gradeText}
                  lowestPrice={el.lowestPrice}
                  price={el.price}
                  stock={el.stock}
                  isActive={el.isActive}
                  getList={getList}
                  setListData={setListData}
                  listData={listData}
                  curpage={curpage}
                  setNum={setCurPage}
                />
              ))
            ) : (
              <ItemBox>
                <h2>등록된 상품이 없습니다.</h2>
              </ItemBox>
            )}
          </List>
        </div>
        <Grid
          container
          justifyContent={"center"}
          padding={"20px 0"}
          backgroundColor="#f1f4f8"
        >
          <Pagination
            count={Math.ceil(total / 10)}
            page={curpage}
            onChange={(e, page) => onChangePage(page)}
            showFirstButton
            showLastButton
          />
        </Grid>
      </TemplateWrap>
    </>
  );
};
export default StockList;

const Container = styled.div`
  width: 100%;
  height: 100%;
  h1 {
    font-size: 20px;
  }
  em {
    font-style: normal;
  }
  .area {
    width: 279px;
  }
  & .MuiOutlinedInput-notchedOutline {
    border: none !important;
  }
  a {
    display: block;
    padding: 10px 0 5px;
  }
  .scroll::-webkit-scrollbar {
    width: 10px;
  }
  .scroll::-webkit-scrollbar-thumb {
    background-color: #0082ff;
    border-radius: 5px;
  }
  .scroll::-webkit-scrollbar-track {
    background-color: #f8f8f8;
  }
`;

const SearchArea = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const ItemBox = styled.li`
  box-shadow: 4px 4px 4px 0px rgba(0, 0, 0, 0.1);
  h2 {
    width: 100%;
    padding: 30px;
    text-align: center;
  }
`;

const InfoTitle = styled.div`
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  p {
    font-size: 20px;
    font-weight: 500;
  }
  span {
    color: #d74b4b;
    padding: 0 4px;
  }
`;

const List = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px 0;
`;
