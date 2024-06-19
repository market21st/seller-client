import React from "react";
import { Button, Modal } from "@mui/material";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { ModalButtonWrap, ModalWrap } from "../order/OrderHistoryModal";

const AlertModal = ({ open, text, onClose, onConfirm }) => {
  const navigate = useNavigate();
  const nav = () => navigate("/");
  if (text && text?.includes("가입이 완료")) {
    onClose = nav;
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
    >
      <Wrap>
        <Title>{text}</Title>
        <ModalButtonWrap>
          {onClose ? (
            <Button variant="outlined" size="large" onClick={onClose}>
              {onConfirm ? "취소" : "확인"}
            </Button>
          ) : null}
          {onConfirm ? (
            <Button variant="contained" size="large" onClick={onConfirm}>
              확인
            </Button>
          ) : null}
        </ModalButtonWrap>
      </Wrap>
    </Modal>
  );
};

export default AlertModal;

const Wrap = styled(ModalWrap)`
  width: 500px;
`;

const Title = styled.p`
  white-space: pre-wrap;
  font-weight: 500;
  font-size: 18px;
`;
