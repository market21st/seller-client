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
  font-weight: 500;
  h1 {
    display: flex;
    align-items: flex-end;
    font-size: 24px;
    font-weight: 500;
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
  font-weight: 500;
  h2 {
    font-size: 15px;
    font-weight: 500;
    padding-bottom: 10px;
    border-bottom: 2px solid #e1e7ef;
  }
  span {
    display: inline-block;
    border-bottom: 1px solid #404040;
    padding-bottom: 2px;
    margin-top: 20px;
  }
`;

const searchSelect = {
  borderRadius: "5px",
  background: "#fff",
  height: "40px",
  width: "120px",
  color: "#505BCA",
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
      <Box>
        <h1>?????? ??????</h1>
        <Row>
          <ContentBox>
            <h2>????????????</h2>
            <span>{userData.newOrdersCount}???</span>
          </ContentBox>
          <ContentBox>
            <h2>?????? ?????????</h2>
            <span>{userData.readyToDeliveryCount}???</span>
          </ContentBox>
          <ContentBox>
            <h2>?????? ??????</h2>
            <span>{userData.requestToReturnCount}???</span>
          </ContentBox>
        </Row>
      </Box>
      <Box>
        <h1>?????? ??????</h1>
        <Row>
          <ContentBox>
            <h2>????????? ??????</h2>
            <span>{userData.onSaleCount}???</span>
          </ContentBox>
          <ContentBox>
            <h2>?????? ??????</h2>
            <span>{userData.hidedCount}???</span>
          </ContentBox>
          <ContentBox>
            <h2>?????? ??????</h2>
            <span>{userData.soldOutCount}???</span>
          </ContentBox>
        </Row>
      </Box>
      <Box>
        <h1>
          <p>?????? ??????</p>
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
            <h2>??? ?????? ??????</h2>
            <span>{userData.totalOrdersCount}???</span>
          </ContentBox>
          <ContentBox>
            <h2>?????? ??????</h2>
            <span>{userData.requestToRefundCount}???</span>
          </ContentBox>
          <ContentBox>
            <h2>?????? ?????????</h2>
            <span>{Math.ceil(userData.expectTakeSum)}???</span>
          </ContentBox>
        </Row>
      </Box>
    </Container>
  );
};
export default Home;
