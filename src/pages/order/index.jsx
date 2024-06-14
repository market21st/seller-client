import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { getOrder, getState } from "../../api/order";
import {
  Button,
  Checkbox,
  Chip,
  FormControlLabel,
  Grid,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import "dayjs/locale/ko";
import dayjs from "dayjs";

const take = 5;

const TABLE_HEAD_CELLS = [
  "상품명/옵션",
  "등급",
  "주문번호",
  "주문일시",
  "처리상태",
  "판매가",
  "수수료율",
  "출고 배송정보",
];

const statusBgColor = (value) =>
  value === 500
    ? "success"
    : value === 110 || value === 140
    ? "error"
    : "default";

const rowCells = (row) => [
  `${row.productName}\n${row.optionText}`,
  row.gradeText,
  row.merchantUid,
  `${row.createdAt.split("T")[0]} ${row.createdAt.split("T")[1].slice(0, 8)}`,
  <Chip
    label={row.statusText}
    color={statusBgColor(row.status)}
    onClick={(e) => e.stopPropagation()}
  />,
  `${row.price.toLocaleString()}원`,
  row.fee,
  `${
    row.deliveryInformationToAdmin
      ? `${row.deliveryInformationToAdmin.deliveryCorpNameToAdmin} | ${row.deliveryInformationToAdmin.invoiceNoToAdmin}`
      : "-"
  }`,
];

const OrderListPage = () => {
  const today = dayjs().set("hour", 0).set("minute", 0).set("second", 0);
  const navigator = useNavigate();

  const [statusList, setStatusList] = useState([]);
  const [results, setResults] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);

  const [startDate, setStartDate] = useState(today.add(-1, "M"));
  const [endDate, setEndDate] = useState(today);
  const [merchantUid, setMerchantUid] = useState("");
  const [productName, setProductName] = useState("");
  const [status, setStatus] = useState([]);

  const handleClickSearch = () => {
    getList();
  };
  const handleClickInit = () => {
    window.location.reload();
  };
  const handleClickRow = (id) => {
    navigator(`/order/item/${id}`);
  };

  const handleChangePage = (value) => {
    getList(value);
  };

  const handleCheckStauts = (value) => {
    if (status.indexOf(value) === -1) {
      setStatus([...status, value]);
    } else {
      setStatus([...status.filter((v) => v !== value)]);
    }
  };

  const getStatusList = async () => {
    const { data, statusCode } = await getState();
    if (statusCode === 200) {
      setStatusList(data.orderStatus);
    }
  };
  const getList = async (pageValue) => {
    const page = pageValue || 1;
    const searchData = {
      take,
      page,
      status,
      startDate,
      endDate,
      merchantUid,
      productName,
    };
    const { data, statusCode } = await getOrder(searchData);
    if (statusCode === 200) {
      setTotal(data.total);
      setResults(data.results);
      setPage(page);
    }
  };

  useEffect(() => {
    getStatusList();
    getList();
  }, []);

  return (
    <Wrap>
      <TitleWrap>
        <h2>주문 배송 관리</h2>
        <h3>모든 주문 내역을 조회할 수 있는 메뉴입니다.</h3>
      </TitleWrap>
      <Box>
        <h4>주문 검색</h4>
        <SearchRow>
          <p>처리상태</p>
          <Grid container flexWrap={"wrap"}>
            {statusList.map(({ key, value }) => (
              <FormControlLabel
                key={`status_${value}`}
                label={key}
                control={
                  <Checkbox
                    checked={status.indexOf(value) !== -1}
                    onChange={() => handleCheckStauts(value)}
                  />
                }
              />
            ))}
          </Grid>
        </SearchRow>
        <SearchRow>
          <p>조회기간 (주문일)</p>
          <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ko">
            <DatePicker
              format="YYYY-MM-DD"
              maxDate={endDate}
              value={startDate}
              onChange={(v) => setStartDate(v)}
            />
            <span>~</span>
            <DatePicker
              format="YYYY-MM-DD"
              minDate={startDate}
              value={endDate}
              onChange={(v) => setEndDate(v)}
            />
          </LocalizationProvider>
        </SearchRow>
        <SearchRow>
          <p>상세조건</p>
          <TextField
            label="주문번호"
            value={merchantUid}
            onChange={(e) => setMerchantUid(e.target.value)}
          />
          <TextField
            label="상품명"
            placeholder="갤럭시"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
          />
        </SearchRow>
        <ButtonWrap>
          <Button variant="contained" size="large" onClick={handleClickSearch}>
            조회
          </Button>
          <Button variant="outlined" size="large" onClick={handleClickInit}>
            초기화
          </Button>
        </ButtonWrap>
      </Box>
      <Box>
        <h4>전체 주문 검색 목록 ({total}건)</h4>
        <Table>
          <TableHead>
            <TableRow>
              {TABLE_HEAD_CELLS.map((v) => (
                <TableCell key={`head_cell_${v}`}>{v}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {results.map((row) => (
              <TableRow
                key={`row_${row.id}`}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                  "&:hover": {
                    background: "#F2F8FF",
                  },
                  cursor: "pointer",
                }}
                onClick={() => handleClickRow(row.id)}
              >
                {rowCells(row).map((v, idx) => (
                  <TableCell
                    key={`row_cell_${idx}`}
                    sx={{ whiteSpace: "pre-wrap" }}
                  >
                    {v}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
      <Grid container justifyContent={"center"}>
        <Pagination
          count={Math.ceil(total / take)}
          page={page}
          onChange={(e, v) => handleChangePage(v)}
          showFirstButton
          showLastButton
        />
      </Grid>
    </Wrap>
  );
};
export default OrderListPage;

const Wrap = styled.div`
  padding: 40px 60px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  h2 {
    font-size: 20px;
    font-weight: 700;
  }
  h3 {
    color: #5a6080;
    font-size: 14px;
  }
  h4 {
    color: #8e9ebf;
    font-size: 14px;
    font-weight: 700;
  }
`;

const TitleWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Box = styled.div`
  background: #fff;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  border-radius: 10px;
  border: 1px solid #cfd4f0;
`;

const ButtonWrap = styled.div`
  padding-top: 20px;
  display: flex;
  gap: 16px;
  border-top: 1px solid var(--BlueGray-100, #e4e9f5);
`;

const SearchRow = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  & > p {
    min-width: 200px;
    font-size: 14px;
    font-weight: 500;
  }
`;
