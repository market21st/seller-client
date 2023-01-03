import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Link } from "react-router-dom";

// Mui
import { Grid } from "@mui/material";

// Images
import logoImg from "../assets/kracker.png";
import stockIcon from "../assets/stock.png";
import orderIcon from "../assets/order.png";
import reviewIcon from "../assets/review.png";
import myIcon from "../assets/my.png";
import paperIcon from "../assets/paper.png";
import logoutIcon from "../assets/logout.png";

// Styled-components
const LogoImg = styled.img`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
const Logo = styled.div`
  position: relative;
  height: 75px;
  width: 75%;
  margin: 0 auto;
  border-bottom: 1.5px solid #c7cbf0;
`;

// 메뉴
const Menu = styled.ul`
  margin: 0 auto;
  width: 75%;
  padding: 54px 0px 37px;
  border-bottom: 1.5px solid #c7cbf0;
  li {
    color: #4552ce;
    font-size: 18px;
    font-weight: 700;
    margin-bottom: 24px;
    img {
      padding-right: 16px;
    }
  }
  li:last-child {
    margin-bottom: 0;
  }
  a {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

// 마이페이지
const MyInfo = styled.button`
  color: #4552ce;
  font-size: 18px;
  font-weight: 700;
  margin-top: 39px;
  background: none;
  position: relative;
  left: 46%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  cursor: pointer;
  img {
    padding-right: 16px;
  }
`;

// 하단 버튼(사업자등록증, 로그아웃)
const ButtonBox = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  bottom: 0;
  margin-bottom: 17px;
  width: 100%;
  div {
    display: inline-block;
    margin-left: 5px;
  }
  button {
    display: block;
    margin: 0 auto;
    font-size: 18px;
    font-weight: 700;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  button:first-child {
    color: #fff;
    background: #505bca;
    text-align: left;
    line-height: 1.2;
    border-radius: 10px;
    padding: 7px;
  }
  button:last-child {
    color: #ddd;
    background: none;
    color: #505bca;
    padding: 20px 0;
    img {
      padding-left: 10px;
    }
  }
  span {
    font-size: 12px;
  }
`;

// 헤더
const Header = styled.h1`
  background: #cfd4f0;
  height: 75px;
  width: 100%;
  line-height: 75px;
  padding-left: 59px;
`;

const Sidebar = ({ children }) => {
  const navigate = useNavigate();

  return (
    <Grid container>
      <Grid
        item
        sx={{
          background: "#fff",
          width: "187px",
          height: "100vh",
          position: "relative",
        }}
      >
        <Logo>
          <LogoImg src={logoImg} alt="크래커 로고" />
        </Logo>
        <Menu>
          <li>
            <Link to="/login">
              <img src={stockIcon} alt="재고관리" />
              재고관리
            </Link>
          </li>
          <li>
            <Link to="/login">
              <img src={orderIcon} alt="주문관리" />
              주문관리
            </Link>
          </li>
          <li>
            <Link to="/login">
              <img src={reviewIcon} alt="리뷰관리" />
              리뷰관리
            </Link>
          </li>
        </Menu>
        <MyInfo
          onClick={() => {
            navigate("/mypage");
          }}
        >
          <img src={myIcon} alt="내정보" />
          내정보
        </MyInfo>
        <ButtonBox>
          <button>
            <img src={paperIcon} alt="사업자등록증" />
            <div>
              <span>21세기전파상</span>
              <br />
              사업자등록증
            </div>
          </button>
          <button>
            로그아웃
            <img src={logoutIcon} alt="사업자등록증" />
          </button>
        </ButtonBox>
      </Grid>
      <Grid item sx={{ background: "#F1F4F8", width: "calc(100% - 187px);" }}>
        <Header sx={{ background: "#CFD4F0", height: "75px", width: "100%" }}>
          아이픽스존 님 안녕하세요!
        </Header>
        <Grid sx={{ width: "100%" }}>{children}</Grid>
      </Grid>
    </Grid>
  );
};

export default Sidebar;
