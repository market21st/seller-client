import { Button, Grid, TableCell, TableRow, TextField } from "@mui/material";
import dayjs from "dayjs";
import { useState } from "react";
import { DeleteItem, editStock } from "../../api/stock";
import AlertModal from "../common/AlertModal";
import toast from "react-hot-toast";

const Item = ({ data, getList }) => {
  const [price, setPrice] = useState(data.price);
  const [stock, setStock] = useState(data.stock);
  const [alert, setAlert] = useState("");

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
      <Button variant="text" color="secondary" onClick={handleDelete}>
        삭제
      </Button>
      <Button variant="outlined" onClick={handleUpdate}>
        저장
      </Button>
    </Grid>,
  ];

  const handleCloseAlert = () => {
    setAlert("");
  };

  const handleUpdate = async () => {
    if (!price || price < 0) {
      setAlert("판매가가 0 이하일 수 없습니다.");
      return;
    }
    if (price.slice(-3) != "000" || price.length < 4) {
      setAlert("가격 입력의 최소단위는 1,000원입니다.");
      return;
    }

    const { statusCode } = await editStock(data.id, { price, stock });
    if (statusCode === 200) {
      toast.success("저장되었습니다.", {
        duration: 4000,
        position: "bottom-center",
        style: {
          marginBottom: 100,
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
        position: "bottom-center",
        style: {
          marginBottom: 100,
        },
      });
      getList();
    }
  };

  return (
    <>
      <AlertModal open={!!alert} onClose={handleCloseAlert} text={alert} />
      <TableRow
        key={data.id}
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

export default Item;
