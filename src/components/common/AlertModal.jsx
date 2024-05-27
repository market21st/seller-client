import React from "react";
import { Modal } from "@mui/material";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const AlertModal = ({ isOpen, onClose, text, closeBtn }) => {
  const navigate = useNavigate();
  const nav = () => navigate("/");
  if (text && text?.includes("가입이 완료")) {
    onClose = nav;
  }

  return (
    <Modal
      open={isOpen}
      onClose={closeBtn ? closeBtn : onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <InnerBox>
        <Text>{text}</Text>
        <InnerBtm>
          {closeBtn && <CancelBtn onClick={closeBtn}>취소</CancelBtn>}

          <CheckBtn onClick={onClose}>확인</CheckBtn>
        </InnerBtm>
      </InnerBox>
    </Modal>
  );
};

export default AlertModal;

const InnerBox = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #fff;
  width: 482px;
  height: 227px;
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
  color: #7e7e7e;
  font-size: 0.8rem;
  margin-right: 40px;
  background: none;
`;

const CheckBtn = styled.button`
  width: 110px;
  height: 36px;
  background: #0082ff;
  color: #fff;
  font-size: 0.8rem;
  border-radius: 1px;
`;

const Text = styled.h2`
  font-size: 1.2rem;
  line-height: 1.5;
  margin: 45px 30px;
`;
