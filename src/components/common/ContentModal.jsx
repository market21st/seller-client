import React from "react";
import { Modal } from "@mui/material";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const ContentModal = ({
  isOpen,
  onClose,
  text,
  closeBtn,
  contents,
  postEvent,
  setState,
}) => {
  const navigate = useNavigate();
  const nav = () => navigate("/");
  if (text && text?.includes("가입이 완료")) {
    onClose = nav;
  }
  const stateDelete = () => {
    setState([]);
    closeBtn();
  };

  return (
    <Modal
      open={isOpen}
      onClose={stateDelete}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <InnerBox>
        <Text>{text}</Text>
        <Contents>{contents}</Contents>
        <InnerBtm>
          <CancelBtn onClick={stateDelete}>취소</CancelBtn>
          <CheckBtn onClick={postEvent}>저장</CheckBtn>
        </InnerBtm>
      </InnerBox>
    </Modal>
  );
};

export default ContentModal;

const InnerBox = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #fff;
  width: 410px;
  height: 590px;
  box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.25);
  border-radius: 2px;
  outline: none;
`;

const InnerBtm = styled.div`
  position: absolute;
  bottom: 0;
  background: #e9ebf4;
  width: 100%;
  padding: 15px 20px;
  display: flex;
  justify-content: flex-end;
`;

const CancelBtn = styled.button`
  color: #4a4a4a;
  font-size: 14px;
  margin-right: 40px;
  background: none;
  /* font-weight: 500; */
`;

const CheckBtn = styled.button`
  width: 110px;
  height: 36px;
  background: #0082ff;
  color: #fff;
  font-size: 14px;
  border-radius: 1px;
  /* font-weight: 500; */
`;

const Text = styled.h2`
  font-size: 1.4rem;
  line-height: 1.5;
  margin: 45px 30px;
`;
const Contents = styled.div`
  padding: 0 30px;
`;
