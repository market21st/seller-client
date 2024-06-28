import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { FormControl, Select, MenuItem } from "@mui/material";
import InfoModal from "../common/InfoModal";
import PostModal from "../common/PostModal";

const Form = ({
  active,
  infoData,
  changeEvent,
  setBizFiles,
  setCorpImages,
  setUserInfo,
  idCheck,
  isChecked,
}) => {
  const [logoFile, setLogoFile] = useState("");
  const [bizFile, setBizFile] = useState("");

  const [enroll_company, setEnroll_company] = useState({
    address1: "",
    address2: "",
  });

  const [popup, setPopup] = useState(false);

  const handleComplete = (data) => {
    setPopup(!popup);
  };

  // info
  const [infoOpen, setInfoOpen] = useState(false);
  const [contentNum, setContentNum] = useState(0);
  const [title, setTitle] = useState("");
  const infoHandleClose = () => setInfoOpen(false);

  useEffect(() => {
    setUserInfo({
      ...infoData,
      corpAddr1: enroll_company.address1,
      corpPost: enroll_company.address2,
    });
  }, [enroll_company.address1]);

  return (
    <>
      <PostModal
        open={popup}
        onClose={handleComplete}
        company={enroll_company}
        setcompany={setEnroll_company}
      />
      <InfoModal
        isOpen={infoOpen}
        onClose={infoHandleClose}
        contents={contentNum}
        title={title}
      />
      <InfoBox>
        <InfoContainer className={0 == active ? " active" : ""}>
          <Row>
            <RowInner>
              <label>아이디*</label>
              <div>
                <input type="text" name="userId" onChange={changeEvent} />
                <BlueBtn onClick={idCheck}>중복확인</BlueBtn>
              </div>
            </RowInner>
          </Row>
          <Row>
            <RowInner>
              <label>비밀번호*</label>
              <div>
                <input type="password" name="password" onChange={changeEvent} />
              </div>
            </RowInner>
            <RowInner>
              <label>비밀번호확인*</label>
              <div>
                <input
                  type="password"
                  name="passwordCheck"
                  onChange={changeEvent}
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
                  onChange={changeEvent}
                />
              </div>
            </RowInner>
            <RowInner>
              <label>휴대폰번호*</label>
              <div>
                <input
                  type="text"
                  name="phone"
                  onChange={changeEvent}
                  maxLength="11"
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
                  onChange={changeEvent}
                />
              </div>
            </RowInner>
          </Row>
          <Row>
            <RowInner>
              <label>회사주소*</label>
              <div>
                <input
                  readOnly
                  className="area"
                  type="text"
                  name="corpAddr1"
                  onChange={changeEvent}
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
                  onChange={changeEvent}
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
                  onChange={changeEvent}
                />
              </div>
            </RowInner>
          </Row>
        </InfoContainer>
        <InfoContainer className={1 == active ? " active" : ""}>
          <Row>
            <RowInner>
              <label>상호명*</label>
              <div>
                <input type="text" name="corpName" onChange={changeEvent} />
              </div>
            </RowInner>
          </Row>
          <Row>
            <RowInner>
              <label>은행명*</label>
              <div>
                <input type="text" name="bankName" onChange={changeEvent} />
              </div>
            </RowInner>
            <RowInner>
              <label>계좌번호*</label>
              <div>
                <input type="text" name="bankAccount" onChange={changeEvent} />
              </div>
            </RowInner>
          </Row>
          <Row>
            <RowInner>
              <label>사업자분류*</label>
              <div>
                <FormControl>
                  <Select
                    onChange={changeEvent}
                    displayEmpty
                    inputProps={{ "aria-label": "Without label" }}
                    value={infoData.bizType}
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
                  </Select>
                </FormControl>
              </div>
            </RowInner>
            <RowInner>
              <label>과세유형*</label>
              <div>
                <FormControl>
                  <Select
                    onChange={changeEvent}
                    displayEmpty
                    inputProps={{ "aria-label": "Without label" }}
                    value={infoData.taxType}
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
                  </Select>
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
                      setBizFile(e.target.files[0].name);
                      setBizFiles(e.target.files[0]);
                    }
                  }}
                  style={{ display: "none" }}
                />
                <input type="text" name="id" value={bizFile || ""} readOnly />

                <BlueBtnLebel htmlFor="bizFile">파일첨부</BlueBtnLebel>
              </div>
            </RowInner>
          </Row>
          <Row>
            <RowInner>
              <label>사업자번호*</label>
              <div>
                <input
                  className="area"
                  type="text"
                  name="bizNum"
                  onChange={changeEvent}
                />
              </div>
            </RowInner>
          </Row>
          <Row>
            <RowInner>
              <label>통신판매업 신고번호*</label>
              <div>
                <input
                  className="area"
                  type="text"
                  name="salesNum"
                  onChange={changeEvent}
                />
              </div>
            </RowInner>
            <RowInner>
              <label>대표번호*</label>
              <div>
                <input
                  className="area"
                  type="text"
                  name="corpContact"
                  onChange={changeEvent}
                />
              </div>
            </RowInner>
          </Row>
        </InfoContainer>
        <InfoContainer container className={2 == active ? " active" : ""}>
          <Row>
            <RowInner>
              <label>브랜드로고</label>
              <div>
                <input
                  id="logoFile"
                  type="file"
                  name="corpImage"
                  onChange={(e) => {
                    setLogoFile(e.target.files[0].name);
                    setCorpImages(e.target.files[0]);
                  }}
                  accept="jpeg, .jpg, .png"
                  style={{ display: "none" }}
                />
                <input type="text" name="id" value={logoFile || ""} readOnly />

                <BlueBtnLebel htmlFor="logoFile">파일첨부</BlueBtnLebel>
              </div>
            </RowInner>
          </Row>
          <Row>
            <RowInnerArea>
              <label>셀러소개*</label>
              <TextArea type="text" name="corpDesc" onChange={changeEvent} />
            </RowInnerArea>
          </Row>
          <Row>
            <RowInnerAreaM>
              <label>약관동의*</label>
              <div>
                <input
                  type="checkbox"
                  name="service"
                  checked={isChecked?.service}
                  onChange={changeEvent}
                />
                <span>서비스이용약관에 동의합니다.</span>
                <button
                  onClick={() => {
                    setContentNum(1);
                    setInfoOpen(true);
                    setTitle("서비스 이용약관");
                  }}
                >
                  보기
                </button>
              </div>
              <div>
                <input
                  type="checkbox"
                  name="info"
                  checked={isChecked?.info}
                  onChange={changeEvent}
                />
                <span>셀러 개인정보 수집에 동의합니다.</span>
                <button
                  onClick={() => {
                    setContentNum(2);
                    setInfoOpen(true);
                    setTitle("셀러 개인정보 수집 동의");
                  }}
                >
                  보기
                </button>
              </div>
            </RowInnerAreaM>
          </Row>
        </InfoContainer>
      </InfoBox>
    </>
  );
};

