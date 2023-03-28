import React, { useEffect, useState } from "react";
import styled from "styled-components";

// Mui
import { Grid } from "@mui/material";

// Images
import loginImg from "../../assets/login.png";
import logoImg from "../../assets/header.png";

// Components
import AlertModal from "../../components/AlertModal";
import Form from "./Form";

// Api
import { RegisterUser, idCheck } from "../../api/user";

// Styled-components
const Logo = styled.a`
  display: block;
  position: absolute;
  width: auto;
  top: 4%;
  left: 6%;
`;
const LogoImg = styled.img`
  display: block;
  width: 130px;
`;

const BackImg = styled.img`
  position: absolute;
  width: 460px;
  top: 50%;
  left: 48%;
  transform: translate(-50%, -50%);
`;
const Container = styled.div`
  width: 85%;
`;
const StateBar = styled.div`
  width: 100%;
  height: 8px;
  display: flex;
  justify-content: space-between;
  margin-bottom: 50px;
  div {
    width: 31.5%;
    height: 100%;
    background: #dddfee;
    border-radius: 10px;
    &.active {
      background-color: #505bca;
    }
  }
`;

const BtnBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding-top: 30px;
  border-top: 2px solid #d0d6f3;
  margin-top: 40px;
  transform: translate();
  font-weight: 500;
  a {
    display: block;
    padding: 14px 23px;
    border-radius: 5px;
    background: #fff;
    box-shadow: 2px 2px 5px 0px rgba(0, 0, 0, 0.1);
  }
  button {
    padding: 13px 45px;
    border-radius: 5px;
  }
`;

const Prev = styled.button`
  background: #fff;
  margin-right: 17px;
`;
const Next = styled.button`
  background: #505bca;
  color: #fff;
