import React, { useEffect, useRef, useState } from "react";
import { Modal } from "@mui/material";
import styled from "styled-components";

// Mui
import { FormControl, Select, MenuItem } from "@mui/material";

// Components
import AlertModal from "../../components/AlertModal";
import { getDelivery, editStatus } from "../../api/order";

const InnerBox = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #fff;
  width: 410px;
  height: auto;
  box-sizing: border-box;
  box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.25);
  border-radius: 2px;
  outline: none;
  p {
    color: red;
    font-weight: bold;
    margin: 0 30px;
    font-size: 14px;
  }
`;

const Text = styled.h2`
  font-size: 1.3rem;
  line-height: 1.5;
  margin: 35px 30px 5px;
`;

const InnerBtm = styled.div`
  bottom: 0;
  background: #e9ebf4;
  width: 100%;
  padding: 15px 20px;
  margin-top: 30px;
  display: flex;
  justify-content: flex-end;
`;

const CancelBtn = styled.button`
  color: #4a4a4a;
  font-size: 14px;
  margin-right: 40px;
  background: none;
  font-weight: bold;
`;

const CheckBtn = styled.button`
  width: 110px;
  height: 36px;
  background: #505bca;
  color: #fff;
  font-size: 14px;
  border-radius: 1px;
  font-weight: bold;
`;

const Contents = styled.div`
  padding: 14px 30px 0;
`;
const Container = styled.div`
  display: flex;
  width: 100%;
  align-items: flex-start;
  label {
    padding-top: 5px;
  }
`;

const RowInner = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  width: 100%;
  label {
    width: 20%;
  }
  input,
  textarea {
    border-radius: 5px;
    padding: 18px 14px;
    font-weight: 800;
    box-sizing: border-box;
    width: 80%;
    border: 1px solid #404040;
  }
  textarea {
    line-height: 1.2;
  }
`;

const StatusAlertModal = ({
  isOpen,
  onClose,
  text,
  //   closeBtn,
  postEvent,
  setState,
  statusText,
  stateCode,
  subText,
  setSubText,
  id,
}) => {
  const [postName, setPostName] = useState("");
  const invoiceNoRef = useRef();
  const cancelAmountRef = useRef();
  const [deliveryList, setDeliveryList] = useState([]); // 택배사 리스트
  const [corp, setCorp] = useState(); // 택배사 코드
  const stateDelete = () => {
    if (setState) setState([]);
    onClose();
  };

  // 택배사 select
  const getCorp = (e) => {
    setPostName(e.target.value);
    deliveryList.map((el) => {
      if (e.target.value === el.key) {
        setCorp(el.value);
      }
    });
  };

  // 택배사 조회
  const getDeliveryList = async () => {
    const { data, statusCode } = await getDelivery();
    if (statusCode === 200) {
      setDeliveryList(data.results);
    }
  };

  const mykeydown = async (list) => {
    console.log(list);
    const { statusCode, message } = await editStatus(id, list);
    if (statusCode == 200) {
      onClose();
      setAlertModal(true);
    }
    if (statusCode == 400) {
      setAlertModalText(message);
      setAlertModal(true);
      onClose();
    }
  };

  // 상태 수정
  const statusChange = () => {
    if (stateCode === 200) {
      const list200 = { status: 200 };
      mykeydown(list200);
    }
    if (stateCode === 300) {
      const list300 = {
        status: 300,
        deliveryCorp: corp,
        invoiceNo: invoiceNoRef.current.value,
      };
      mykeydown(list300);
    }
    if (stateCode === 570) {
      const list570 = {
        status: 570,
      };
      mykeydown(list570);
    }
    if (stateCode === 580) {
      const list580 = { status: 580, reason: invoiceNoRef.current.value };
      mykeydown(list580);
    }
    if (stateCode === 999) {
      const list999 = {
        status: 999,
        reason: invoiceNoRef.current.value,
      };
      mykeydown(list999);
    }
  };

  // 배송중
  const code300 = (
    <>
      <RowInner>
        <label>택배사</label>
        <FormControl sx={{ width: "80%" }}>
          <Select
            onChange={getCorp}
            displayEmpty
            inputProps={{ "aria-label": "Without label" }}
            value={postName}
            sx={{
              background: "#fff",
            }}
          >
            <MenuItem disabled value="">
              <em>택배사</em>
            </MenuItem>
            {deliveryList?.map((el) => (
              <MenuItem key={el.value} value={el.key}>
                {el.key}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </RowInner>
      <RowInner>
        <label>운송장</label>
        <input type="text" name="memo" ref={invoiceNoRef} />
      </RowInner>
    </>
  );

  // 반품회수거부
  const code580 = (
    <>
      <RowInner>
        <Container>
          <label>특이사항</label>
          <textarea rows="5" ref={invoiceNoRef}></textarea>
        </Container>
      </RowInner>
    </>
  );

  // 환불완료
  const code999 = (
    <>
      <RowInner>
        <Container>
          <label>특이사항</label>
          <textarea rows="5" ref={invoiceNoRef}></textarea>
        </Container>
      </RowInner>
    </>
  );

  // Modal
  const [alertModal, setAlertModal] = useState(false);
  const [alertModalText, setAlertModalText] = useState("변경되었습니다.");
  const aleatHandleClose = () => {
    setAlertModal(false);
    window.location.reload();
  };

  useEffect(() => {
    if (stateCode === 300) {
      getDeliveryList();
    }
  }, [stateCode]);

  return (
    <>
      <AlertModal
        isOpen={alertModal}
        onClose={aleatHandleClose}
        text={alertModalText}
      />
      <Modal
        open={isOpen}
        onClose={stateDelete}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <InnerBox>
          <Text>{text}</Text>
          {stateCode === 300 ? <p>{subText}</p> : null}
          {stateCode === 300 && <Contents>{code300}</Contents>}
          {stateCode === 580 && <Contents>{code580}</Contents>}
          {stateCode === 999 && <Contents>{code999}</Contents>}

          <InnerBtm>
            <CancelBtn onClick={stateDelete}>
              {stateCode === 200 || stateCode === 570 ? "아니오" : "취소하기"}
            </CancelBtn>
            <CheckBtn onClick={statusChange}>
              {stateCode === 200 || stateCode === 570
                ? "네"
                : stateCode === 300
                ? "배송 처리하기"
                : stateCode === 999
                ? "환불완료하기"
                : "반품완료하기"}
            </CheckBtn>
          </InnerBtm>
        </InnerBox>
      </Modal>
    </>
  );
};

export default StatusAlertModal;
