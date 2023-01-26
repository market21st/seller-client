import React, { useEffect, useState } from "react";
import styled from "styled-components";
// Mui
import { FormControl, Select, MenuItem } from "@mui/material";

import { manageDate, statistics } from "../../api/myInfo";

const Container = styled.div`
  width: 100%;
  height: 100%;
  padding: 50px 59px 0;
  .MuiOutlinedInput-notchedOutline {
    border: 2px solid #505bca;
  }
`;

const Box = styled.div`
  margin-bottom: 30px;
  font-size: 24px;
  font-weight: bold;
  h1 {
    display: flex;
    align-items: flex-end;
    font-size: 24px;
    font-weight: bold;
  }
  p {
    margin-right: 18px;
  }
`;

const Row = styled.div`
  display: flex;
  align-items: center;
`;

const ContentBox = styled.div`
  margin: 15px 22px 0 0;
  padding: 15px 25px;
  background: #fff;
  border-radius: 10px;
  width: 180px;
  height: 120px;
  box-shadow: 0px 4px 10px 0px rgba(0, 0, 0, 0.1);
  text-align: center;
  font-weight: bold;
  h2 {
    font-size: 15px;
    font-weight: bold;
    padding-bottom: 10px;
    border-bottom: 2px solid #e1e7ef;
  }
  span {
    display: inline-block;
    border-bottom: 1px solid #404040;
    margin-top: 20px;
  }
`;

const searchSelect = {
  borderRadius: "5px",
  background: "#fff",
  // border: "2px solid #505BCA",
  height: "40px",
  width: "120px",
  color: "#505BCA",
  fontSize: "17px",
  fontWeight: "bold",
};

const Home = () => {
  const [dateList, setDateList] = useState([]);
  const [date, setDate] = useState("");
  const [userData, setUserData] = useState([]);

  const getDate = async () => {
    const { data, statusCode } = await manageDate();
    setDate(data[0]);
    if (statusCode == 200) {
      setDateList(data);
    }
  };
  const getStatistics = async () => {
    const list = {
      date: date,
    };
    const { data, statusCode } = await statistics(list);
    if (statusCode == 200) {
      setUserData(data);
    }
  };
  useEffect(() => {
    getDate();
  }, []);

  useEffect(() => {
    getStatistics();
  }, [date]);

  return (
    <Container>
      <Box>
        <h1>처리 대기</h1>
        <Row>
          <ContentBox>
            <h2>신규주문</h2>
            <span>{userData.newOrdersCount}</span>
          </ContentBox>
          <ContentBox>
            <h2>운송 준비중</h2>
            <span>{userData.readyToDeliveryCount}</span>
          </ContentBox>
          <ContentBox>
            <h2>반품 요청</h2>
            <span>{userData.requestToReturnCount}</span>
          </ContentBox>
        </Row>
      </Box>
      <Box>
        <h1>제품 현황</h1>
        <Row>
          <ContentBox>
            <h2>판매중 제품</h2>
            <span>{userData.onSaleCount}</span>
          </ContentBox>
          <ContentBox>
            <h2>숨김 제품</h2>
            <span>{userData.hidedCount}</span>
          </ContentBox>
          <ContentBox>
            <h2>품절 제품</h2>
            <span>{userData.soldOutCount}</span>
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
                  //   setName(e.target.value);
                  //   for (let i = 0; i < data.length; i++) {
                  //     if (data[i].name == e.target.value) {
                  //       setProductId(data[i].id);
                  //     }
                  //   }
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
            <span>{userData.totalOrdersCount}</span>
          </ContentBox>
          <ContentBox>
            <h2>반품 건수</h2>
            <span>{userData.requestToRefundCount}</span>
          </ContentBox>
          <ContentBox>
            <h2>예상 매출액</h2>
            <span>{userData.expectTakeSum}</span>
          </ContentBox>
        </Row>
      </Box>
    </Container>
  );
};
export default Home;
