import React from "react";
import styled from "styled-components";
// 테이블
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Modal } from "@mui/material";

const StateModal = ({ stateOpen, stateHandleClose, rows }) => {
  return (
    <Modal
      open={stateOpen}
      onClose={stateHandleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Container>
        <h1>상태변경내역</h1>
        <TableContainer
          component={Paper}
          sx={{ height: "40vh", overflowY: "scroll" }}
        >
          <Table sx={{ minWidth: 650 }}>
            <TableHead>
              <TableRow>
                <TableCell width={"40%"} align={"center"}>
                  변경일시
                </TableCell>
                <TableCell align={"center"}>상태값</TableCell>
                <TableCell align={"center"}>사유</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows?.map((row, i) => (
                <TableRow
                  key={row.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row" align={"center"}>
                    {`${row.createdAt.split("T")[0]} ${row.createdAt.substring(
                      11,
                      19
                    )}`}
                  </TableCell>
                  <TableCell component="th" scope="row" align={"center"}>
                    {row.statusText}
                  </TableCell>
                  <TableCell component="th" scope="row" align={"center"}>
                    {row.reason ? row.reason : "-"}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </Modal>
  );
};
export default StateModal;

const Container = styled.div`
  width: 50vw;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #fff;
  box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.25);
  padding: 50px 40px;
  box-sizing: border-box;
  h1 {
    font-size: 24px;
    margin-bottom: 20px;
  }
`;
