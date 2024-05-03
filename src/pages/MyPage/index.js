import React, { useEffect, useState } from "react";
import styled from "styled-components";
import CloseIcon from "@mui/icons-material/Close";
import PostModal from "../Register/PostModal";
import { useNavigate } from "react-router-dom";

// Components
import AlertModal from "../../components/AlertModal";
// Mui
import { FormControl, Select, MenuItem } from "@mui/material";
// Api
import { myInfo, editMyInfo } from "../../api/myInfo";

const Container = styled.div`
  position: relative;
  height: 90%;
  h1 {
    font-size: 20px;
    font-weight: 700;
    line-height: 1.5;
  }
  h2 {
    font-size: 14px;
    color: #5a6080;
    font-weight: 400;
    line-height: 1.5;
  }
  & .MuiOutlinedInput-notchedOutline {
    border: none !important;
  }
  a {
    display: block;
    padding: 10px 0 5px;
  }
`;

const SendBtn = styled.button`
  display: inline;
  padding: 16px 20px;
  width: 100px;
  border-radius: 8px;
  background: #0082ff;
  color: #fff;
`;

const BlueBtn = styled.button`
  background: #0082ff;
  color: #fff;
  padding: 16px 25px;
  border-radius: 5px;
  font-size: 14px;
  margin-left: 14px;
`;

