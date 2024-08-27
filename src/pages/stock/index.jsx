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
import { getCategoryListApi, getStockList } from "../../api/stock";
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

  const [category1, setCategory1] = useState({});
  const [category2, setCategory2] = useState({});
  const [category3, setCategory3] = useState({});
  const [category1List, setCategory1List] = useState([]);
  const [category2List, setCategory2List] = useState([]);
  const [category3List, setCategory3List] = useState([]);

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

  const handleChange1depthCategory = (category) => {
    setCategoryId(category.fkCategoryId);
    setCategory1(category);

    setCategory2({});
    setCategory2List(category.children);
    setCategory3({});
    setCategory3List([]);
  };
  const handleChange2depthCategory = (category) => {
    setCategoryId(category.fkCategoryId);
    setCategory2(category);

    setCategory3({});
    setCategory3List(category.children);
  };
  const handleChange3depthCategory = (category) => {
    setCategoryId(category.fkCategoryId);
    setCategory3List(category);
  };

  const categoryFilter = [
    {
      label: "1차 분류",
      value: category1,
      onChange: handleChange1depthCategory,
      list: category1List,
    },
    {
      label: "2차 분류",
      value: category2,
      onChange: handleChange2depthCategory,
      list: category2List,
    },
    {
      label: "3차 분류",
      value: category3,
      onChange: handleChange3depthCategory,
      list: category3List,
    },
  ];

  const handleSearch = () => {
    getList({ type: "ALL" });
  };
  const handleClickInit = () => {
    window.location.reload();
  };
  const handleChangePage = (value) => {
    getList({ page: value });
  };

  const getCategoryList = async () => {
    const { statusCode, data } = await getCategoryListApi();
    if (statusCode === 200) setCategory1List(data);
  };
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
                {categoryFilter.map((v) => (
                  <FormControl sx={{ width: "200px" }} key={v.label}>
                    <InputLabel>{v.label}</InputLabel>
                    <Select
                      label={v.label}
                      value={v.value}
                      onChange={(v) => v.onChnage(v.target.value)}
                    >
                      {v.list?.map((v) => (
                        <MenuItem key={v.id} value={v}>
                          {v.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                ))}
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
