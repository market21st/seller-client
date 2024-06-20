import React from "react";
import {
  Button,
  Modal,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import styled from "styled-components";
import dayjs from "dayjs";

const TABLE_HEAD_CELLS = ["변경 일시", "처리상태", "사유"];

const rowCells = (row) => [
  dayjs(row.createdAt).format("YYYY.MM.DD HH:mm:ss"),
  row.statusText,
  row.reason?.contents,
];

const OrderHistoryModal = ({ open, onClose, history }) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
    >
      <ModalWrap>
        <h2>상태변경 내역</h2>
        <Table>
          <TableHead>
            <TableRow>
              {TABLE_HEAD_CELLS.map((v) => (
                <TableCell key={`head_cell_${v}`}>{v}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {history?.map((row, idx) => (
              <TableRow
                key={`row_${idx}`}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                  "&:hover": {
                    background: "#F2F8FF",
                  },
                }}
              >
                {rowCells(row).map((v, idx) => (
                  <TableCell key={`row_cell_${idx}`}>{v || "-"}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <ModalButtonWrap>
          <Button onClick={onClose} variant="contained" size="large">
            확인
          </Button>
        </ModalButtonWrap>
      </ModalWrap>
    </Modal>
  );
};

export default OrderHistoryModal;

export const ModalWrap = styled.div`
  position: relative;
  width: 800px;
  max-width: 80%;
  max-height: 80%;
  overflow-y: auto;
  padding: 40px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  border-radius: 10px;
  background: #fff;
  h2 {
    font-size: 18px;
    font-weight: 700;
  }
  h3 {
    font-weight: 500;
    padding: 10px 0;
    display: flex;
    align-items: center;
    gap: 8px;
    span {
      padding: 6px 10px;
      border-radius: 8px;
      background: #26324d;
      color: #fff;
      font-size: 14px;
      font-weight: 500;
      white-space: nowrap;
    }
  }
`;

export const ModalButtonWrap = styled.div`
  display: flex;
  justify-content: end;
  gap: 16px;
  padding-top: 20px;
`;
