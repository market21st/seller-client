import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";

// Components
import PayModal from "./PayModal";
import StateModal from "./StateModal";
import StatusAlertModal from "./StatusAlertModal";
// Mui
import { FormControl, Select, MenuItem } from "@mui/material";
// 테이블
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

// Api
import { getDetail, OrderMemo, getHistory } from "../../api/order";

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  padding: 50px 59px;
  h1 {
    font-size: 24px;
    font-weight: 500;
  }
  & .MuiOutlinedInput-notchedOutline {
    border: none !important;
  }
`;

const RowInner = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  label {
    width: 16%;
    padding-left: 45px;
  }
  input {
    border-radius: 5px;
    padding: 18px 14px;
    font-weight: 800;
    box-sizing: border-box;
    width: 100%;
    box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
  }
`;

const RowInnerTop = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  align-items: flex-start;
  label {
    width: 16%;
    padding-top: 10px;
    padding-left: 45px;
  }
  input {
    border-radius: 5px;
    padding: 18px 14px;
    font-weight: 800;
    box-sizing: border-box;
    width: 100%;
    box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
  }
`;

const InputBox = styled.div`
  width: 80%;
`;
const TopBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const IdBox = styled.div`
  width: 100%;
  padding: 40px 7px;
  margin: 20px 0 40px;
  background: #fff;
  border-radius: 15px;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
  div:last-child {
    margin-bottom: 0;
  }
`;

const Row = styled.div`
  margin-bottom: 20px;
  display: flex;
  width: 100%;
  align-items: center;
  p {
    width: 15%;
    display: inline-block;
    border-right: 2px solid #e1e7ef;
    padding: 0 40px;
    margin-right: 40px;
  }
  div {
    display: flex;
    align-items: center;
  }
`;

const RowBox = styled.div`
  width: 100%;
  display: flex;
  margin-bottom: 20px;
  p {
    width: 30%;
    display: inline-block;
    border-right: 2px solid #e1e7ef;
    padding: 0 40px;
    margin-right: 40px;
  }
  div {
    width: 50%;
  }
`;

const EditBox = styled.div`
  width: 100%;
`;

const FilterBtn = styled.div`
  align-items: center;
  display: flex;
  justify-content: flex-end;
  button {
    width: 140px;
    padding: 15px 15px;
    /* border: 1px solid #404040; */
    font-size: 14px;
    background: #fff;
    color: #404040;
    font-weight: 500;
    border-radius: 5px;
    box-shadow: 0px 2px 5px rgb(0 0 0 / 10%);
  }
  button:last-child {
    margin-left: 15px;
  }
`;
const BtnBox = styled.div`
  margin-top: 40px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  button {
    width: 400px;
    padding: 15px 15px;
    /* border: 1px solid #404040; */
    background: #fff;
    color: #000;
    /* font-weight: 500; */
    border-radius: 5px;
    box-shadow: 0px 2px 5px rgb(0 0 0 / 10%);
    font-weight: 500;
  }
