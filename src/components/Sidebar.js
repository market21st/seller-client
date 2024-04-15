import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Link } from "react-router-dom";

// Mui
import { Grid } from "@mui/material";

// Images
import logoImg from "../assets/header.png";

import { logoutUser } from "../api/user";

// Styled-components
const LogoImg = styled.img`
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
`;

const Profile = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  border-top: 1px solid #cfd4f0;
  img {
    width: 80px;
    height: 80px;
    border-radius: 50%;
  }
  span {
    font-weight: 600;
  }
  a {
    width: 100%;
    text-align: center;
    padding: 6px 0;
    background-color: #f1f4f8;
    border-radius: 10px;
    font-size: 14px;
    font-weight: 500;
  }
`;

// 메뉴
const Menu = styled.ul`
  padding: 10px;
  border-top: 1px solid #cfd4f0;
  li a {
    padding: 0 20px;
    display: flex;
    align-items: center;
    height: 44px;
    font-weight: 600;
    border-radius: 10px;
  }
  li a:hover {
    color: #0082ff;
  }
  .focus {
    background-color: #e6f3ff;
    color: #0082ff;
  }
`;

const MyInfo = styled.div`
  padding: 10px;
  border-top: 1px solid #cfd4f0;
  button {
    width: 100%;
    padding: 0 20px;
    display: flex;
    align-items: center;
    height: 44px;
    font-weight: 600;
    border-radius: 10px;
  }
  button:hover {
    color: #0082ff;
  }
  .focus {
    background-color: #e6f3ff;
    color: #0082ff;
  }
`;

// 하단 버튼(사업자등록증, 로그아웃)
const ButtonBox = styled.div`
  width: 100%;
  padding: 10px;
  position: absolute;
  bottom: 0;
  border-top: 1px solid #cfd4f0;
  button {
    padding: 0 20px;
    display: flex;
    align-items: center;
    height: 40px;
    font-size: 14px;
    font-weight: 500;
  }
`;

// 헤더
const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: end;
  background: #0082ff;
  height: 7.6vh;
  width: 100%;
  padding: 0 59px;
  ul {
    display: flex;
    align-items: center;
    color: #fff;
    li {
      padding: 0 20px;
    }
    li:first-of-type {
      border-right: 1px solid rgba(255, 255, 255, 0.3);
    }
  }
`;

const Sidebar = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const link1 = () => {
    window.open(
      "https://drive.google.com/file/d/18j3iwoK_RUkZII96cqn0Gd19S7xVduYs/view?usp=sharing",
      "_blank"
    );
  };
  const link2 = () => {
    window.open(
      "https://drive.google.com/file/d/18j3iwoK_RUkZII96cqn0Gd19S7xVduYs/view?usp=sharing",
      "_blank"
    );
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
          width: "210px",
          height: "100vh",
          position: "relative",
        }}
      >
        <Logo href="/">
          <LogoImg src={logoImg} alt="크래커 로고" />
        </Logo>
        <Profile>
          <div>
            <img src={localStorage.getItem("corpLogo")} alt="브랜드로고" />
          </div>
          <span>{localStorage.getItem("corpName")}</span>
          <a href="https://www.21market.kr/" target="_blank">
            내 스토어 바로가기
          </a>
        </Profile>
        <Menu>
          <li>
            {location.pathname.includes("product") ? (
              <Link to="/product" className="focus">
                전체 상품 목록
              </Link>
            ) : (
              <Link to="/product">전체 상품 목록</Link>
            )}
          </li>
          <li>
            {location.pathname.includes("stock") ? (
              <Link to="/stock" className="focus">
                판매중인 상품
              </Link>
            ) : (
              <Link to="/stock">판매중인 상품</Link>
            )}
          </li>
          <li>
            {location.pathname.includes("order") ? (
              <Link to="/order" className="focus">
                주문 배송 관리
              </Link>
            ) : (
              <Link to="/order">주문 배송 관리</Link>
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
              내 스토어 정보 관리
            </button>
          ) : (
            <button
              onClick={() => {
                navigate("/mypage");
              }}
            >
              내 스토어 정보 관리
            </button>
          )}
        </MyInfo>
        <ButtonBox>
          <button onClick={link1}>회사소개서</button>
          <button onClick={link4}>운영정책</button>
          <button onClick={link2}>이용가이드</button>
          <button onClick={link3}>사업자등록증</button>
          {/* <button onClick={logout}>
            로그아웃
            <img src={logoutIcon} alt="사업자등록증" />
          </button> */}
        </ButtonBox>
      </Grid>
      <Grid
        item
        sx={{
          background: "#FAFBFE",
          width: "calc(100% - 210px)",
          position: "relative",
        }}
      >
        <Header>
          <ul>
            <li>
              <b>{localStorage.getItem("corpName")}</b>님 안녕하세요😀
            </li>
            <li onClick={logout}>
              <button>
                <b>로그아웃</b>
              </button>
            </li>
          </ul>
        </Header>
        <Grid sx={{ width: "100%" }}>{children}</Grid>
      </Grid>
    </Grid>
  );
};

export default Sidebar;
