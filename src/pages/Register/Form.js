import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

// Mui
import { FormControl, Select, MenuItem } from "@mui/material";

// Components
import PostModal from "./PostModal";

const InfoBox = styled.div`
  width: 100%;
  height: 66vh;

  & .MuiOutlinedInput-notchedOutline {
    border: none !important;
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
  height: 400px;
  border-radius: 5px;
  padding: 14px;
  margin-top: 8px;
  font-weight: 800;
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
    font-weight: 800;
    box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
  }
`;

const Form = ({
  active,
  infoData,
  changeEvent,
  setBizFiles,
  setCorpImages,
  setUserInfo,
  idCheck,
}) => {
  const [bizType, setBizType] = useState("개인사업자");
  const [taxType, setTaxType] = useState("일반과세");

  const [logoFile, setLogoFile] = useState("");
  const [bizFile, setBizFile] = useState("");

  // const onChangeOpenPost = () => {
  //   setIsOpenPost(!isOpenPost);
  // };

  // const onCompletePost = (data) => {
  //   let fullAddr = data.address;
  //   let extraAddr = "";

  //   if (data.addressType === "R") {
  //     if (data.bname !== "") {
  //       extraAddr += data.bname;
  //     }
  //     if (data.buildingName !== "") {
  //       extraAddr +=
  //         extraAddr !== "" ? `, ${data.buildingName}` : data.buildingName;
  //     }
  //     fullAddr += extraAddr !== "" ? ` (${extraAddr})` : "";
  //   }

  //   setAddress(data.zonecode);
  //   setAddressDetail(fullAddr);
  //   setIsOpenPost(false);
  // };

  // const postCodeStyle = {
  //   display: "block",
  //   position: "absolute",
  //   top: "0%",
  //   width: "400px",
  //   height: "400px",
  //   padding: "7px",
  // };

  const [enroll_company, setEnroll_company] = useState({
    address1: "",
    address2: "",
  });

  const [popup, setPopup] = useState(false);

  const handleComplete = (data) => {
    setPopup(!popup);
  };

  useEffect(() => {
    setUserInfo({
      ...infoData,
      corpAddr1: enroll_company.address1,
      corpPost: enroll_company.address2,
    });
  }, [enroll_company.address1]);

  return (
    <>
      {popup && (
        <PostModal
          company={enroll_company}
          setcompany={setEnroll_company}
        ></PostModal>
      )}
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
                  className="area"
                  type="text"
                  name="corpAddr1"
                  onChange={changeEvent}
                  value={enroll_company.address1 || ""}
                />
                {/* <input
                  className="user_enroll_text"
                  placeholder="주소"
                  type="text"
                  required={true}
                  name="address"
                  onChange={handleInput}
                  value={enroll_company.address}
                /> */}
                {/* <button onClick={handleComplete}>우편번호 찾기</button> */}

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
                    onChange={(e) => {
                      setBizType(e.target.value);
                    }}
                    displayEmpty
                    inputProps={{ "aria-label": "Without label" }}
                    value={bizType}
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
                    onChange={(e) => {
                      setTaxType(e.target.value);
                    }}
                    displayEmpty
                    inputProps={{ "aria-label": "Without label" }}
                    value={taxType}
                    sx={{
                      mt: "8px",
                      width: "195px",
                      background: "#fff",
                      boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
                    }}
                  >
                    <MenuItem value={"일반과세"}>일반과세</MenuItem>
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
                <BlueBtn>
                  <label htmlFor="logoFile">파일첨부</label>
                </BlueBtn>
              </div>
            </RowInner>
          </Row>
          <Row>
            <RowInnerArea>
              <label>셀러소개*</label>
              <TextArea type="text" name="corpDesc" onChange={changeEvent} />
            </RowInnerArea>
          </Row>
        </InfoContainer>
      </InfoBox>
    </>
  );
};

export default Form;