`;

const Register = () => {
  // 이메일 형식
  const emailRegEx =
    /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/;

  const [bizFile, setBizFile] = useState("");
  const [corpImage, setCorpImage] = useState("");
  const [idCheckResult, setIdCheckResult] = useState("");
  // const [file, setFile] = useState("");

  // Modal
  const [alertModal, setAlertModal] = useState(false);
  const [text, setText] = useState("");
  const aleatHandleClose = () => setAlertModal(false);

  let data = [1, 2, 3];
  let [active, setActive] = useState(0);

  // 다음버튼
  const nextActive = (e) => {
    if (active < 2) {
      setActive(active + 1);
    } else {
      submit();
    }
  };

  // 이전버튼
  const prevActive = (e) => {
    if (active > 0) {
      setActive(active - 1);
    } else {
      setAlertModal(true);
      setText("이전없음");
    }
  };

  const [userInfo, setUserInfo] = useState({
    userId: "",
    password: "",
    corpName: "",
    bankName: "",
    bankAccount: "",
    corpCeo: "",
    corpContact: "",
    phone: "",
    corpEmail: "",
    corpAddr1: "",
    corpAddr2: "",
    corpPost: "",
    corpDesc: "",
    bizType: "개인사업자",
    taxType: "단위과세",
    bizNum: "",
    salesNum: "",
  });

  const [isChecked, setIsChecked] = useState({
    service: false,
    info: false,
  });

  function onChange(e) {
    const { name, value } = e.target;
    if (name === "service") {
      setIsChecked({
        ...isChecked,
        service: !isChecked?.service,
      });
    }
    if (name === "info") {
      setIsChecked({
        ...isChecked,
        info: !isChecked?.info,
      });
    }

    if (name === "userId") {
      setIdCheckResult(false);
    }
    setUserInfo({
      ...userInfo,
      [name]: value,
    });
  }

  // 아이디 중복 검사
  const onCheck = async () => {
    if (userInfo.userId == "") {
      setAlertModal(true);
      setText("아이디를 입력해주세요.");
      return;
    }
    const { statusCode } = await idCheck(userInfo.userId);
    if (statusCode == 200) {
      setAlertModal(true);
      setText("사용가능한 아이디입니다.");
      setIdCheckResult(true);
    }
    if (statusCode == 400) {
      setAlertModal(true);
      setText("존재하는 아이디입니다.");
      setIdCheckResult(false);
    }
  };

  const submit = async () => {
    if (!isChecked.info || !isChecked.service) {
      setAlertModal(true);
      setText("이용약관에 동의하여 주십시오.");
      return;
    }
    if (!idCheckResult) {
      setAlertModal(true);
      setText("아이디 중복확인을 해주세요.");
      return;
    }
    for (let key in userInfo) {
      if (!userInfo[key] || !bizFile) {
        setAlertModal(true);
        setText(`브랜드 로고를 제외한 모든 정보를 기입해주세요.`);
        return;
      }
    }
    if (userInfo.password.length < 8) {
      setAlertModal(true);
      setText("비밀번호는 최소 8글자 이상 입력해주세요.");
      return;
    }
    if (userInfo.password != userInfo.passwordCheck) {
      setAlertModal(true);
      setText("비밀번호가 일치하지 않습니다.");
      return;
    }
    if (!emailRegEx.test(userInfo.corpEmail)) {
      setAlertModal(true);
      setText("이메일 형식에 맞지 않습니다.");
      return;
    }
    if (userInfo.phone.slice(0, 3) !== "010" || userInfo.phone.length != 11) {
      setAlertModal(true);
      setText("휴대전화 형식에 맞지 않습니다.");
      return;
    }
    const formData = new FormData();
    for (let key in userInfo) {
      if (key != "passwordCheck") {
        formData.append(key, userInfo[key]);
      }
    }
    formData.append("bizFile", bizFile);
    formData.append("corpImage", corpImage);
    const { data, statusCode, status } = await RegisterUser(formData);
    if (statusCode == 200) {
      setAlertModal(true);
      setText(
        `가입이 완료되었습니다.\n가입승인까지 최대 3일이 걸릴 수 있습니다.`
      );
    }
  };

  // 새로고침 막기 변수
  const preventClose = (e) => {
    e.preventDefault();
    e.returnValue = "";
  };

  // 브라우저에 렌더링 시 한 번만 실행하는 코드
  useEffect(() => {
    (() => {
      window.addEventListener("beforeunload", preventClose);
    })();
    return () => {
      window.removeEventListener("beforeunload", preventClose);
    };
  }, []);

  return (
    <Grid container height={"100vh"}>
      <AlertModal isOpen={alertModal} onClose={aleatHandleClose} text={text} />
      <Grid item xs={4} sx={{ position: "relative" }}>
        <Logo href="/">
          <LogoImg src={logoImg} alt="크래커 로고" />
        </Logo>

        <BackImg src={loginImg} alt="로그인 이미지" />
      </Grid>
      <Grid
        container
        item
        xs={8}
        alignItems={"center"}
        justifyContent={"center"}
        sx={{ background: "#F0F5FD" }}
      >
        <Container>
          <StateBar>
            {data.map((item, idx) => {
              return (
                <div
                  key={idx}
                  value={idx}
                  className={"btn" + (idx == active ? " active" : "")}
                />
              );
            })}
          </StateBar>
          <Form
            active={active}
            infoData={userInfo}
            changeEvent={onChange}
            setBizFiles={setBizFile}
            setCorpImages={setCorpImage}
            setUserInfo={setUserInfo}
            idCheck={onCheck}
            isChecked={isChecked}
          />
          <BtnBox>
            <a href="/">홈으로 가기</a>
            <div>
              <Prev onClick={prevActive}>이전</Prev>
              <Next onClick={nextActive}>
                {active == 2 ? "가입하기" : "다음"}
              </Next>
            </div>
          </BtnBox>
        </Container>
      </Grid>
    </Grid>
  );
};

export default Register;
