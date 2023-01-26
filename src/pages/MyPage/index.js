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
    font-size: 24px;
    font-weight: bold;
  }
  .area {
    width: 279px;
  }
  & .MuiOutlinedInput-notchedOutline {
    border: none !important;
  }
  a {
    display: block;
    padding: 10px 0 5px;
  }
`;

const Btmbar = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
  background: #fff;
  padding: 15px 35px;
  height: 10%;
  position: relative;
  z-index: 99;
  box-shadow: 1px 0px 10px rgba(0, 0, 0, 0.1);
  button {
    width: 134px;
    padding: 12px 49px;
    border-radius: 5px;
    font-weight: bold;
    font-size: 18px;
  }
`;

const SendBtn = styled.button`
  background: #505bca;
  color: #fff;
`;

//아이디
const IdBox = styled.div`
  width: 100%;
  padding: 40px 7px;
  margin: 20px 0 50px;
  background: #fff;
  border-radius: 15px;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
  span {
    border-right: 2px solid #e1e7ef;
    padding: 0 40px;
    margin-right: 40px;
  }
`;
const BlueBtn = styled.button`
  background: #505bca;
  color: #fff;
  padding: 16px 25px;
  border-radius: 5px;
  font-size: 14px;
  margin-left: 14px;
`;

// 인풋
const Row = styled.div`
  margin-bottom: 20px;
  display: flex;
`;

const RowInner = styled.div`
  margin-right: 14px;
  input {
    border-radius: 5px;
    padding: 14px;
    margin-top: 8px;
    font-weight: 800;
    box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
  }
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

const RowInnerArea = styled.div`
  width: 100%;
