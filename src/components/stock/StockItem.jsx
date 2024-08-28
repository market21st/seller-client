import { Button, Grid, TableCell, TableRow, TextField } from "@mui/material";
import dayjs from "dayjs";
import { useState } from "react";
import { DeleteItem, editStock } from "../../api/stock";
import AlertModal from "../common/AlertModal";
import toast from "react-hot-toast";

const StockItem = ({ data, getList }) => {
  const [price, setPrice] = useState(String(data.price));
  const [stock, setStock] = useState(String(data.stock));
  const [updateAlert, setUpdateAlert] = useState("");
  const [deleteAlert, setDeleteAlert] = useState("");

  const rowCells = (data) => [
    <img
      src={data.thumb}
      alt={data.id}
      width={50}
      height={50}
      style={{ objectFit: "contain" }}
    />,
    `${data.optionText}`,
    data.gradeText,
    data.lowestPrice?.toLocaleString() || "-",
    <TextField
      value={price}
      onChange={(e) => setPrice(e.target.value)}
      sx={{ width: "220px" }}
      size="small"
      placeholder="천원 단위로만 입력해 주세요"
    />,
    <TextField
      value={stock}
      onChange={(e) => setStock(e.target.value)}
      sx={{ width: "220px" }}
      size="small"
    />,
    data.latestPriceChangedAt
      ? dayjs(data.latestPriceChangedAt).format("YYYY.MM.DD HH:mm:ss")
      : "-",
    <Grid container gap={1}>
      <Button variant="text" color="secondary" onClick={handleOpenDeleteAlert}>
        삭제
      </Button>
      <Button variant="outlined" onClick={handleUpdate}>
        저장
      </Button>
    </Grid>,
  ];

  const handleOpenDeleteAlert = () => {
    setDeleteAlert("삭제하시겠어요?");
  };
  const handleCloseDeleteAlert = () => {
    setDeleteAlert("");
  };

  const handleOpenUpdateAlert = (text) => {
    setUpdateAlert(text);
  };
  const handleCloseUpdateAlert = () => {
    setUpdateAlert("");
  };

  const handleUpdate = async () => {
    if (!price) {
      handleOpenUpdateAlert("판매가를 입력해 주세요.");
      return;
    } else if (!stock) {
      handleOpenUpdateAlert("재고를 입력해 주세요.");
      return;
    } else if (price.slice(-3) !== "000" || price.length < 4) {
      handleOpenUpdateAlert("판매가는 천원 단위로만 입력해 주세요.");
      return;
    }

    const { statusCode } = await editStock(data.id, { price, stock });
    if (statusCode === 200) {
      toast.success("저장되었습니다.", {
        duration: 4000,
        style: {
          marginTop: "20px",
        },
      });
      getList();
    }
  };

  const handleDelete = async () => {
    const { statusCode } = await DeleteItem(data.id);
    if (statusCode === 200) {
      toast.success("삭제되었습니다.", {
        duration: 4000,
        style: {
          marginTop: "20px",
        },
      });
      getList();
    }
  };

  return (
    <>
      <AlertModal
        open={!!updateAlert}
        text={updateAlert}
        onClose={handleCloseUpdateAlert}
      />
      <AlertModal
        open={!!deleteAlert}
        text={deleteAlert}
        onClose={handleCloseDeleteAlert}
        onConfirm={handleDelete}
      />
      <TableRow
        sx={{
          "&:last-child td, &:last-child th": { border: 0 },
          "&:hover": {
            background: "#F2F8FF",
          },
        }}
      >
        {rowCells(data).map((v, idx) => (
          <TableCell key={`row_cell_${idx}`} sx={{ whiteSpace: "pre-wrap" }}>
            {v}
          </TableCell>
        ))}
      </TableRow>
    </>
  );
};

export default StockItem;