`;

function memoData(contents, createdAt, workUser) {
  return { contents, createdAt, workUser };
}
function buyData(createdAt, payMethod, amount, id) {
  return { createdAt, payMethod, amount, id };
}
function stateData(createdAt, statusText, reason, name, id) {
  return { createdAt, statusText, reason, name, id };
}

const OrderDetails = () => {
  const navigator = useNavigate();
  const { id } = useParams();
  const textRef = useRef("");

  const [userInfo, setUserInfo] = useState({});
  const [reason, setReason] = useState("");
  function onChange(e) {
    const { name, value } = e.target;
    setUserInfo({
      ...userInfo,
      [name]: value,
    });
  }

  const [data, setData] = useState([]);
  const [addressText, setAddressText] = useState([]);

  const [payList, setPayList] = useState([]);
  const [statusLists, setStatusLists] = useState([]);
  const [statusList, setStatusList] = useState([]);

  // 상태변경내역
  const statusHistory = async () => {
    const { data, statusCode } = await getHistory(id, "status");
    if (statusCode === 200) {
      setStatusLists(data);
    }
  };

  // 상세 조회
  const detailData = async () => {
    const { data, statusCode } = await getDetail(id);
    if (statusCode == 200) {
      setData(data);
      setStatusList(data?.statusToBeGroup?.results);
      // 요청사항
      data?.orderer?.userDeliveries.map((e) => {
        if (
          data.address.split(",")[0] === e.addressHead &&
          data.address.split(", ")[1] === e.addressDetail
        )
          setAddressText(e.memo);
      });
      const reason =
        data?.statusHistories?.filter(({ status }) => status === 550) || "";
      if (reason.length) setReason(reason[0].reason);
    }
  };

  // 메모 현황
  const memoRows = data?.memos?.map((e) =>
    memoData(e.contents, e.createdAt, e.workUser)
  );

  // 상태변경내역
  const stateRows = statusLists?.map((e) =>
    stateData(
      e.createdAt,
      e.statusText,
      e.reason?.contents,
      e.reason?.workUser,
      e.id
    )
  );

  // 상태모달
  const [stateModal, setStateModal] = useState(false);
  const stateModalClose = () => {
    setStateModal(false);
  };

  const [memoList, setMemoList] = useState(null);
  const mykeydown = async (e) => {
    const memoVelue = textRef.current.value;
    if (window.event.keyCode == 13 && memoVelue !== "") {
      const list = { contents: memoVelue };
      const { statusCode } = await OrderMemo(id, list);
      if (statusCode === 200) {
        setMemoList(data);
      }
      textRef.current.value = "";
    }
  };

  useEffect(() => {
    detailData();
  }, [memoList]);

  useEffect(() => {
    statusHistory();
  }, []);

  // 상태변경
  const [personName, setPersonName] = useState("");
  const [stateCode, setStateCode] = useState(null);
  const [subText, setSubText] = useState("");

  // Modal
  const [alertModal, setAlertModal] = useState(false);
  const [text, setText] = useState("");
  const aleatHandleClose = () => {
    setAlertModal(false);
  };

  // 상태변경시
  const statusChange = (e) => {
    const text = e.target.value;
    setPersonName(text);
    statusList.map((e) => {
      if (e.key === text) {
        setStateCode(e.value);
      }
    });

    if (text === "배송중") {
      setText(`배송정보를 기입해주세요.`);
      setSubText(
        "*택배사와 운송장을 올바르게 입력하지 않으면 저장되지 않습니다."
      );
    }
    if (text === "배송준비중") {
      setText(`${text}으로 변경하시겠습니까?`);
    }
    if (text === "반품확인중") {
      setText(`${text}으로 변경하시겠습니까?`);
    }
    if (text === "반품회수거부") {
      setText(`반품회수거부정보를 기입해주세요`);
    }
    if (text === "반품요청") {
      setText(`반품요청정보를 기입해주세요`);
    }

    if (text === "환불완료") {
      setText(`환불완료정보를 기입해주세요.`);
      setSubText("환불은 전액 환불만 가능합니다.");
    }
    setAlertModal(true);
  };
  const reasonchk = () => {
    console.log(data.statusHistory);
    if (data?.statusHistory?.length) {
      const reason =
        data.statusHistory.filter((v) => v.status === 550)?.reason.contents ||
        "";
      console.log(reason);
      return reason;
    }
  };
  return (
    <>
      <StatusAlertModal
        isOpen={alertModal}
        onClose={aleatHandleClose}
        subText={subText}
        text={text}
        stateCode={stateCode}
        setSubText={setSubText}
        setState={setPersonName}
        id={id}
      />

      <StateModal
        stateOpen={stateModal}
        stateHandleClose={stateModalClose}
        rows={stateRows}
      />
      <Container>
        <TopBox>
          <h1>주문 상세</h1>
          <FilterBtn>
            <button onClick={() => setStateModal(true)}>상태변경내역</button>
          </FilterBtn>
        </TopBox>
        <IdBox>
          <Row>
            <p>주문일</p>
            {data.createdAt?.split("T")[0]}
          </Row>
          <Row>
            <p>주문번호</p>
            {data.merchantUid?.split("-")[0]}
          </Row>
          <Row>
            <p>주문상품명</p>
            {`${data.productOption?.name} - ${data.productOption?.optionText}`}
          </Row>
          <RowBox>
            <div>
              <p>등급</p>
              {data.product?.grade === 2
                ? "S"
                : data.product?.grade === 1
                ? "A"
                : "B"}
            </div>
          </RowBox>
          <RowBox>
            <div>
              <p>판매가</p>
              {Number(data.productOption?.price).toLocaleString()}
            </div>
            <div>
              <p>수수료율</p>
              {data.fee}
            </div>
          </RowBox>
          <RowBox>
            <div>
              <p>택배사</p>
              {data.deliveryCorpText ? data.deliveryCorpText : "-"}
            </div>
            <div>
              <p>운송장</p>
              {data.invoiceNo ? data.invoiceNo : "-"}
            </div>
          </RowBox>
          <RowBox>
            <div>
              <p>주문자</p>
              {data.orderer?.name}
            </div>
            <div>
              <p>전화번호</p>
              {data.orderer?.phone}
            </div>
          </RowBox>
          <RowBox>
            <div>
              <p>배송주소</p>
              {data?.address}
            </div>
            <div>
              <p>우편번호</p>
              {data.postCode}
            </div>
          </RowBox>
          <RowBox>
            <div>
              <p>주문상태</p>
              {data?.statusText === "구매완료" && data?.invoiceNo
                ? "배송완료"
                : data?.statusText}
            </div>
            <div>
              <p>배송요청사항</p>
              {addressText}
            </div>
          </RowBox>
          {reason?.contents ? (
            <Row>
              <p>환불사유</p>
              {reason?.contents}
            </Row>
          ) : null}
        </IdBox>
        <EditBox>
          {/* <RowInner>
            <label>상태변경</label>
            <InputBox>
              <FormControl>
                <Select
                  onChange={statusChange}
                  displayEmpty
                  inputProps={{ "aria-label": "Without label" }}
                  value={personName}
                  name="status"
                  sx={{
                    mt: "8px",
                    width: "195px",
                    background: "#fff",
                    boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  <MenuItem disabled value="">
                    <em>상태변경</em>
                  </MenuItem>
                  {statusList?.map((e, i) => (
                    <MenuItem key={e.value} value={e.key} name={e.value}>
                      {e.key}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </InputBox>
          </RowInner> */}
          <RowInner>
            <label>관리자메모</label>
            <InputBox>
              <input
                type="text"
                name="memo"
                onKeyDown={mykeydown}
                ref={textRef}
              />
            </InputBox>
          </RowInner>
          <RowInnerTop>
            <label>메모현황</label>
            <InputBox>
              <TableContainer component={Paper}>
                <Table
                  sx={{
                    minWidth: 650,
                    boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  <TableBody>
                    {memoRows ? (
                      memoRows?.map((row, i) => (
                        <TableRow
                          key={i}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TableCell component="th" width={"10%"}></TableCell>
                          <TableCell
                            component="th"
                            scope="row"
                            align={"left"}
                            width={"40%"}
                          >
                            {row.contents}
                          </TableCell>
                          <TableCell
                            component="th"
                            scope="row"
                            align={"left"}
                            width={"30%"}
                          >
                            {row.createdAt}
                          </TableCell>
                          <TableCell
                            component="th"
                            scope="row"
                            align={"left"}
                            width={"30%"}
                          >
                            {row.workUser}
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell component="th" align={"center"}>
                          메모없음
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </InputBox>
          </RowInnerTop>
          <BtnBox>
            <button onClick={() => navigator("/order")}>목록</button>
          </BtnBox>
        </EditBox>
      </Container>
    </>
  );
};
export default OrderDetails;
