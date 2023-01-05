import React from "react";
import DaumPostcode from "react-daum-postcode";
import styled from "styled-components";

const postCodeStyle = {
  display: "block",
  position: "absolute",
  top: "65px",
  left: "50%",
  transform: "translateX(-50%)",
  width: "95%",
  height: "90%",
  margin: "0 auto",
  background: "#fff",
};

const PostModal = (props) => {
  const onClose = props.closeEvent;
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
    props.setcompany({
      ...props.company,
      address1: fullAddress,
      address2: data.zonecode,
    });
  };

  return (
    <DaumPostcode
      style={postCodeStyle}
      className="postmodal"
      // autoClose
      onClose={onClose}
      onComplete={complete}
    />
  );
};

export default PostModal;
