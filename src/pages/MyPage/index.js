import React, { useEffect, useState } from "react";
import styled from "styled-components";
import CloseIcon from "@mui/icons-material/Close";
import PostModal from "../Register/PostModal";

// Components
import AlertModal from "../../components/AlertModal";
// Mui
import { FormControl, Select, MenuItem } from "@mui/material";
// Api
import { myInfo } from "../../api/user";

const Container = styled.div`
  position: relative;
  height: 90%;
  h1 {
    font-size: 24px;
    font-weight: blod;
  }
  .area {
    width: 279px;
  }
  & .MuiOutlinedInput-notchedOutline {
    border: none !important;
  }
`;
// 하단바 목록,저장
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

const ListBtn = styled.button`
  border: 1px solid #000;
  margin-right: 16px;
  background: none;
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
  // 이메일 형식
  const emailRegEx =
    /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/;

  const [data, setData] = useState("");

  const [bizFile, setBizFile] = useState("");
  const [logoFile, setLogoFile] = useState("");
  // Modal
  const [alertModal, setAlertModal] = useState(false);
  const [text, setText] = useState("");
  const aleatHandleClose = () => setAlertModal(false);

  const [corpImage, setCorpImage] = useState("");
  const [idCheckResult, setIdCheckResult] = useState("");
  const [userInfo, setUserInfo] = useState({});
  const [enroll_company, setEnroll_company] = useState({
    address1: "",
    address2: "",
  });

  function onChange(e) {
    const { name, value } = e.target;
    if (name === "userId") {
      setIdCheckResult(false);
    }
    setUserInfo({
      ...userInfo,
      [name]: value,
    });
  }
  //정보 조회
  const getInfo = async () => {
    const { data, statusCode } = await myInfo();
    if (statusCode == 200) {
      setData(data);
      setUserInfo(data);
      setEnroll_company({
        address1: data.corpAddr1,
        address2: data.corpAddr2,
      });
    }
  };

  // 주소 검색
  const [popup, setPopup] = useState(false);
  const handleComplete = (data) => {
    setPopup(!popup);
  };

  useEffect(() => {
    setUserInfo({
      ...userInfo,
      corpAddr1: enroll_company.address1,
      corpPost: enroll_company.address2,
    });
  }, [enroll_company.address1]);

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
            {data.userId || ""}
          </IdBox>
          <Row>
            <RowInner>
              <label>비밀번호*</label>
              <div>
                <input type="text" name="userId" onChange={onChange} />
              </div>
            </RowInner>
            <RowInner>
              <label>비밀번호확인*</label>
              <div>
                <input type="text" name="userId" onChange={onChange} />
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
                  name="userId"
                  onChange={onChange}
                  defaultValue={data.corpEmail || ""}
                />
              </div>
            </RowInner>
            <RowInner>
              <label>휴대폰번호*</label>
              <div>
                <input
                  type="text"
                  name="userId"
                  onChange={onChange}
                  defaultValue={data.corpEmail || ""}
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
                  name="userId"
                  onChange={onChange}
                  defaultValue={data.corpEmail}
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
                  name="userId"
                  onChange={onChange}
                  value={enroll_company.address1 || ""}
                />
                <BlueBtn onClick={handleComplete}>검색하기</BlueBtn>
              </div>
            </RowInner>
            <RowInner>
              <label>유편주소*</label>
              <div>
                <input
                  type="text"
                  name="userId"
                  onChange={onChange}
                  value={data.corpPost || ""}
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
                  name="userId"
                  onChange={onChange}
                  defaultValue={enroll_company.address2 || ""}
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
                  name="userId"
                  onChange={onChange}
                  defaultValue={data.corpName || ""}
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
                  name="userId"
                  onChange={onChange}
                  defaultValue={data.bankName || ""}
                />
              </div>
            </RowInner>
            <RowInner>
              <label>계좌번호*</label>
              <div>
                <input
                  type="text"
                  name="userId"
                  onChange={onChange}
                  defaultValue={data.bankAccount || ""}
                />
              </div>
            </RowInner>
          </Row>
          <Row>
            <RowInner>
              <label>사업자분류*</label>
              <div>
                <FormControl>
                  {/* <Select
                    onChange={onChange}
                    displayEmpty
                    inputProps={{ "aria-label": "Without label" }}
                    // value={userInfo.bizType}
                    name="bizType"
                    sx={{
                      mt: "8px",
                      width: "195px",
                      background: "#fff",
                      boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
                    }}
                  >
                    <MenuItem value={"개인사업자"}>개인사업자</MenuItem>
                    <MenuItem value={"법인사업자"}>법인사업자</MenuItem>
                  </Select> */}
                </FormControl>
              </div>
            </RowInner>
            <RowInner>
              <label>과세유형*</label>
              <div>
                <FormControl>
                  {/* <Select
                    onChange={onChange}
                    displayEmpty
                    inputProps={{ "aria-label": "Without label" }}
                    // value={userInfo.taxType}
                    name="taxType"
                    sx={{
                      mt: "8px",
                      width: "195px",
                      background: "#fff",
                      boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
                    }}
                  >
                    <MenuItem value={"단위과세"}>단위과세</MenuItem>
                    <MenuItem value={"간이과세"}>간이과세</MenuItem>
                  </Select> */}
                </FormControl>
              </div>
            </RowInner>
          </Row>
          <Row>
            <RowInner>
              <label>사업자등록증*</label>
              <div>
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
                <input
                  type="text"
                  name="id"
                  value={bizFile.name || ""}
                  readOnly
                />
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
                  name="userId"
                  onChange={onChange}
                  defaultValue={data.bizNum || ""}
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
                  name="userId"
                  onChange={onChange}
                  defaultValue={data.corpEmail || ""}
                />
              </div>
            </RowInner>
          </Row>
          <Row>
            <RowInner>
              <label>브랜드로고</label>
              <div>
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
                <input
                  type="text"
                  name="id"
                  value={logoFile.name || ""}
                  readOnly
                />
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
                defaultValue={data.corpEmail || ""}
              />
            </RowInnerArea>
          </Row>
        </Box>
      </Container>
      <Btmbar>
        <ListBtn>목록</ListBtn>
        <SendBtn>저장</SendBtn>
      </Btmbar>
    </>
  );
};
export default MyPage;
