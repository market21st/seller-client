import { Modal } from "@mui/material";
import React from "react";
import DaumPostcode from "react-daum-postcode";
import styled from "styled-components";

const postCodeStyle = {
  width: "100%",
  height: "100%",
};

const PostModal = ({ open, onClose, company, setcompany }) => {
  const complete = (data) => {
    let fullAddress = data.address;
    let extraAddress = "";

    if (data.addressType === "R") {
      if (data.bname !== "") {
        extraAddress += data.bname;
      }
      if (data.buildingName !== "") {
        extraAddress +=
          extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
    }
    setcompany({
      ...company,
      address1: fullAddress,
      address2: data.zonecode,
    });
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
    >
      <ModalWrap>
        <DaumPostcode
          style={postCodeStyle}
          className="postmodal"
          // autoClose
          onClose={onClose}
          onComplete={complete}
        />
      </ModalWrap>
    </Modal>
  );
};

export default PostModal;

const ModalWrap = styled.div`
  width: 500px;
  height: 700px;
  max-width: 90%;
  max-height: 80%;
`;
