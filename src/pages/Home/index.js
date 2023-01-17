import React from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  height: 100%;
  padding: 50px 59px 0;
`;

const Box = styled.div`
  margin-bottom: 30px;
  font-size: 24px;
  font-weight: bold;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
`;

const ContentBox = styled.div`
  background: #fff;
  border-radius: 10px;
  width: 180px;
  height: 120px;
  box-shadow: 0px 4px 10px 0px rgba(0, 0, 0, 0.1);
  h2 {
    font-size: 15px;
    font-weight: bold;
  }
`;

const Home = () => {
  return (
    <Container>
      <Box>
        <h1>처리 대기</h1>
        <Row>
          <ContentBox>
            <h2>신규주문</h2>
            <strong>11건</strong>
          </ContentBox>
          <ContentBox>
            <h2>신규주문</h2>
            <strong>11건</strong>
          </ContentBox>
        </Row>
      </Box>
      <Box>
        <h1>제품 현황</h1>
      </Box>
      <Box>
        <h1>주문 현황</h1>
      </Box>
    </Container>
  );
};
export default Home;
