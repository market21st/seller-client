import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { ModalButtonWrap, ModalWrap } from "./OrderHistoryModal";
import styled from "styled-components";
import { editOrderStatus, getDelivery } from "../../api/order";

const StatusUpdateModal = ({
  open,
  onClose,
  status,
  statusText,
  statusToBeGroup,
  id,
  reload,
}) => {
  const [data, setData] = useState({});
  const [etcComment, setEtcComment] = useState("");
  const [deliveryCorpList, setDeliveryCorpList] = useState([]);

  const getDeliveryCorpList = async () => {
    const { data, statusCode } = await getDelivery();
    if (statusCode === 200) setDeliveryCorpList(data.results);
  };

  const handleUpdateStatus = async () => {
    const formData = {
      ...data,
      comment: data.comment === "기타 (직접입력)" ? etcComment : data.comment,
    };
    const { statusCode } = await editOrderStatus(id, formData);
    if (statusCode === 200) {
      reload();
      onClose();
    }
  };

  useEffect(() => {
    if (open) {
      setData({});
      setEtcComment("");
    }
  }, [open]);
  useEffect(() => {
    getDeliveryCorpList();
  }, []);

  return (
    <Modal
      open={open}
      onClose={onClose}
      sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
    >
      <ModalWrap>
        <Grid
          component={"form"}
          container
          flexDirection={"column"}
          gap={2}
          onSubmit={(e) => {
            e.preventDefault();
            handleUpdateStatus();
          }}
        >
          <h2>주문 처리상태 변경</h2>
          <h3>
            출고가능 여부에 따라 [출고대기] 또는 [출고불가 신청]으로
            변경해주세요
          </h3>
          <FormControl disabled>
            <InputLabel>현재</InputLabel>
            <Select label="현재" value={status}>
              <MenuItem value={status}>{statusText}</MenuItem>
            </Select>
          </FormControl>
          <FormControl required>
            <InputLabel>변경 후</InputLabel>
            <Select
              label="변경 후"
              value={data.status || ""}
              onChange={(e) => setData({ status: e.target.value })}
            >
              {statusToBeGroup?.map(({ key, value }) => (
                <MenuItem value={value} key={value}>
                  {key}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          {/* 출고완료 */}
          {data.status === 120 ? (
            <OptionWrap>
              <p>출고 배송정보</p>
              <div>
                <FormControl required>
                  <InputLabel>택배사</InputLabel>
                  <Select
                    label="택배사"
                    value={data.deliveryCorp || ""}
                    onChange={(e) =>
                      setData({ ...data, deliveryCorp: e.target.value })
                    }
                  >
                    {deliveryCorpList.map(({ key, value }) => (
                      <MenuItem value={value} key={value}>
                        {key}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <TextField
                  required
                  placeholder="운송장번호"
                  value={data.invoiceNo}
                  onChange={(e) =>
                    setData({ ...data, invoiceNo: e.target.value })
                  }
                />
              </div>
            </OptionWrap>
          ) : null}
          {/* 출고불가신청 */}
          {data.status === 150 ? (
            <OptionWrap>
              <p>출고불가 신청 사유</p>
              <div>
                <FormControl required>
                  <Select
                    value={data.comment || ""}
                    onChange={(e) =>
                      setData({ ...data, comment: e.target.value })
                    }
                  >
                    <MenuItem value="재고 부족">재고 부족</MenuItem>
                    <MenuItem value="기타 (직접입력)">기타 (직접입력)</MenuItem>
                  </Select>
                </FormControl>
                {data.comment === "기타 (직접입력)" ? (
                  <TextField
                    required
                    placeholder="출고불가 사유를 입력해 주세요."
                    value={etcComment || ""}
                    onChange={(e) => setEtcComment(e.target.value)}
                  />
                ) : null}
              </div>
            </OptionWrap>
          ) : null}
          <DescWrap>
            <li>
              [출고불가 신청]을 하는 경우 해당 상품/옵션의 재고수량이 0으로
              변경돼요.
            </li>
            <li>
              출고불가 신청 후 [출고불가 확정] 처리된 주문은 되돌릴 수 없어요.
            </li>
          </DescWrap>
          <ModalButtonWrap>
            <Button onClick={onClose} variant="outlined" size="large">
              취소
            </Button>
            <Button variant="contained" size="large" type="submit">
              확인
            </Button>
          </ModalButtonWrap>
        </Grid>
      </ModalWrap>
    </Modal>
  );
};

export default StatusUpdateModal;

const DescWrap = styled.ul`
  list-style: inside disc;
  font-size: 14px;
`;

const OptionWrap = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  border-radius: 8px;
  background: #f5f7fc;
  p {
    font-size: 14px;
    font-weight: 500;
  }
  & > div {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
`;
