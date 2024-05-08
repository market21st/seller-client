import React, { useEffect, useCallback, useState, useRef } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Item from "./Item";
import { Grid, TextField, Pagination, Tabs, Tab } from "@mui/material";
import { getStockList } from "../../api/stock";
import defaultIcon from "../../assets/default.png";
import GradeModal from "./GradeModal";
import { debounce } from "../../utils/debounce";
import SearchIcon from "@mui/icons-material/Search";

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
      <Container>
        <TopBox>
          <h1>재고 관리</h1>
        </TopBox>
        <SearchArea>
          <Grid item xs={6}>
            <Grid container position={"relative"} alignItems="center">
              <TextField
                fullWidth
                size="small"
                placeholder={"모델명을 입력하세요."}
                variant="outlined"
                value={optionText || ""}
                autoComplete={"off"}
                inputProps={{
                  style: {
                    paddingLeft: "36px",
                    height: "30px",
                    border: "2px solid #0082FF",
                    borderRadius: "20px",
                    "&.Mui-focused fieldset": {
                      borderColor: "green",
                    },
                  },
                }}
                sx={{
                  "input:focus": { boxShadow: 2 },
                }}
                onChange={(e) => setOptionText(e.target.value)}
              />
              <Grid height="24px" sx={{ position: "absolute", left: "10px" }}>
                <SearchIcon />
              </Grid>
            </Grid>
          </Grid>
        </SearchArea>
        <InfoTitle>
          <p>
            우선판매권을 얻으려면<span>현재 최저가미만의 가격</span>을
            입력해야합니다.
          </p>
          <div>
            <button
              onClick={() => {
                setGradeModal(true);
              }}
            >
              등급 기준 보기
            </button>
          </div>
        </InfoTitle>

        <ListContainer>
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
          <ul>
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
          </ul>
        </ListContainer>
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
          />
        </Grid>
      </Container>
    </>
  );
};
export default StockList;

const Container = styled.div`
  width: 100%;
  height: 100%;
  h1 {
    font-size: 24px;
    font-weight: 500;
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

const TopBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 50px 59px 0;
  margin-bottom: 30px;
`;

const SearchArea = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 0 59px 0;
`;

const ItemBox = styled.li`
  box-shadow: 4px 4px 4px 0px rgba(0, 0, 0, 0.1);
  padding: 0 59px 0;
  h2 {
    width: 100%;
    padding: 30px;
    text-align: center;
  }
`;

const InfoTitle = styled.h2`
  font-size: 18px;
  font-weight: 500;
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
  padding: 0 59px 0;
  align-items: flex-end;
  span {
    color: #d74b4b;
    padding: 0 4px;
  }
  button:first-child {
    border: 2px solid #0082ff;
    color: #0082ff;
    background: none;
  }
  button {
    font-size: 16px;
    font-weight: 500;
    padding: 10px 20px;
    background: #fff;
    color: #000;
    border: 1.5px solid #404040;
    border-radius: 5px;
    margin-left: 20px;
  }
`;

const ListContainer = styled.div`
  overflow-y: scroll;
  width: 100%;
  padding: 0 59px 0;
  -ms-overflow-style: none;
  li {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #fff;
    border-radius: 15px;
    padding: 10px 24px;
    font-weight: 800;
    margin-bottom: 2vh;
  }
  li:last-child {
    margin-bottom: 0;
  }
  img {
    width: 75px;
    box-sizing: border-box;
  }
`;
