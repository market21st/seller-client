import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { Grid } from "@mui/material";
import logoImg from "../../assets/header.png";
import EmojiImg from "../../assets/grinning_emoji.png";
import { logoutUser } from "../../api/user";

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
    window.open(
      "https://image.21market.kr/production/seller/51d1a35b-7cdd-4acf-a1e1-5c2e06fcbf42.pdf",
      "_blank"
    );
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
      localStorage.removeItem("isLogin");
      navigate("/");
      window.location.reload();
    }
  };

  return (
    <Grid container position={"relative"}>
      <Grid
        container
        display={"inline-flex"}
        direction={"column"}
        justifyContent={"space-between"}
        width={"210px"}
        height={"100%"}
        position={"fixed"}
      >
        <div>
          <Logo href="/">
            <LogoImg src={logoImg} alt="크래커 로고" />
          </Logo>
          <Profile>
            <div>
              <img src={localStorage.getItem("corpLogo")} alt="브랜드로고" />
            </div>
            <span>{localStorage.getItem("corpName")}</span>
            <a
              href={`https://www.21market.kr/partner/detail/${localStorage.getItem(
                "id"
              )}`}
              target="_blank"
              rel="noreferrer"
            >
              내 스토어 바로가기
            </a>
          </Profile>
          <SubProfile>
            <li>
              <p>평균 배송기간</p>
              <span>
                {localStorage.getItem("deliveryPeriod")
                  ? `${localStorage.getItem("deliveryPeriod")}일`
                  : "확인중"}
              </span>
            </li>
            <li>
              <p>검수통과율</p>
              <span>
                {localStorage.getItem("inspectionPassRate")
                  ? `${localStorage.getItem("inspectionPassRate")}%`
                  : "확인중"}
              </span>
            </li>
          </SubProfile>
          <Menu>
            <li>
              <Link
                to="/product"
                className={location.pathname.includes("product") ? "focus" : ""}
              >
                판매 상품 등록
              </Link>
            </li>
            <li>
              <Link
                to="/stock"
                className={location.pathname.includes("stock") ? "focus" : ""}
              >
                판매 상품 관리
              </Link>
            </li>
            <li>
              <Link
                to="/order"
                className={location.pathname.includes("order") ? "focus" : ""}
              >
                주문 출고 관리
              </Link>
            </li>
          </Menu>
          <MyInfo>
            <button
              onClick={() => {
                navigate("/mypage");
              }}
              className={location.pathname.includes("mypage") ? "focus" : ""}
            >
              내 스토어 정보 관리
            </button>
          </MyInfo>
        </div>
        <ButtonBox>
          <button onClick={link1}>회사소개서</button>
          <button onClick={link4}>운영정책</button>
          <button onClick={link2}>이용가이드</button>
          <button onClick={link3}>사업자등록증</button>
        </ButtonBox>
      </Grid>
      <Grid
        display={"inline-flex"}
        flexDirection={"column"}
        width={"calc(100% - 210px)"}
        minHeight={"100vh"}
        position={"absolute"}
        left={210}
        bgcolor={"#F1F4F8"}
      >
        <Header>
          <ul>
            <li>
              <b>{localStorage.getItem("corpName")}</b>님 안녕하세요
              <img src={EmojiImg} alt="emoji" width={16} height={16} />
            </li>
            <li onClick={logout}>
              <button>
                <b>로그아웃</b>
              </button>
            </li>
          </ul>
        </Header>
        <div>{children}</div>
      </Grid>
    </Grid>
  );
};

export default Sidebar;

const LogoImg = styled.img`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
const Logo = styled.a`
  display: block;
  position: relative;
  height: 80px;
  width: 80%;
  margin: 0 auto;
`;

const Profile = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  border-top: 1px solid #e6f3ff;
  img {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    object-fit: cover;
  }
  span {
    font-weight: 500;
  }
  a {
    width: 100%;
    text-align: center;
    padding: 6px 0;
    background-color: #f1f4f8;
    border-radius: 10px;
    font-size: 14px;
  }
`;

const SubProfile = styled.ul`
  padding: 8px 0;
  background-color: #f2f8ff;
  color: #4a5c80;
  display: flex;
  li {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    p {
      font-size: 10px;
    }
    span {
      font-size: 15px;
      font-weight: 700;
    }
  }
  li:first-of-type {
    border-right: 2px solid #cce6ff;
  }
`;

const Menu = styled.ul`
  padding: 10px;
  li a {
    padding: 0 20px;
    display: flex;
    align-items: center;
    height: 44px;
    font-weight: 500;
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
  border-top: 1px solid #e6f3ff;
  button {
    width: 100%;
    padding: 0 20px;
    display: flex;
    align-items: center;
    height: 44px;
    font-weight: 500;
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

const ButtonBox = styled.div`
  width: 100%;
  padding: 10px;
  border-top: 1px solid #e6f3ff;
  button {
    padding: 0 20px;
    display: flex;
    align-items: center;
    height: 40px;
    font-size: 14px;
  }
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: end;
  background: #0082ff;
  height: 80px;
  padding: 0 59px;
  ul {
    display: flex;
    align-items: center;
    color: #fff;
    li {
      display: flex;
      align-items: center;
      padding: 0 20px;
    }
    li:first-of-type {
      border-right: 1px solid rgba(255, 255, 255, 0.3);
    }
  }
`;
