import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
  FormControl,
  Select,
  MenuItem,
  Grid,
  Typography,
  Button,
} from "@mui/material";
import { manageDate, statistics } from "../../api/myInfo";
import Popup from "../../components/common/Popup";
import ArrowForwardIcon from "../../assets/arrow_forward.svg";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
import AccountsPolicy from "../../assets/accounts_policy.png";

const Home = () => {
  const [dateList, setDateList] = useState([]);
  const [date, setDate] = useState("");
  const [dashboard, setDashboard] = useState({});

  const getDate = async () => {
    const { data, statusCode } = await manageDate();
    if (statusCode === 200) {
      setDate(data[0]);
      setDateList(data);
    }
  };
  const getStatistics = async () => {
    const { data, statusCode } = await statistics({ date });
    if (statusCode === 200) setDashboard(data);
  };

  useEffect(() => {
    getDate();
  }, []);
  useEffect(() => {
    if (date) getStatistics();
  }, [date]);

  return (
    <>
      <Popup />
      <Container>
        <Grid container justifyContent={"space-between"} alignItems={"center"}>
          <h2>대시보드</h2>
          <Grid display={"inline-flex"} alignItems={"center"} gap={2}>
            <Typography>
              {dayjs(dashboard.updatedDate).format("YYYY.MM.DD HH:mm")}
            </Typography>
            <Button size="small" variant="outlined" onClick={getStatistics}>
              업데이트
            </Button>
          </Grid>
        </Grid>
        <Box>
          <Grid
            container
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <h3>주문 처리상태</h3>
            <Link to={"/order"}>
              <button>
                <img src={ArrowForwardIcon} alt="arrow" />
              </button>
            </Link>
          </Grid>
          <ul>
            <Item isLink>
              <span>신규 주문</span>
              <Link to={"/order?status=500"}>
                <p>
                  <b>{dashboard.newOrderCount}</b>건
                </p>
              </Link>
            </Item>
            <Item isLink>
              <span>출고 대기</span>
              <Link to={"/order?status=110"}>
                <p>
                  <b>{dashboard.preparingOrderCount}</b>건
                </p>
              </Link>
            </Item>
            <Item isLink>
              <span>매입확정(검수통과)</span>
              <Link to={"/order?status=200"}>
                <p>
                  <b>{dashboard.passedInspectionCount}</b>건
                </p>
              </Link>
            </Item>
            <Item isLink>
              <span>검수 미통과</span>
              <Link to={"/order?status=140"}>
                <p>
                  <b>{dashboard.failedInspectionOrderCount}</b>건
                </p>
              </Link>
            </Item>
            <Item isLink>
              <span>출고불가 확정</span>
              <Link to={"/order?status=160"}>
                <p>
                  <b>{dashboard.confirmedNotShippableOrderCount}</b>건
                </p>
              </Link>
            </Item>
          </ul>
        </Box>
        <Box>
          <Grid
            container
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <h3>상품 관리</h3>
            <Link to={"/stock"}>
              <button>
                <img src={ArrowForwardIcon} alt="arrow" />
              </button>
            </Link>
          </Grid>
          <ul>
            <Item>
              <span>판매중 상품</span>
              <p>
                <b>{dashboard.onSaleProductCount}</b>건
              </p>
            </Item>
            <Item>
              <span>숨김 상품</span>
              <p>
                <b>{dashboard.hiddenProductCount}</b>건
              </p>
            </Item>
            <Item>
              <span>품절 상품</span>
              <p>
                <b>{dashboard.outOfStockProductCount}</b>건
              </p>
            </Item>
          </ul>
        </Box>
        <Box>
          <Grid container justifyContent={"center"} alignItems={"center"}>
            <img
              src={AccountsPolicy}
              alt="정산 정책 변경 안내"
              style={{ width: "90%" }}
            />
          </Grid>
        </Box>
        {/* <Box>
          <Grid container alignItems={"center"} gap={2}>
            <h3>정산 예정</h3>
            <p>정산 기준일에 대한 안내글</p>
          </Grid>
          <ul>
            <Item>
              <span>매입확정</span>
              <p>
                <b>{dashboard.confirmedPurchaseCount}</b>건
              </p>
            </Item>
            <Item>
              <span>
                {dayjs(dashboard.updatedDate).format("YYYY.MM.DD")} 예상 정산
                금액
              </span>
              <p>
                <b>{dashboard.expectedRevenueDuringPeriod?.toLocaleString()}</b>
                원
              </p>
            </Item>
          </ul>
        </Box> */}
      </Container>
    </>
  );
};
export default Home;

const Container = styled.div`
  padding: 40px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  h2 {
    font-size: 20px;
    font-weight: 700;
  }
`;

const Box = styled.div`
  padding: 30px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  border-radius: 10px;
  border: 1px solid #ced4f4;
  background: #fff;
  h3 {
    font-size: 18px;
    font-weight: 700;
  }
  ul {
    display: flex;
    gap: 20px;
  }
`;

const Item = styled.li`
  width: 100%;
  padding: 20px;
  border-radius: 8px;
  background: #eff5fe;
  display: flex;
  flex-direction: column;
  gap: 20px;
  font-size: 18px;
  font-weight: 500;
  p {
    width: fit-content;
    display: inline-flex;
    align-items: center;
    gap: 4px;
    line-height: 1.2;
    border-bottom: ${({ isLink }) => (isLink ? "1px solid black" : "none")};
    cursor: ${({ isLink }) => (isLink ? "pointer" : "auto")};
    b {
      font-size: 20px;
    }
  }
`;
