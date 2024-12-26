import styled from "styled-components";
import popupImg from "../../assets/popup.png";
import { Checkbox } from "@mui/material";
import { useState } from "react";

const Popup = () => {
  const [isChecked, setIsChecked] = useState(false);
  const [isOpen, setIsOpen] = useState(!localStorage.getItem("isPopup"));

  const handleToggleCheckBox = (e) => {
    setIsChecked(e.target.checked);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleClickCloseBtn = () => {
    if (isChecked) localStorage.setItem("isPopup", true);
    handleClose();
  };

  return isOpen ? (
    <Container onClick={handleClose}>
      <Wrap onClick={(e) => e.stopPropagation()}>
        <ImgWrap>
          <img src={popupImg} alt="파트너어드민 업데이트" />
        </ImgWrap>
        <BtnWrap>
          <button>
            <Checkbox
              checked={isChecked}
              onChange={handleToggleCheckBox}
              sx={{ padding: 0 }}
            />
            다시 보지 않기
          </button>
          <button onClick={handleClickCloseBtn}>닫기</button>
        </BtnWrap>
      </Wrap>
    </Container>
  ) : null;
};

export default Popup;

const Container = styled.div`
  z-index: 1;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Wrap = styled.div`
  width: 500px;
`;

const ImgWrap = styled.div`
  display: flex;
  /* height: 65vh; */
  max-height: 680px;
  overflow-y: auto;
  border-radius: 8px 8px 0 0;
  img {
    width: 100%;
  }
`;

const BtnWrap = styled.div`
  padding: 16px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
  border-top: 1px solid #d1d5e6;
  border-radius: 0 0 8px 8px;
  button {
    padding: 8px 10px;
    color: #5a6080;
    font-size: 13px;
    font-weight: 700;
    display: flex;
    align-items: center;
    gap: 4px;
  }
`;
