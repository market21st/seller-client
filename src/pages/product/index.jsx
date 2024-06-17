import React, { useEffect, useCallback, useState } from "react";
import styled from "styled-components";
import { debounce } from "../../utils/debounce";
import {
  Grid,
  TextField,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableBody,
  TableCell,
  Button,
  Pagination,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { getStock } from "../../api/stock";
import ListModal from "../../components/common/ListModal";
import { TemplateTitleWrap, TemplateWrap } from "../order";

const ProductList = () => {
  const [optionText, setOptionText] = useState("");
  const [el, setel] = useState([]);
  const [curpage, setCurPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [listmodal, setListModal] = useState({
    open: false,
    id: 0,
  });
  const onClickOpen = (id) => {
    setListModal({ open: true, id });
  };
  const onClickClose = () => {
    setListModal({ open: false, id: 0 });
  };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getInfoList = async (txt = "", v = 1) => {
    const { data, statusCode } = await getStock({
      optionText: txt ? txt : optionText,
      take: 10,
      page: v ? v : curpage,
    });
    if (statusCode === 200) {
      setTotal(data.total);
      setel(
        data?.results?.map(({ id, name }) => (
          <tr key={id}>
            <TableCell component="td" align="center">
              {id}
            </TableCell>
            <TableCell component="td" align="center">
              {name}
            </TableCell>
            <TableCell component="td" align="center">
              <Button onClick={() => onClickOpen(id)} variant="contained">
                추가
              </Button>
            </TableCell>
          </tr>
        ))
      );
    }
  };
  const debounceInfo = debounce(getInfoList, 300);
  const onChangePage = (v) => {
    setCurPage(v);
    getInfoList("", v);
  };
  const getdebounceInfo = useCallback((txt) => {
    debounceInfo(txt);
  }, []);

  useEffect(() => {
    getdebounceInfo(optionText);
  }, [optionText]);

  return (
    <>
      <ListModal
        isOpen={listmodal.open}
        id={listmodal.id}
        onClose={onClickClose}
      />
      <TemplateWrap>
        <TemplateTitleWrap>
          <h2>상품 등록</h2>
        </TemplateTitleWrap>
        <Grid container marginBottom={"20px"}>
          <Grid item xs={6}>
            <Grid container position={"relative"} alignItems="center">
              <TextField
                fullWidth
                size="small"
                placeholder={"모델명을 입력하세요."}
                value={optionText || ""}
                inputProps={{
                  style: {
                    paddingLeft: "36px",
                    height: "30px",
                  },
                }}
                onChange={(e) => setOptionText(e.target.value)}
              />
              <Grid height="24px" sx={{ position: "absolute", left: "10px" }}>
                <SearchIcon />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid
          container
          item
          xs
          flexDirection={"column"}
          gap="20px"
          alignItems={"center"}
          paddingBottom={"20px"}
        >
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <tr>
                  <TableCell
                    component={"th"}
                    align={"center"}
                    sx={{ fontWeight: 700, padding: "15px 10px" }}
                  >
                    번호
                  </TableCell>
                  <TableCell
                    component={"th"}
                    align={"center"}
                    sx={{ fontWeight: 700, padding: "15px 10px" }}
                  >
                    모델명
                  </TableCell>
                  <TableCell
                    component={"th"}
                    align={"center"}
                    sx={{ fontWeight: 700, padding: "15px 10px" }}
                  >
                    관리
                  </TableCell>
                </tr>
              </TableHead>
              <TableBody>{el}</TableBody>
            </Table>
          </TableContainer>
          <Pagination
            count={Math.ceil(total / 10)}
            page={curpage}
            onChange={(e, page) => onChangePage(page)}
          />
        </Grid>
      </TemplateWrap>
    </>
  );
};
export default ProductList;

const Container = styled.div`
  width: 100%;
  height: 100%;
  padding: 50px 59px 50px;
  h1 {
    font-size: 20px;
  }
  em {
    font-style: normal;
  }
  .area {
    width: 279px;
  }
  & .MuiOutlinedInput-notchedOutline {
    border: none !important;
  }
  a {
    display: block;
    padding: 10px 0 5px;
  }
  .scroll::-webkit-scrollbar {
    width: 10px;
  }
  .scroll::-webkit-scrollbar-thumb {
    background-color: #0082ff;
    border-radius: 5px;
  }
  .scroll::-webkit-scrollbar-track {
    background-color: #f8f8f8;
  }
`;
