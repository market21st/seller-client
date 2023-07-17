import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { Link } from "react-router-dom";

// Mui
import { Grid } from "@mui/material";

// Images
import logoImg from "../assets/header.png";
import stockIcon from "../assets/stock.png";
import stockFocusIcon from "../assets/stockwhite.png";
import orderIcon from "../assets/order.png";
import orderFocusIcon from "../assets/orderwhite.png";
import reviewIcon from "../assets/review.png";
import myIcon from "../assets/my.png";
import myFocusIcon from "../assets/mywhite.png";
import paperIcon from "../assets/paper.png";
import logoutIcon from "../assets/logout.png";
import { cookies } from "../layout";
import bizfile from "../assets/bizfile.jpg";
import paperIcon2 from "../assets/bizfile2.png";

import { logoutUser } from "../api/user";

// Styled-components
const LogoImg = styled.img`
  width: 130px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
const Logo = styled.a`
  display: block;
  position: relative;
  height: 7.6vh;
  width: 80%;
  margin: 0 auto;
  border-bottom: 1.5px solid #c7cbf0;
`;

// 메뉴
const Menu = styled.ul`
  margin: 0 auto;
  width: 80%;
  padding: 54px 0px 37px;
  border-bottom: 1.5px solid #c7cbf0;
  li {
    color: #4552ce;
    font-size: 18px;
    font-weight: 700;
    margin-bottom: 10px;
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
    padding: 8px 13px;
  }
  .focus {
    background: #4552ce;
    border-radius: 10px;
    color: #fff;
  }
`;

const MyInfo = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 38px;

  button {
    font-size: 18px;
    font-weight: 700;
    background: none;
    cursor: pointer;
    width: 75%;
    color: #4552ce;
    padding: 8px 13px;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }
  img {
    padding-right: 16px;
  }
  .focus {
    background: #4552ce;
    border-radius: 10px;
    color: #fff;
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
  button:nth-child(1),
  button:nth-child(2),
  button:nth-child(3) {
    color: #fff;
    background: #505bca;
    text-align: left;
    line-height: 1.2;
    border-radius: 10px;
    padding: 7px;
    width: 80%;
    margin-top: 10px;
  }
  button:nth-child(1) {
    background: #26282b;
  }
  button:nth-child(2) {
    background: #d3d3d3;
    color: #26282b;
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
const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #cfd4f0;
  height: 7.6vh;
  width: 100%;
  padding: 0 59px;
  h1 {
    font-family: "GmarketSansMedium";
    line-height: 7.6vh;
    font-size: 20px;
    font-weight: 500;
  }
  div {
    display: flex;
    align-items: center;
  }
  .imgBox {
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background: #fff;
    margin-right: 17px;
  }
  img {
    width: 80%;
  }
  ul {
    display: flex;
  }
  li {
    margin: 0 14px;
    cursor: pointer;
  }
  li:last-child {
    margin-right: 0;
  }
`;

const Sidebar = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const link1 = () => {
    window.open(
      "https://drive.google.com/file/d/1T_v1e-ltW4g7U1mNareuLq_caC2K8_HS/view?usp=sharing",
      "_blank"
    );
  };
  const link2 = () => {
    window.open("https://image.21market.kr/info/us/useDisc.pdf", "_blank");
  };
  const link3 = () => {
    window.open("https://image.21market.kr/info/us/bizReg.pdf", "_blank");
  };
  const link4 = () => {
    window.open(
      "https://drive.google.com/file/d/1eR8eMgtUlwIRklKFJUJNz5kqI9wDccxg/view?usp=sharing",
      "_blank"
    );
  };

  //로그아웃 api
  const logout = async () => {
    const { statusCode } = await logoutUser();
    if (statusCode == 200) {
      window.localStorage.clear();
      navigate("/");
      window.location.reload();
    }
  };

  return (
    <Grid container>
      <Grid
        item
        sx={{
          background: "#fff",
          width: "230px",
          height: "100vh",
          position: "relative",
        }}
      >
        <Logo href="/">
          <LogoImg src={logoImg} alt="크래커 로고" />
        </Logo>
        <Menu>
          <li>
            {location.pathname.includes("product") ? (
              <Link to="/product" className="focus">
                <img src={stockFocusIcon} alt="전체 상품 목록" />
                전체 상품 목록
              </Link>
            ) : (
              <Link to="/product">
                <img src={stockIcon} alt="전체 상품 목록" />
                전체 상품 목록
              </Link>
            )}
          </li>
          <li>
            {location.pathname.includes("stock") ? (
              <Link to="/stock" className="focus">
                <img src={stockFocusIcon} alt="판매중인 상품" />
                판매중인 상품
              </Link>
            ) : (
              <Link to="/stock">
                <img src={stockIcon} alt="판매중인 상품" />
                판매중인 상품
              </Link>
            )}
          </li>
          <li>
            {location.pathname.includes("order") ? (
              <Link to="/order" className="focus">
                <img src={orderFocusIcon} alt="주문관리" />
                주문관리
              </Link>
            ) : (
              <Link to="/order">
                <img src={orderIcon} alt="주문관리" />
                주문관리
              </Link>
            )}
          </li>
        </Menu>
        <MyInfo>
          {location.pathname.includes("mypage") ? (
            <button
              onClick={() => {
                navigate("/mypage");
              }}
              className="focus"
            >
              <img src={myFocusIcon} alt="내정보" />
              내정보
            </button>
          ) : (
            <button
              onClick={() => {
                navigate("/mypage");
              }}
            >
              <img src={myIcon} alt="내정보" />
              내정보
            </button>
          )}
        </MyInfo>
        <ButtonBox>
          {/* <button onClick={link1}>
            <img src={paperIcon} alt="사업자등록증" />
            <div>
              <span>21세기전파상</span>
              <br />
              회사소개서
            </div>
          </button>
          <button onClick={link2}>
            <img src={paperIcon2} alt="사업자등록증" />
            <div>
              <span>셀러 어드민</span>
              <br />
              이용설명서
            </div>
          </button>
          <button onClick={link3}>
            <img src={paperIcon} alt="사업자등록증" />
            <div>
              <span>21세기전파상</span>
              <br />
              사업자등록증
            </div>
          </button> */}
          <button onClick={logout}>
            로그아웃
            <img src={logoutIcon} alt="사업자등록증" />
          </button>
        </ButtonBox>
      </Grid>
      <Grid
        item
        sx={{
          background: "#F1F4F8",
          width: "calc(100% - 230px)",
          position: "relative",
        }}
      >
        <Header>
          <div>
            <div className="imgBox">
              <img src={localStorage.getItem("corpLogo")} alt="브랜드로고" />
            </div>
            <h1>{localStorage.getItem("corpName")}님 안녕하세요!</h1>
          </div>
          <ul>
            <li onClick={link1}>회사소개서</li>|
            <li onClick={link4}>운영정책</li>|
            <li onClick={link2}>이용가이드</li>|
            <li onClick={link3}>사업자등록증</li>
          </ul>
        </Header>
        <Grid sx={{ width: "100%" }}>{children}</Grid>
      </Grid>
    </Grid>
  );
};

export default Sidebar;
