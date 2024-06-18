import React, { useEffect, useState } from "react";
import styled from "styled-components";
// Mui
import { FormControl, Select, MenuItem } from "@mui/material";
import { manageDate, statistics } from "../../api/myInfo";
import Popup from "../../components/common/Popup";

const searchSelect = {
  borderRadius: "5px",
  background: "#fff",
  height: "40px",
  width: "120px",
  color: "#0082FF",
  fontSize: "17px",
  fontWeight: "500",
};

const Home = () => {
  const [dateList, setDateList] = useState([]);
  const [date, setDate] = useState("");
  const [userData, setUserData] = useState([]);
  const resulte = (code) => code === 200;

  const getDate = async () => {
    const { data, statusCode } = await manageDate();
    if (resulte(statusCode)) {
      setDate(data[0]);
      setDateList(data);
    }
  };
  const getStatistics = async () => {
    const list = {
      date: date,
    };
    const { data, statusCode } = await statistics(list);
    if (resulte(statusCode)) {
      setUserData(data);
    }
  };
  useEffect(() => {
    getDate();
  }, []);

  useEffect(() => {
    if (date) getStatistics();
  }, [date]);

  return (
    <Container>
      <Popup />
      <Box>
        <h1>처리 대기</h1>
        <Row>
          <ContentBox>
            <h2>신규주문</h2>
            <span>{userData.newOrdersCount}건</span>
          </ContentBox>
          <ContentBox>
            <h2>배송 준비중</h2>
            <span>{userData.readyToDeliveryCount}건</span>
          </ContentBox>
          <ContentBox>
            <h2>반품 요청</h2>
            <span>{userData.requestToReturnCount}건</span>
          </ContentBox>
        </Row>
      </Box>
      <Box>
        <h1>제품 현황</h1>
        <Row>
          <ContentBox>
            <h2>판매중 제품</h2>
            <span>{userData.onSaleCount}건</span>
          </ContentBox>
          <ContentBox>
            <h2>숨김 제품</h2>
            <span>{userData.hidedCount}건</span>
          </ContentBox>
          <ContentBox>
            <h2>품절 제품</h2>
            <span>{userData.soldOutCount}건</span>
          </ContentBox>
        </Row>
      </Box>
      <Box>
        <h1>
          <p>주문 현황</p>
          <div>
            <FormControl sx={{ width: "100%" }}>
              <Select
                onChange={(e) => {
                  setDate(e.target.value);
                }}
                displayEmpty
                inputProps={{ "aria-label": "Without label" }}
                value={date}
                name="infoId"
                sx={searchSelect}
              >
                {dateList &&
                  dateList?.map((el, idx) => (
                    <MenuItem key={idx} value={el}>
                      {el}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          </div>
        </h1>
        <Row>
          <ContentBox>
            <h2>총 주문 건수</h2>
            <span>{userData.totalOrdersCount}건</span>
          </ContentBox>
          <ContentBox>
            <h2>환불 건수</h2>
            <span>{userData.requestToRefundCount}건</span>
          </ContentBox>
          <ContentBox>
            <h2>예상 매출액</h2>
            <span>{Math.ceil(userData.expectTakeSum)}원</span>
          </ContentBox>
        </Row>
      </Box>
    </Container>
  );
};
export default Home;

const Container = styled.div`
  width: 100%;
  height: 100%;
  padding: 52px;
  display: flex;
  flex-direction: column;
  gap: 32px;
  .MuiOutlinedInput-notchedOutline {
    border: 2px solid #0082ff;
  }
`;

const Box = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  h1 {
    display: flex;
    align-items: center;
    gap: 16px;
    font-size: 20px;
  }
`;

const Row = styled.div`
  display: flex;
  gap: 16px;
`;

const ContentBox = styled.div`
  width: 180px;
  height: 120px;
  padding: 16px;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0px 4px 10px 0px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
  h2 {
    width: 100%;
    font-size: initial;
    font-weight: initial;
    text-align: center;
    border-bottom: 2px solid #e1e7ef;
    padding-bottom: 8px;
  }
  span {
    border-bottom: 1px solid #404040;
    padding-bottom: 2px;
    font-size: 20px;
    font-weight: 500;
  }
`;
