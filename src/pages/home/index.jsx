import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Grid, Typography, Button } from "@mui/material";
import { statistics } from "../../api/myInfo";
import Popup from "../../components/common/Popup";
import ArrowForwardIcon from "../../assets/arrow_forward.svg";
import dayjs from "dayjs";
import { Link } from "react-router-dom";

const Home = () => {
  const [dashboard, setDashboard] = useState({});

  const getStatistics = async () => {
    const { data, statusCode } = await statistics();
    if (statusCode === 200) setDashboard(data);
  };

  useEffect(() => {
    getStatistics();
  }, []);

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
                  <b>{dashboard.newOrderCount || 0}</b>건
                </p>
              </Link>
            </Item>
            <Item isLink>
              <span>출고 대기</span>
              <Link to={"/order?status=110"}>
                <p>
                  <b>{dashboard.preparingOrderCount || 0}</b>건
                </p>
              </Link>
            </Item>
            <Item isLink>
              <span>매입확정(검수통과)</span>
              <Link to={"/order?status=200"}>
                <p>
                  <b>{dashboard.passedInspectionCount || 0}</b>건
                </p>
              </Link>
            </Item>
            <Item isLink>
              <span>검수 미통과</span>
              <Link to={"/order?status=140"}>
                <p>
                  <b>{dashboard.failedInspectionOrderCount || 0}</b>건
                </p>
              </Link>
            </Item>
            <Item isLink>
              <span>출고불가 확정</span>
              <Link to={"/order?status=160"}>
                <p>
                  <b>{dashboard.confirmedNotShippableOrderCount || 0}</b>건
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
                <b>{dashboard.onSaleProductCount || 0}</b>건
              </p>
            </Item>
            <Item>
              <span>숨김 상품</span>
              <p>
                <b>{dashboard.hiddenProductCount || 0}</b>건
              </p>
            </Item>
            <Item>
              <span>품절 상품</span>
              <p>
                <b>{dashboard.outOfStockProductCount || 0}</b>건
              </p>
            </Item>
          </ul>
        </Box>
        {process.env.NODE_ENV === "development" ||
        (process.env.NODE_ENV === "production" &&
          process.env.REACT_APP_VIEWABEL_ID_TO_ACCOUNT_DASHBOARD ==
            dashboard.sellerId) ? (
          <Box>
            <Grid
              container
              justifyContent={"space-between"}
              alignItems={"center"}
            >
              <h3>정산 예정</h3>
              <a
                href="https://image.21market.kr/partner/settlement_info.png"
                target="_blank"
              >
                <Typography sx={{ textDecoration: "underline" }}>
                  정산 기준일
                </Typography>
              </a>
            </Grid>
            <ul>
              <Item>
                <span>
                  정산 건 수<span>매입확정 처리된 주문</span>
                </span>
                <p>
                  <b>{dashboard.expectedSettlementCount || 0}</b>건
                </p>
              </Item>
              <Item>
                <span>정산 금액</span>
                <p>
                  <b>
                    {(dashboard.expectedSettlementAmount || 0).toLocaleString()}
                  </b>
                  원
                </p>
              </Item>
            </ul>
          </Box>
        ) : null}
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
  span {
    display: flex;
    align-items: center;
    gap: 8px;
    span {
      font-size: 16px;
      font-weight: 400;
      color: #888;
    }
  }
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