export default Form;

const InfoBox = styled.div`
  width: 100%;
  height: 66vh;

  & .MuiOutlinedInput-notchedOutline {
    border: none !important;
  }
`;

const BlueBtn = styled.button`
  background: #0082ff;
  color: #fff;
  padding: 16px 25px;
  border-radius: 5px;
  font-size: 14px;
  margin-left: 14px;
`;

const BlueBtnLebel = styled.label`
  background: #0082ff;
  color: #fff;
  padding: 16px 25px;
  border-radius: 5px;
  font-size: 14px;
  margin-left: 14px;
  cursor: pointer;
`;

const Row = styled.div`
  margin-bottom: 20px;
  display: flex;
`;

const RowInner = styled.div`
  margin-right: 14px;
`;
const RowInnerArea = styled.div`
  width: 100%;
`;

const TextArea = styled.textarea`
  width: 100%;
  box-sizing: border-box;
  height: 380px;
  border-radius: 5px;
  padding: 14px;
  margin-top: 8px;
  font-weight: 700;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
  line-height: 1.5;
`;

const InfoContainer = styled.div`
  display: none;
  color: #404040;
  font-size: 1rem;
  width: 100%;

  &.active {
    display: block;
  }
  .area {
    width: 279px;
  }
  .textArea {
    width: 100%;
  }

  input {
    border-radius: 5px;
    padding: 14px;
    margin-top: 8px;
    font-weight: 700;
    box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
  }
`;

const RowInnerAreaM = styled.div`
  width: 100%;
  div {
    display: flex;
    align-items: center;
    margin: 8px 0;
  }
  label {
    margin-bottom: 5px;
    display: inline-block;
  }
  input {
    margin: 0;
  }
  span {
    font-size: 14px;
    padding-left: 10px;
  }
  button {
    color: #7e7e7e;
    font-size: 14px;
    border-bottom: 1px solid #7e7e7e;
    padding: 0;
    margin-left: 8px;
  }
`;
