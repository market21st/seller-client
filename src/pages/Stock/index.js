import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

// Components
import AlertModal from "../../components/AlertModal";
import Item from "./Item";
import AddModal from "./Add";
// Mui
import { FormControl, Select, MenuItem, CircularProgress } from "@mui/material";
// Api
import { getStock, getGrade, getStockList } from "../../api/stock";
import defaultIcon from "../../assets/default.png";
import GradeModal from "./GradeModal";

const searchSelect = {
  background: "#fff",
  height: "46px",
  borderRadius: "10px",
  border: "1px solid #eee",
};

const Container = styled.div`
  width: 100%;
  height: 100%;
  padding: 50px 59px 0;
  h1 {
    font-size: 24px;
    font-weight: bold;
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
    background-color: #cfd4f0;
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
  margin-bottom: 30px;
`;

const SearchArea = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;
const FileterBox = styled.div`
  width: 80%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  justify-items: center;
  padding-right: 65px;
`;

const RowInner = styled.div`
  input {
    border-radius: 10px;
    padding: 10px 14px;
    font-weight: 800;
    width: 100%;
  }
`;

const ItemBox = styled.li`
  box-shadow: 4px 4px 4px 0px rgba(0, 0, 0, 0.1);
  h2 {
    width: 100%;
    padding: 30px;
    text-align: center;
  }
`;
// 임시 박스
const Area = styled.div`
  height: 90px;
  display: flex;
  justify-content: center;
  align-items: center;
  button {
    border-radius: 5px;
    color: #fff;
    padding: 12px 35px;
    background: #4552ce;
    font-weight: bold;
  }
`;

const InfoTitle = styled.h2`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  span {
    color: #d74b4b;
    padding: 0 4px;
  }
  div {
    border: 1.5px solid #404040;
    border-radius: 5px;
    background: #fff;
    padding: 12px 10px;
    font-size: 16px;
  }
  button {
    font-size: 16px;
    font-weight: bold;
    padding: 10px;
    background: #fff;
    color: #404040;
    border: 1.5px solid #404040;
    border-radius: 5px;
  }
`;

const ListContainer = styled.div`
  overflow-y: scroll;
  width: 100%;
  height: 52vh;
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

const FilterBtn = styled.div`
  display: flex;
  button {
    width: 118px;
    padding: 10px 15px;
    background: #fff;
    color: #000;
    font-weight: bold;
    border-radius: 5px;
  }
  button:first-child {
    color: #fff;
    background: #4552ce;
    margin-right: 15px;
  }
`;

const Progress = styled.li`
  display: flex;
  justify-content: center !important;
  align-items: center;
  height: 60px;
  margin-bottom: 50px !important;
  background: none !important;
