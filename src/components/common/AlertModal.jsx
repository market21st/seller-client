import React from "react";
import { Button, Modal } from "@mui/material";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { ModalButtonWrap, ModalWrap } from "../order/OrderHistoryModal";

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
      sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
    >
      <Wrap>
        <Title>{text}</Title>
        <ModalButtonWrap>
          {closeBtn ? (
            <Button variant="outlined" size="large" onClick={closeBtn}>
              취소
            </Button>
          ) : null}
          <Button variant="contained" size="large" onClick={onClose}>
            확인
          </Button>
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
