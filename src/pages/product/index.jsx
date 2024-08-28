import React, { useEffect, useCallback, useState } from "react";
import { debounce } from "../../utils/debounce";
import {
  Grid,
  TextField,
  Table,
  TableHead,
  TableBody,
  TableCell,
  Button,
  Pagination,
  TableRow,
  InputAdornment,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { getStock } from "../../api/stock";
import { TemplateBox, TemplateTitleWrap, TemplateWrap } from "../order";
import ListModal from "../../components/product/ListModal";
import GradeModal from "../../components/stock/GradeModal";

const TAKE = 10;
const TABLE_HEAD_CELLS = ["번호", "모델명", "관리"];

const ProductList = () => {
  const [optionText, setOptionText] = useState("");
  const [list, setList] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);

  const [listModal, setListModal] = useState({
    open: false,
    infoId: 0,
  });
  const [openGradeModal, setOpenGradeModal] = useState(false);

  const rowCells = (row, idx) => [
    idx + 1,
    row.name,
    <Button variant="contained" onClick={() => handleOpenListModal(row.id)}>
      추가
    </Button>,
  ];

  const handleOpenListModal = (infoId) => {
    setListModal({ open: true, infoId });
  };
  const handleCloseListModal = () => {
    setListModal({ open: false, infoId: 0 });
  };

  const handleOpenGradeModal = () => {
    setOpenGradeModal(true);
  };
  const handleCloseGradeModal = () => {
    setOpenGradeModal(false);
  };

  const handleChangePage = (v) => {
    setPage(v);
    getInfoList("", v);
  };

  const getInfoList = async (txt = "", v = 1) => {
    const { data, statusCode } = await getStock({
      optionText: txt ? txt : optionText,
      take: TAKE,
      page: v ? v : page,
    });
    if (statusCode === 200) {
      setTotal(data.total);
      setList(data.results);
    }
  };

  const debounceInfo = debounce(getInfoList, 300);
  const getdebounceInfo = useCallback((txt) => {
    debounceInfo(txt);
  }, []);

  useEffect(() => {
    getdebounceInfo(optionText);
  }, [optionText]);

  return (
    <>
      <ListModal
        isOpen={listModal.open}
        infoId={listModal.infoId}
        onClose={handleCloseListModal}
      />
      <GradeModal isOpen={openGradeModal} onClose={handleCloseGradeModal} />
      <TemplateWrap>
        <TemplateTitleWrap>
          <h2>판매 상품 등록</h2>
        </TemplateTitleWrap>
        <Grid container justifyContent={"space-between"} alignItems={"center"}>
          <TextField
            placeholder="모델명을 입력하세요."
            value={optionText || ""}
            onChange={(e) => setOptionText(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            sx={{ width: "500px" }}
          />
          <Button
            variant="outlined"
            color="secondary"
            style={{ background: "#fff" }}
            onClick={handleOpenGradeModal}
          >
            등급 기준 보기
          </Button>
        </Grid>
        <TemplateBox>
          <Table>
            <TableHead>
              <TableRow>
                {TABLE_HEAD_CELLS.map((v) => (
                  <TableCell key={`head_cell_${v}`}>{v}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {list?.map((row, rowIdx) => (
                <TableRow
                  key={`row_${row.id}`}
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                    "&:hover": {
                      background: "#F2F8FF",
                    },
                  }}
                >
                  {rowCells(row, rowIdx).map((v, idx) => (
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
        </TemplateBox>
        <Grid container justifyContent={"center"}>
          <Pagination
            count={Math.ceil(total / TAKE)}
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
export default ProductList;
