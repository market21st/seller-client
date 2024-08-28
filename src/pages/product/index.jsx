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

const TAKE = 10;
const TABLE_HEAD_CELLS = ["번호", "모델명", "관리"];

const ProductList = () => {
  const [list, setList] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);

  const [optionText, setOptionText] = useState("");
  const [modal, setModal] = useState({
    open: false,
    infoId: 0,
  });

  const rowCells = (row, idx) => [
    idx + 1,
    row.name,
    <Button variant="contained" onClick={() => handleOpenModal(row.id)}>
      추가
    </Button>,
  ];

  const handleOpenModal = (infoId) => {
    setModal({ open: true, infoId });
  };
  const handleCloseModal = () => {
    setModal({ open: false, infoId: 0 });
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
        isOpen={modal.open}
        infoId={modal.infoId}
        onClose={handleCloseModal}
      />
      <TemplateWrap>
        <TemplateTitleWrap>
          <h2>판매 상품 등록</h2>
        </TemplateTitleWrap>
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
