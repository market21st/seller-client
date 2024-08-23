import React, { useEffect, useState } from "react";
import {
  Grid,
  Pagination,
  Button,
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Tabs,
  Tab,
} from "@mui/material";
import { getStockList } from "../../api/stock";
import GradeModal from "../../components/stock/GradeModal";
import {
  TemplateBox,
  TemplateButtonWrap,
  TemplateRow,
  TemplateTitleWrap,
  TemplateWrap,
} from "../order";
import Item from "../../components/stock/Item";
import {
  STOCK_ORDER_BY_OPTIONS,
  STOCK_TAB_ITEMS,
  STOCK_TABLE_HEAD_CELLS,
  STOCK_TAKE_OPTIONS,
} from "../../constants/stock";

const StockListPage = () => {
  const [gradeModal, setGradeModal] = useState(false);

  const [list, setList] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);

  const [take, setTake] = useState(10);
  const [categoryId, setCategoryId] = useState(0);
  const [optionText, setOptionText] = useState("");
  const [type, setType] = useState("ALL");
  const [orderBy, setOrderBy] = useState(1);

  const handleOpenGradeModal = () => {
    setGradeModal(true);
  };
  const handleCloseGradeModal = () => {
    setGradeModal(false);
  };

  const handleSearch = () => {
    getList({ type: "ALL" });
  };
  const handleClickInit = () => {
    window.location.reload();
  };
  const handleChangePage = (value) => {
    getList({ page: value });
  };

  const getCategoryList = async () => {};
  const getList = async (query) => {
    const pageQuery = query?.page || 1;
    const typeQuery = query?.type || type;
    const searchData = {
      take,
      page: pageQuery,
      categoryId,
      optionText,
      type: typeQuery,
      orderBy,
    };
    const { data, statusCode } = await getStockList(searchData);
    if (statusCode === 200) {
      setTotal(data.total);
      setList(data.results);
      setPage(pageQuery);
      setType(typeQuery);
    }
  };

  useEffect(() => {
    getCategoryList();
  }, []);
  useEffect(() => {
    getList();
  }, [type, orderBy, take]);

  return (
    <>
      <GradeModal isOpen={gradeModal} onClose={handleCloseGradeModal} />
      <TemplateWrap>
        <TemplateTitleWrap>
          <h2>판매 상품 관리</h2>
          <h3>판매되고 있는 상품을 조회하고 수정할 수 있습니다.</h3>
        </TemplateTitleWrap>
        <TemplateBox>
          <Grid
            component={"form"}
            container
            flexDirection={"column"}
            gap={2}
            onSubmit={(e) => {
              e.preventDefault();
              handleSearch();
            }}
          >
            <h4>상품 검색</h4>
            <TemplateRow>
              <p>분류</p>
              <Grid container gap={1}>
                <FormControl sx={{ width: "200px" }}>
                  <InputLabel>1차 분류</InputLabel>
                  <Select
                    label="1차 분류"
                    value={categoryId}
                    onChange={(v) => setCategoryId(v.target.value)}
                  >
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                  </Select>
                </FormControl>
                <FormControl sx={{ width: "200px" }}>
                  <InputLabel>2차 분류</InputLabel>
                  <Select
                    label="2차 분류"
                    value={categoryId}
                    onChange={(v) => setCategoryId(v.target.value)}
                  >
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                  </Select>
                </FormControl>
                <FormControl sx={{ width: "200px" }}>
                  <InputLabel>3차 분류</InputLabel>
                  <Select
                    label="3차 분류"
                    value={categoryId}
                    onChange={(v) => setCategoryId(v.target.value)}
                  >
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </TemplateRow>
            <TemplateRow>
              <p>상품명</p>
              <TextField
                label="상품명"
                value={optionText}
                onChange={(e) => setOptionText(e.target.value)}
                sx={{ width: "300px" }}
              />
            </TemplateRow>
            <TemplateButtonWrap>
              <Button variant="contained" size="large" type="submit">
                조회
              </Button>
              <Button variant="outlined" size="large" onClick={handleClickInit}>
                초기화
              </Button>
            </TemplateButtonWrap>
          </Grid>
        </TemplateBox>
        <TemplateBox>
          <Grid
            container
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Tabs value={type} onChange={(e, v) => setType(v)}>
              {STOCK_TAB_ITEMS.map((v) => (
                <Tab key={v.value} label={v.label} value={v.value} />
              ))}
            </Tabs>
            <Grid display={"inline-flex"} gap={1}>
              <Select
                value={orderBy}
                onChange={(v) => setOrderBy(v.target.value)}
                size="small"
              >
                {STOCK_ORDER_BY_OPTIONS.map((v) => (
                  <MenuItem key={v.value} value={v.value}>
                    {v.name}
                  </MenuItem>
                ))}
              </Select>
              <Select
                value={take}
                onChange={(v) => setTake(v.target.value)}
                size="small"
              >
                {STOCK_TAKE_OPTIONS.map((v) => (
                  <MenuItem key={v.value} value={v.value}>
                    {v.name}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
          </Grid>
          <Table>
            <TableHead>
              <TableRow>
                {STOCK_TABLE_HEAD_CELLS.map((v) => (
                  <TableCell key={v}>{v}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {list.length ? (
                list?.map((v) => <Item key={v.id} data={v} getList={getList} />)
              ) : (
                <TableRow>
                  <TableCell>판매 상품이 없습니다.</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TemplateBox>
        <Grid container justifyContent={"center"}>
          <Pagination
            count={Math.ceil(total / take)}
            page={page}
            onChange={(e, v) => handleChangePage(v)}
            showFirstButton
            showLastButton
          />
        </Grid>
      </TemplateWrap>
    </>
  );
};
export default StockListPage;
