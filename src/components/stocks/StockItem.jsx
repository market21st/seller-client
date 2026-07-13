import {
    Button,
    Checkbox,
    Grid,
    TableCell,
    TableRow,
    TextField,
} from "@mui/material";
import dayjs from "dayjs";
import { useState } from "react";
import AlertModal from "../common/AlertModal";
import toast from "react-hot-toast";
import { deleteProductVariety, patchProductVariety } from "../../api/stocks";

const StockItem = ({ group, getList, checked, onCheck }) => {
    const groupKey = group.groupKey;

    // 초기 판매가: varieties 중 첫 번째 가격 사용
    const initialPrice = group.varieties?.[0]?.productPrice || 0;
    const [price, setPrice] = useState(String(initialPrice));
    const [colorStocks, setColorStocks] = useState(
        (group.varieties || []).map((c) => ({
            ...c,
            productStock: String(c.productStock || 0),
        }))
    );
    const [updateAlert, setUpdateAlert] = useState("");
    const [deleteAlert, setDeleteAlert] = useState("");

    const handleOpenDeleteAlert = () => {
        setDeleteAlert("이 상품의 모든 색상을 삭제하시겠어요?");
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

    const handleColorStockChange = (index, value) => {
        setColorStocks((prev) =>
            prev.map((c, i) => (i === index ? { ...c, productStock: value } : c))
        );
    };

    const handleUpdate = async () => {
        if (!price) {
            handleOpenUpdateAlert("판매가를 입력해 주세요.");
            return;
        }
        if (price.slice(-3) !== "000" || price.length < 4) {
            handleOpenUpdateAlert("판매가는 천원 단위로만 입력해 주세요.");
            return;
        }

        const priceNum = Number(price);
        const minPrice = group.productMinPrice;
        const maxPrice = group.productMaxPrice;

        if (minPrice && priceNum < minPrice) {
            handleOpenUpdateAlert(
                `판매가가 하한가(${minPrice.toLocaleString()}원)보다 낮습니다.\n하한가 이상으로 입력해 주세요.`
            );
            return;
        }
        if (maxPrice && priceNum > maxPrice) {
            handleOpenUpdateAlert(
                `판매가가 상한가(${maxPrice.toLocaleString()}원)보다 높습니다.\n상한가 이하로 입력해 주세요.`
            );
            return;
        }

        const hasEmptyStock = colorStocks.some((c) => !c.productStock && c.productStock !== "0");
        if (hasEmptyStock) {
            handleOpenUpdateAlert("재고를 입력해 주세요.");
            return;
        }
        try {
            for (const colorItem of colorStocks) {
                const { data } = await patchProductVariety({
                    productVarietyId: colorItem.productVarietyId,
                    productPrice: price,
                    productStock: colorItem.productStock,
                });

                if (data.statusCode != 200) {
                    toast.error("저장에 실패했습니다.");
                    return;
                }
            }
            toast.success("저장되었습니다.", {
                duration: 4000,
                style: { marginTop: "20px" },
            });
            getList();
        } catch {
            toast.error("저장에 실패했습니다.");
        }
    };

    const handleDelete = async () => {
        try {
            for (const colorItem of colorStocks) {
                await deleteProductVariety(colorItem.productVarietyId);
            }
            handleCloseDeleteAlert();
            toast.success("삭제되었습니다.", {
                duration: 4000,
                style: { marginTop: "20px" },
            });
            getList();
        } catch {
            toast.error("삭제에 실패했습니다.");
        }
    };

    const totalColumns = 8; // 체크박스 + 헤더 7개

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

            {/* 메인 행 */}
            <TableRow
                sx={{
                    "&:hover": { background: "#F2F8FF" },
                    "& td": { borderBottom: "none" },
                }}
            >
                {/* 체크박스 */}
                <TableCell padding="checkbox">
                    <Checkbox
                        checked={checked}
                        onChange={(e) => onCheck(groupKey, e.target.checked)}
                        size="small"
                        sx={{
                            color: "#bbb",
                            "&.Mui-checked": { color: "#0082FF" },
                        }}
                    />
                </TableCell>

                {/* 섬네일 */}
                <TableCell>
                    <img
                        src={`https://image.21market.kr/${group.productImage}`}
                        alt="섬네일"
                        width={50}
                        height={50}
                        style={{ objectFit: "contain" }}
                    />
                </TableCell>

                {/* 용량 */}
                <TableCell sx={{ minWidth: "100px" }}>{group.storage}</TableCell>

                {/* 최저가 */}
                <TableCell sx={{ minWidth: "120px" }}>{group.minPrice?.toLocaleString() || "-"}</TableCell>

                {/* 판매가 */}
                <TableCell sx={{ minWidth: "120px" }}>
                    <TextField
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        sx={{ width: "140px" }}
                        size="small"
                        placeholder="천원 단위로만 입력해 주세요"
                    />
                </TableCell>

                {/* 추천가 */}
                <TableCell>{group.productSuggestPrice?.toLocaleString() || "-"}</TableCell>

                {/* 최종 수정 일시 */}
                <TableCell sx={{ fontSize: "13px" }}>
                    {group.updatedAt
                        ? dayjs(group.updatedAt).format("YYYY-MM-DD HH:mm:ss")
                        : "-"}
                </TableCell>

                {/* 저장/삭제 */}
                <TableCell>
                    <Grid container flexDirection="column" gap={0.5} alignItems="flex-end">
                        <Button
                            variant="contained"
                            size="small"
                            onClick={handleUpdate}
                        >
                            저장
                        </Button>
                        <Button
                            variant="outlined"
                            size="small"
                            onClick={handleOpenDeleteAlert}
                            sx={{
                                color: "#888",
                                borderColor: "#ccc",
                                fontWeight: 500,
                                fontSize: "13px",
                                padding: "4px 16px",
                                borderRadius: "6px",
                                width: "60px",
                                "&:hover": {
                                    borderColor: "#999",
                                    backgroundColor: "#f5f5f5",
                                },
                            }}
                        >
                            삭제
                        </Button>
                    </Grid>
                </TableCell>
            </TableRow>

            {/* 재고 현황 행 */}
            <TableRow>
                <TableCell
                    colSpan={totalColumns}
                    sx={{
                        borderBottom: "1px solid #e0e0e0",
                        paddingTop: 0,
                        paddingBottom: "12px",
                    }}
                >
                    <Grid container alignItems="center" flexWrap="wrap">
                        <span
                            style={{
                                fontSize: "14px",
                                color: "#888",
                                marginRight: "16px",
                                whiteSpace: "nowrap",
                            }}
                        >
                            재고 현황
                        </span>
                        {colorStocks.map((c, idx) => (
                            <Grid
                                key={c.productVarietyId}
                                container
                                alignItems="center"
                                sx={{
                                    width: "auto",
                                    marginRight: "12px",
                                    gap: "4px",
                                }}
                            >
                                <span style={{ fontSize: "14px", color: "#555" }}>
                                    {c.color}
                                </span>
                                <input
                                    value={c.productStock}
                                    onChange={(e) =>
                                        handleColorStockChange(idx, e.target.value)
                                    }
                                    style={{
                                        width: "30px",
                                        height: "24px",
                                        textAlign: "center",
                                        fontSize: "14px",
                                        border: "1px solid #ddd",
                                        borderRadius: "4px",
                                        outline: "none",
                                        background: "#fff",
                                        color: "#333",
                                    }}
                                />
                            </Grid>
                        ))}
                    </Grid>
                </TableCell>
            </TableRow>
        </>
    );
};

export default StockItem;