`;
const Box = styled.div`
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  padding: 50px 59px 0;
`;
const TextArea = styled.textarea`
  display: block;
  width: 80%;
  box-sizing: border-box;
  height: 400px;
  border-radius: 5px;
  padding: 14px;
  margin-top: 8px;
  font-weight: 800;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
  line-height: 1.5;
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
    if (text.includes("저장")) {
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

    for (let key in list) {
      if (!list[key]) {
        setAlertModal(true);
        setText(`저장하시려면 비밀번호와 비밀번호확인란을 채워주셔야 합니다.`);
        return;
      }
    }

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
          <h1>내 정보 수정</h1>
          <IdBox>
            <span>아이디</span>
            {userInfo.userId}
          </IdBox>
          <Row>
            <RowInner>
              <label>비밀번호*</label>
              <div>
                <input type="password" name="password" onChange={onChange} />
              </div>
            </RowInner>
            <RowInner>
              <label>비밀번호확인*</label>
              <div>
                <input
                  type="password"
                  name="passwordCheck"
                  onChange={onChange}
                />
              </div>
            </RowInner>
          </Row>
          <Row>
            <RowInner>
              <label>이메일*</label>
              <div>
                <input
                  className="area"
                  type="text"
                  name="corpEmail"
                  onChange={onChange}
                  defaultValue={userInfo.corpEmail || ""}
                />
              </div>
            </RowInner>
            <RowInner>
              <label>휴대폰번호*</label>
              <div>
                <input
                  type="text"
                  name="phone"
                  onChange={onChange}
                  defaultValue={userInfo.phone || ""}
                />
              </div>
            </RowInner>
          </Row>
          <Row>
            <RowInner>
              <label>관리자명*</label>
              <div>
                <input
                  className="area"
                  type="text"
                  name="corpCeo"
                  onChange={onChange}
                  defaultValue={userInfo.corpCeo}
                />
              </div>
            </RowInner>
          </Row>
          <Row>
            <RowInner>
              <label>회사주소*</label>
              <div>
                <input
                  className="area"
                  type="text"
                  name="corpAddr1"
                  onChange={onChange}
                  value={enroll_company.address1 || ""}
                />
                <BlueBtn onClick={handleComplete}>검색하기</BlueBtn>
              </div>
            </RowInner>
            <RowInner>
              <label>우편주소*</label>
              <div>
                <input
                  type="text"
                  name="corpPost"
                  onChange={onChange}
                  value={enroll_company.address2 || ""}
                />
              </div>
            </RowInner>
          </Row>
          <Row>
            <RowInner>
              <label>상세주소*</label>
              <div>
                <input
                  className="area"
                  type="text"
                  name="corpAddr2"
                  onChange={onChange}
                  defaultValue={userInfo.corpAddr2 || ""}
                />
              </div>
            </RowInner>
          </Row>
          <Row>
            <RowInner>
              <label>상호명*</label>
              <div>
                <input
                  type="text"
                  name="corpName"
                  onChange={onChange}
                  defaultValue={userInfo.corpName || ""}
                />
              </div>
            </RowInner>
          </Row>
          <Row>
            <RowInner>
              <label>은행명*</label>
              <div>
                <input
                  type="text"
                  name="bankName"
                  onChange={onChange}
                  defaultValue={userInfo.bankName || ""}
                />
              </div>
            </RowInner>
            <RowInner>
              <label>계좌번호*</label>
              <div>
                <input
                  type="text"
                  name="bankAccount"
                  onChange={onChange}
                  defaultValue={userInfo.bankAccount || ""}
                />
              </div>
            </RowInner>
          </Row>
          <Row>
            <RowInner>
              <label>사업자분류*</label>
              <div>
                <FormControl>
                  <Select
                    onChange={onChange}
                    displayEmpty
                    inputProps={{ "aria-label": "Without label" }}
                    value={userInfo.bizType || ""}
                    name="bizType"
                    sx={{
                      mt: "8px",
                      width: "195px",
                      background: "#fff",
                      boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
                    }}
                  >
                    <MenuItem value="개인사업자">개인사업자</MenuItem>
                    <MenuItem value="법인사업자">법인사업자</MenuItem>
                  </Select>
                </FormControl>
              </div>
            </RowInner>
            <RowInner>
              <label>과세유형*</label>
              <div>
                <FormControl>
                  <Select
                    onChange={onChange}
                    displayEmpty
                    inputProps={{ "aria-label": "Without label" }}
                    value={userInfo.taxType || ""}
                    name="taxType"
                    sx={{
                      mt: "8px",
                      width: "195px",
                      background: "#fff",
                      boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
                    }}
                  >
                    <MenuItem value="단위과세">단위과세</MenuItem>
                    <MenuItem value="간이과세">간이과세</MenuItem>
                  </Select>
                </FormControl>
              </div>
            </RowInner>
          </Row>
          <Row>
            <RowInner>
              <label>사업자등록증*</label>
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
            </RowInner>
          </Row>
          <Row>
            <RowInner>
              <label>사업자번호*</label>
              <div>
                <input
                  type="text"
                  name="bizNum"
                  onChange={onChange}
                  defaultValue={userInfo.bizNum || ""}
                />
              </div>
            </RowInner>
          </Row>
          <Row>
            <RowInner>
              <label>통신판매업 신고번호*</label>
              <div>
                <input
                  type="text"
                  name="salesNum"
                  onChange={onChange}
                  defaultValue={userInfo.salesNum || ""}
                />
              </div>
            </RowInner>
          </Row>
          <Row>
            <RowInner>
              <label>대표번호*</label>
              <div>
                <input
                  type="text"
                  name="corpContact"
                  onChange={onChange}
                  defaultValue={userInfo.corpContact || ""}
                />
              </div>
            </RowInner>
          </Row>
          <Row>
            <RowInner>
              <label>브랜드로고</label>
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
            </RowInner>
          </Row>
          <Row>
            <RowInnerArea>
              <label>셀러소개*</label>
              <TextArea
                type="text"
                name="corpDesc"
                onChange={onChange}
                defaultValue={userInfo.corpDesc || ""}
              />
            </RowInnerArea>
          </Row>
        </Box>
      </Container>
      <Btmbar>
        <SendBtn onClick={onSubmit}>저장</SendBtn>
      </Btmbar>
    </>
  );
};
export default MyPage;