`;

const StockList = () => {
  const navigator = useNavigate();

  // state
  const [listData, setListData] = useState([]);
  const [productList, setProductList] = useState([]);
  const [gradeList, setGradeList] = useState([]);
  const [productId, setProductId] = useState("");
  const [productName, setProductName] = useState("");

  // 무한 스크롤
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(false);

  const [num, setNum] = useState(1);
  const scrollRef = useRef();

  const scrollTop = () => {
    setNum(1);
    document.getElementById("scroll")?.scrollTo(0, 0);
  };

  // 전체 리스트 조회
  const getList = async (listData, num) => {
    const list = {
      take: 10,
      page: !num ? 1 : num,
      productInfoId: productId,
      isActive:
        userInfo.isActive == "전체"
          ? ""
          : userInfo.isActive === "숨김"
          ? 0
          : userInfo.isActive === "판매중"
          ? 1
          : "",
      optionText: userInfo.optionText,
    };

    if (userInfo.grade) {
      const { data, statusCode } = await getStockList({
        ...list,
        grade:
          userInfo.grade === "B"
            ? 0
            : userInfo.grade === "A"
            ? 1
            : userInfo.grade === "S"
            ? 2
            : "",
      });
      if (data.pageTotal === 0 && data.total > 1) {
        setLoading(false);
        return;
      }
      // 총 0개 리스트 조회시
      if (data.pageTotal === 0) {
        setListData([]);
        setLoading(false);

        return;
      }
      if (data.results) {
        const fetchedData = data.results;
        const mergedData = listData.concat(...fetchedData);
        setListData(mergedData);
        setNum((prev) => prev + 1);
        setFetching(false);
        setLoading(false);
      }
      return;
    }

    // 등급 없을 때
    const { data, statusCode } = await getStockList(list);
    if (statusCode === 200) {
      // 총 14개 리스트
      if (data.pageTotal === 0 && data.total > 1) {
        setLoading(false);

        return;
      }
      // 총 0개 리스트 조회시
      if (data.pageTotal === 0) {
        setListData([]);
        setLoading(false);
        return;
      }
      if (data.results) {
        const fetchedData = data.results;
        const mergedData = listData.concat(...fetchedData);
        setListData(mergedData);
        setNum((prev) => prev + 1);
        setFetching(false);
        setLoading(false);
      }
    }
  };

  // 스크롤 이벤트 핸들러
  const handleScroll = async () => {
    const scrollHeight = scrollRef.current.scrollHeight;
    const scrollTop = scrollRef.current.scrollTop;
    const clientHeight = scrollRef.current.clientHeight;
    if (scrollTop + clientHeight >= scrollHeight - 3 && fetching === false) {
      setFetching(true);
    }
  };

  useEffect(() => {
    scrollRef.current.addEventListener("scroll", handleScroll);
    return () => {
      scrollRef?.current?.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Alert Modal
  const [alertModal, setAlertModal] = useState(false);
  const [text, setText] = useState("");
  const aleatHandleClose = () => {
    setAlertModal(false);
    if (text.includes("저장")) {
      window.location.reload();
    }
  };
  // Add Modal
  const [addModal, setAddModal] = useState(false);
  const AddModalClose = () => {
    setAddModal(false);
  };
  // Grade Modal
  const [gradeModal, setGradeModal] = useState(false);
  const gradeModalClose = () => {
    setGradeModal(false);
  };

  // 변경하는 필터값
  const [userInfo, setUserInfo] = useState({
    productInfoId: "",
    optionText: "",
  });

  function onChange(e) {
    const { name, value } = e.target;
    setUserInfo({
      ...userInfo,
      [name]: value,
    });
  }

  // 제품명 조회
  const getProductList = async () => {
    const { data, statusCode } = await getStock();
    if (statusCode == 200) {
      setProductList(data);
    }
  };

  // 등급 조회
  const getGradeList = async () => {
    const { data, statusCode } = await getGrade();
    if (statusCode == 200) {
      setGradeList(data.results);
    }
  };

  useEffect(() => {
    getList(listData);
    getGradeList();
    getProductList();
  }, []);

  useEffect(() => {
    if (fetching) {
      getList(listData, num);
      setLoading(true);
    }
  }, [fetching]);

  return (
    <>
      <AlertModal isOpen={alertModal} onClose={aleatHandleClose} text={text} />
      <AddModal isOpen={addModal} onClose={AddModalClose} />
      <GradeModal isOpen={gradeModal} onClose={gradeModalClose} />
      <Container>
        <TopBox>
          <h1>재고 관리</h1>
        </TopBox>
        <SearchArea>
          <FileterBox>
            <FormControl sx={{ width: "25%" }}>
              <Select
                onChange={(e) => {
                  for (let i = 0; i < productList.length; i++) {
                    if (productList[i].name == e.target.value) {
                      setProductId(productList[i].id);
                      setProductName(e.target.value);
                    }
                  }
                }}
                displayEmpty
                inputProps={{ "aria-label": "Without label" }}
                value={productName || ""}
                name="productInfoId"
                sx={searchSelect}
              >
                <MenuItem disabled value="">
                  <em>제품명</em>
                </MenuItem>
                {productList &&
                  productList?.map((el, idx) => (
                    <MenuItem key={el.id} value={el.name}>
                      {el.name}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
            <FormControl sx={{ width: "25%" }}>
              <Select
                onChange={onChange}
                displayEmpty
                inputProps={{ "aria-label": "Without label" }}
                value={userInfo.grade || ""}
                name="grade"
                sx={searchSelect}
              >
                <MenuItem disabled value="">
                  <em>등급</em>
                </MenuItem>
                <MenuItem value="전체">전체</MenuItem>
                {gradeList &&
                  gradeList?.map((el, idx) => (
                    <MenuItem key={el.value} value={el.key}>
                      {el.key}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
            <FormControl sx={{ width: "25%" }}>
              <Select
                onChange={onChange}
                displayEmpty
                inputProps={{ "aria-label": "Without label" }}
                value={userInfo.isActive || ""}
                name="isActive"
                sx={searchSelect}
              >
                <MenuItem disabled value="">
                  판매상태
                </MenuItem>
                <MenuItem value="전체">전체</MenuItem>
                <MenuItem value="판매중">판매중</MenuItem>
                <MenuItem value="숨김">숨김</MenuItem>
              </Select>
            </FormControl>
            <RowInner>
              <input
                type="text"
                placeholder="옵션명"
                onChange={onChange}
                name="optionText"
              />
            </RowInner>
          </FileterBox>
          <FilterBtn>
            <button
              onClick={() => {
                scrollTop();
                getList([], 1);
              }}
            >
              필터적용
            </button>
            <button onClick={() => window.location.reload()}>초기화</button>
          </FilterBtn>
        </SearchArea>
        <Area>
          <div>
            <button onClick={() => setAddModal(true)}>상품등록</button>
          </div>
        </Area>
        <InfoTitle>
          <p>
            우선판매권을 얻으려면<span>현재 최저가</span>미만의 가격을
            입력해야합니다.
          </p>
          <button onClick={() => setGradeModal(true)}>등급 기준 보기</button>
        </InfoTitle>
        <ListContainer className="scroll" id="scroll" ref={scrollRef}>
          <ul>
            {listData.length > 0 ? (
              listData.map((el, idx) => (
                <Item
                  key={el.id}
                  id={el.id}
                  thumb={el.thumb ? el.thumb : defaultIcon}
                  optionText={el.optionText}
                  gradeText={el.gradeText}
                  lowestPrice={el.lowestPrice}
                  price={el.price}
                  stock={el.stock}
                  isActive={el.isActive}
                />
              ))
            ) : (
              <ItemBox>
                <h2>등록된 상품이 없습니다.</h2>
              </ItemBox>
            )}

            <Progress>{loading ? <CircularProgress /> : null}</Progress>
          </ul>
        </ListContainer>
      </Container>
    </>
  );
};
export default StockList;
