import React, { useEffect, useState } from "react";
import styled from "styled-components";
import CloseIcon from "@mui/icons-material/Close";
// Mui
import { FormControl, Select, MenuItem } from "@mui/material";

// Components
import PostModal from "./PostModal";
import InfoModal from "../../components/InfoModal";

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

const BlueBtnLebel = styled.label`
  background: #505bca;
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

const Container = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 33.33%;
  border: 1px solid #ddd;
  height: 100vh;
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
    font-weight: 300;
  }
  button {
    font-weight: 300;
    color: #7e7e7e;
    font-size: 14px;
    border-bottom: 1px solid #7e7e7e;
    padding: 0;
    margin-left: 8px;
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
      {popup && (
        <Container>
          <h1>
            ????????????
            <CloseIcon onClick={handleComplete} />
          </h1>
          <PostModal
            closeEvent={handleComplete}
            handleComplete={handleComplete}
            company={enroll_company}
            setcompany={setEnroll_company}
          />
        </Container>
      )}
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
              <label>?????????*</label>
              <div>
                <input type="text" name="userId" onChange={changeEvent} />
                <BlueBtn onClick={idCheck}>????????????</BlueBtn>
              </div>
            </RowInner>
          </Row>
          <Row>
            <RowInner>
              <label>????????????*</label>
              <div>
                <input type="password" name="password" onChange={changeEvent} />
              </div>
            </RowInner>
            <RowInner>
              <label>??????????????????*</label>
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
              <label>?????????*</label>
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
              <label>???????????????*</label>
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
              <label>????????????*</label>
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
              <label>????????????*</label>
              <div>
                <input
                  readOnly
                  className="area"
                  type="text"
                  name="corpAddr1"
                  onChange={changeEvent}
                  value={enroll_company.address1 || ""}
                />
                <BlueBtn onClick={handleComplete}>????????????</BlueBtn>
              </div>
            </RowInner>
            <RowInner>
              <label>????????????*</label>
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
              <label>????????????*</label>
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
              <label>?????????*</label>
              <div>
                <input type="text" name="corpName" onChange={changeEvent} />
              </div>
            </RowInner>
          </Row>
          <Row>
            <RowInner>
              <label>?????????*</label>
              <div>
                <input type="text" name="bankName" onChange={changeEvent} />
              </div>
            </RowInner>
            <RowInner>
              <label>????????????*</label>
              <div>
                <input type="text" name="bankAccount" onChange={changeEvent} />
              </div>
            </RowInner>
          </Row>
          <Row>
            <RowInner>
              <label>???????????????*</label>
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
                    <MenuItem value={"???????????????"}>???????????????</MenuItem>
                    <MenuItem value={"???????????????"}>???????????????</MenuItem>
                  </Select>
                </FormControl>
              </div>
            </RowInner>
            <RowInner>
              <label>????????????*</label>
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
                    <MenuItem value={"????????????"}>????????????</MenuItem>
                    <MenuItem value={"????????????"}>????????????</MenuItem>
                  </Select>
                </FormControl>
              </div>
            </RowInner>
          </Row>
          <Row>
            <RowInner>
              <label>??????????????????*</label>
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

                <BlueBtnLebel htmlFor="bizFile">????????????</BlueBtnLebel>
              </div>
            </RowInner>
          </Row>
          <Row>
            <RowInner>
              <label>???????????????*</label>
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
              <label>??????????????? ????????????*</label>
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
              <label>????????????*</label>
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
              <label>???????????????</label>
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

                <BlueBtnLebel htmlFor="logoFile">????????????</BlueBtnLebel>
              </div>
            </RowInner>
          </Row>
          <Row>
            <RowInnerArea>
              <label>????????????*</label>
              <TextArea type="text" name="corpDesc" onChange={changeEvent} />
            </RowInnerArea>
          </Row>
          <Row>
            <RowInnerAreaM>
              <label>????????????*</label>
              <div>
                <input
                  type="checkbox"
                  name="service"
                  checked={isChecked?.service}
                  onChange={changeEvent}
                />
                <span>???????????????????????? ???????????????.</span>
                <button
                  onClick={() => {
                    setContentNum(1);
                    setInfoOpen(true);
                    setTitle("????????? ????????????");
                  }}
                >
                  ??????
                </button>
              </div>
              <div>
                <input
                  type="checkbox"
                  name="info"
                  checked={isChecked?.info}
                  onChange={changeEvent}
                />
                <span>?????? ???????????? ????????? ???????????????.</span>
                <button
                  onClick={() => {
                    setContentNum(2);
                    setInfoOpen(true);
                    setTitle("?????? ???????????? ?????? ??????");
                  }}
                >
                  ??????
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