// 검색 모달
const ModalPost = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 350px;
  border: 1px solid #ddd;
  height: 560px;
  overflow: hidden;
  background: #fff;
  h1 {
    font-size: 18px;
    color: #909090;
    padding: 15px 15px;
    border-bottom: 1px solid #ddd;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;

const ModalBack = styled.div`
  position: absolute;
  z-index: 88;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
`;

const Box = styled.div`
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  padding: 40px 60px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const FormBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 20px;
  border: 1px solid #cfd4f0;
  background: #fff;
  border-radius: 10px;
  h3 {
    font-size: 14px;
    color: #8e9ebf;
  }
  ul {
    display: flex;
    flex-direction: column;
    gap: 16px;
    li {
      display: flex;
      align-items: center;
      gap: 10px;
      span {
        width: 200px;
        font-size: 14px;
        font-weight: 500;
      }
    }
  }
  input {
    width: 400px;
    box-sizing: border-box;
    height: 56px;
    padding: 10px 20px;
    border-radius: 8px;
    border: 1px solid #8e9ebf;
    &.small {
      width: 120px;
    }
  }
`;

const TextArea = styled.textarea`
  width: 600px;
  box-sizing: border-box;
  padding: 10px 20px;
  border-radius: 8px;
  border: 1px solid #8e9ebf;
  resize: none;
`;

const MyPage = () => {
  const navigator = useNavigate();
  // 이메일 형식
  const emailRegEx =
    /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/;

  const [bizFile, setBizFile] = useState("");
  const [logoFile, setLogoFile] = useState("");

  // Modal
  const [alertModal, setAlertModal] = useState(false);
  const [text, setText] = useState("");
  const aleatHandleClose = () => {
    setAlertModal(false);
    if (text.includes("저장 완료")) {
      window.location.reload();
    }
  };

  const [userInfo, setUserInfo] = useState({});
  const [enroll_company, setEnroll_company] = useState({
    address1: "",
    address2: "",
  });

  function onChange(e) {
    const { name, value } = e.target;
    console.log(name, value);
    setUserInfo({
      ...userInfo,
      [name]: value,
    });
  }

  // 내정보 조회
  const getInfo = async () => {
    const { data, statusCode } = await myInfo();
    if (statusCode == 200) {
      setUserInfo(data);
      setEnroll_company({
        address1: data.corpAddr1,
        address2: data.corpPost,
      });
    }
  };

  const onSubmit = async () => {
    const {
      password,
      corpName,
      bankName,
      bankAccount,
      corpCeo,
      corpContact,
      phone,
      corpEmail,
      corpAddr2,
      corpDesc,
      bizType,
      taxType,
      bizNum,
      salesNum,
    } = userInfo;
    const list = {
      password: password,
      corpName: corpName,
      bankName: bankName,
      bankAccount: bankAccount,
      corpCeo: corpCeo,
      corpContact: corpContact,
      phone: phone,
      corpEmail: corpEmail,
      corpAddr1: enroll_company.address1,
      corpAddr2: corpAddr2,
      corpPost: enroll_company.address2,
      corpDesc: corpDesc,
      bizType: bizType,
      taxType: taxType,
      bizNum: bizNum,
      salesNum: salesNum,
    };

    if (!list.password || !userInfo.passwordCheck) {
      setAlertModal(true);
      setText("비밀번호를 입력해주세요.");
      return;
    }
    if (list.password.length < 8) {
      setAlertModal(true);
      setText("비밀번호는 최소 8글자 이상 입력해주세요.");
      return;
    }
    if (list.password != userInfo.passwordCheck) {
      setAlertModal(true);
      setText("비밀번호가 일치하지 않습니다.");
      return;
    }

    for (let key in list) {
      if (!list[key]) {
        setAlertModal(true);
        setText(`정보를 수정하시려면 필수값을 모두 입력해주세요.`);
        return;
      }
    }

    if (!emailRegEx.test(list.corpEmail)) {
      setAlertModal(true);
      setText("이메일 형식에 맞지 않습니다.");
      return;
    }
    if (list.phone.slice(0, 3) !== "010" || list.phone.length != 11) {
      setAlertModal(true);
      setText("휴대전화 형식에 맞지 않습니다.");
      return;
    }
    if (list.phone.slice(0, 3) !== "010" || list.phone.length != 11) {
      setAlertModal(true);
      setText("휴대전화 형식에 맞지 않습니다.");
      return;
    }

    const formData = new FormData();
    for (let key in list) {
      formData.append(key, list[key]);
    }
    formData.append("bizFile", bizFile);
    formData.append("corpImage", logoFile);

    const { data, statusCode } = await editMyInfo(formData);
    if (statusCode == 200) {
      if (data.corpLogo) {
        localStorage.setItem("corpLogo", data.corpLogo);
      }
      localStorage.setItem("corpName", data.corpName);
      setAlertModal(true);
      setText(`저장 완료`);
    } else {
      setAlertModal(true);
      setText("에러");
    }
  };

  // 주소 검색
  const [popup, setPopup] = useState(false);
  const handleComplete = (data) => {
    setPopup(!popup);

    if (popup === true) {
      setUserInfo({
        ...userInfo,
        corpAddr1: enroll_company.address1,
        corpPost: enroll_company.address2,
      });
    }
  };

  useEffect(() => {
    getInfo();
  }, []);

  return (
    <>
      <AlertModal isOpen={alertModal} onClose={aleatHandleClose} text={text} />
      <Container>
        {popup && (
          <ModalBack>
            <ModalPost>
              <h1>
                주소검색
                <CloseIcon onClick={handleComplete} />
              </h1>
              <PostModal
                closeEvent={handleComplete}
                handleComplete={handleComplete}
                company={enroll_company}
                setcompany={setEnroll_company}
              />
            </ModalPost>
          </ModalBack>
        )}
        <Box>
          <div>
            <h1>내 스토어 정보 관리</h1>
            <h2>
              <b>내 스토어 정보 관리</b>목적 및 상세내용입니다
            </h2>
          </div>
          <FormBox>
            <h3>계정 정보</h3>
            <ul>
              <li>
                <span>아이디</span>
                <p>{userInfo.userId}</p>
              </li>
              <li>
                <span>비밀번호</span>
                <input type="password" name="password" onChange={onChange} />
                <input
                  type="password"
                  name="passwordCheck"
                  onChange={onChange}
                  placeholder="비밀번호 확인"
                />
              </li>
            </ul>
          </FormBox>
          <FormBox>
            <h3>담당자 정보</h3>
            <ul>
              <li>
                <span>담당자 이름</span>
                <input
                  className="area"
                  type="text"
                  name="corpCeo"
                  onChange={onChange}
                  value={userInfo.corpCeo || ""}
                />
              </li>
              <li>
                <span>담당자 이메일</span>
                <input
                  className="area"
                  type="text"
                  name="corpEmail"
                  onChange={onChange}
                  defaultValue={userInfo.corpEmail || ""}
                />
              </li>
              <li>
                <span>담당자 휴대폰 번호</span>
                <input
                  type="text"
                  name="phone"
                  onChange={onChange}
                  defaultValue={userInfo.phone || ""}
                />
              </li>
            </ul>
          </FormBox>
          <FormBox>
            <h3>회사 정보</h3>
            <ul>
              <li>
                <span>상호명</span>
                <input
                  type="text"
                  name="corpName"
                  onChange={onChange}
                  value={userInfo.corpName || ""}
                />
              </li>
              <li>
                <span>회사 주소 (우편번호)</span>
                <input
                  className="small"
                  type="text"
                  name="corpPost"
                  onChange={onChange}
                  value={enroll_company.address2 || ""}
                  placeholder="우편번호"
                />
                <input
                  className="area"
                  type="text"
                  name="corpAddr1"
                  onChange={onChange}
                  value={enroll_company.address1 || ""}
                />
                <BlueBtn onClick={handleComplete}>검색하기</BlueBtn>
                <input
                  className="area"
                  type="text"
                  name="corpAddr2"
                  onChange={onChange}
                  value={userInfo.corpAddr2 || ""}
                  placeholder="상세 주소"
                />
              </li>
              <li>
                <span>회사 대표번호</span>
                <input
                  type="text"
                  name="corpContact"
                  onChange={onChange}
                  defaultValue={userInfo.corpContact || ""}
                />
              </li>
              <li>
                <span>사업자 분류</span>
                <FormControl>
                  <Select
                    onChange={onChange}
                    displayEmpty
                    inputProps={{ "aria-label": "Without label" }}
                    value={userInfo.bizType || ""}
                    name="bizType"
                    sx={{
                      width: "400px",
                      height: "56px",
                      padding: "10px 5px",
                      borderRadius: "8px",
                      border: "1px solid #8e9edf",
                    }}
                  >
                    <MenuItem value="개인사업자">개인사업자</MenuItem>
                    <MenuItem value="법인사업자">법인사업자</MenuItem>
                  </Select>
                </FormControl>
              </li>
              <li>
                <span>과세유형</span>
                <FormControl>
                  <Select
                    onChange={onChange}
                    displayEmpty
                    inputProps={{ "aria-label": "Without label" }}
                    value={userInfo.taxType || ""}
                    name="taxType"
                    sx={{
                      width: "400px",
                      height: "56px",
                      padding: "10px 5px",
                      borderRadius: "8px",
                      border: "1px solid #8e9edf",
                    }}
                  >
                    <MenuItem value="단위과세">단위과세</MenuItem>
                    <MenuItem value="간이과세">간이과세</MenuItem>
                  </Select>
                </FormControl>
              </li>
              <li>
                <span>사업자등록증</span>
                <div>
                  <a href={userInfo.bizFile} target="_blank">
                    {userInfo.bizFile}
                  </a>
                  <input
                    id="bizFile"
                    type="file"
                    name="bizFile"
                    accept=".pdf"
                    onChange={(e) => {
                      if (e.target.files[0]) {
                        setBizFile(e.target.files[0]);
                      }
                    }}
                    style={{ display: "none" }}
                  />
                  <input type="text" value={bizFile.name || ""} readOnly />
                  <BlueBtn>
                    <label htmlFor="bizFile">파일첨부</label>
                  </BlueBtn>
                </div>
              </li>
              <li>
                <span>사업자번호</span>
                <input
                  type="text"
                  name="bizNum"
                  onChange={onChange}
                  value={userInfo.bizNum || ""}
                />
              </li>
              <li>
                <span>통신판매업 신고번호</span>
                <input
                  type="text"
                  name="salesNum"
                  onChange={onChange}
                  value={userInfo.salesNum || ""}
                />
              </li>
            </ul>
          </FormBox>
          <FormBox>
            <h3>정산 정보</h3>
            <ul>
              <li>
                <span>정산 계좌번호</span>
                <input
                  className="small"
                  type="text"
                  name="bankName"
                  onChange={onChange}
                  value={userInfo.bankName || ""}
                />
                <input
                  type="text"
                  name="bankAccount"
                  onChange={onChange}
                  value={userInfo.bankAccount || ""}
                />
              </li>
            </ul>
          </FormBox>
          <FormBox>
            <h3>파트너스토어 정보</h3>
            <ul>
              <li>
                <span>대표 이미지 (브랜드 로고)</span>
                <div>
                  <a href={userInfo.corpImage} target="_blank">
                    {userInfo.corpImage}
                  </a>
                  <input
                    id="logoFile"
                    type="file"
                    name="corpImage"
                    onChange={(e) => {
                      setLogoFile(e.target.files[0]);
                    }}
                    accept="jpeg, .jpg, .png"
                    style={{ display: "none" }}
                  />
                  <input type="text" value={logoFile.name || ""} readOnly />
                  <BlueBtn>
                    <label htmlFor="logoFile">파일첨부</label>
                  </BlueBtn>
                </div>
              </li>
              <li>
                <span>파트너 소개글</span>
                <TextArea
                  type="text"
                  name="corpDesc"
                  onChange={onChange}
                  defaultValue={userInfo.corpDesc || ""}
                  rows={10}
                />
              </li>
            </ul>
          </FormBox>
          <SendBtn onClick={onSubmit}>저장</SendBtn>
        </Box>
      </Container>
    </>
  );
};
export default MyPage;
