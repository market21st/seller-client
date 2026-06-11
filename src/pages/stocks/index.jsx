import React, { useEffect, useState } from "react";
import {
    Grid,
    Pagination,
    Button,
    Checkbox,
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
import toast from "react-hot-toast";
import { deleteProductVariety } from "../../api/stocks";
import AlertModal from "../../components/common/AlertModal";
import { getCategoryListApi, getStockList } from "../../api/stocks";
import GradeModal from "../../components/stock/GradeModal";
import {
    TemplateBox,
    TemplateButtonWrap,
    TemplateRow,
    TemplateTitleWrap,
    TemplateWrap,
} from "../order";
import StockItem from "../../components/stocks/StockItem";
import {
    STOCK_ORDER_BY_OPTIONS,
    STOCK_TAB_ITEMS,
    STOCK_TABLE_HEAD_CELLS,
    STOCK_TAKE_OPTIONS,
} from "../../constants/stocks";
import { groupStocksByProduct } from "../../utils/groupStocks";

const GRADE_LABEL = { 0: "B급", 1: "A급", 2: "S급" };

const StockListPage = () => {
    const [gradeModal, setGradeModal] = useState(false);

    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [list, setList] = useState([]);

    const [category, setCategory] = useState({ 1: {}, 2: {}, 3: {} });
    const [categoryList, setCategoryList] = useState({ 1: [], 2: [], 3: [] });

    const [take, setTake] = useState(10);
    const [categoryId, setCategoryId] = useState(0);
    const [subcategoryId, setSubcategoryId] = useState(0);
    const [productId, setProductId] = useState(0);
    const [optionText, setOptionText] = useState("");
    const [type, setType] = useState(0);
    const [orderBy, setOrderBy] = useState(1);
    const [selectedKeys, setSelectedKeys] = useState(new Set());
    const [bulkDeleteAlert, setBulkDeleteAlert] = useState(false);

    // 모든 그룹의 groupKey 목록
    const allGroupKeys = list.flatMap((g) => g.items.map((item) => item.groupKey));

    const isAllChecked = allGroupKeys.length > 0 && allGroupKeys.every((key) => selectedKeys.has(key));

    const handleCheckItem = (groupKey, checked) => {
        setSelectedKeys((prev) => {
            const next = new Set(prev);
            if (checked) {
                next.add(groupKey);
            } else {
                next.delete(groupKey);
            }
            return next;
        });
    };

    const handleCheckAll = (checked) => {
        if (checked) {
            setSelectedKeys(new Set(allGroupKeys));
        } else {
            setSelectedKeys(new Set());
        }
    };

    const handleBulkDelete = async () => {
        // 선택된 그룹들의 모든 productVarietyId 수집
        const varietyIds = [];
        list.forEach((gradeGroup) => {
            gradeGroup.items.forEach((group) => {
                if (selectedKeys.has(group.groupKey)) {
                    group.colors.forEach((c) => {
                        varietyIds.push(c.productVarietyId);
                    });
                }
            });
        });

        try {
            for (const id of varietyIds) {
                await deleteProductVariety(id);
            }
            setBulkDeleteAlert(false);
            setSelectedKeys(new Set());
            toast.success(`${selectedKeys.size}개 상품이 삭제되었습니다.`, {
                duration: 4000,
                style: { marginTop: "20px" },
            });
            getList({ page });
        } catch {
            toast.error("삭제에 실패했습니다.");
        }
    };

    const handleOpenGradeModal = () => {
        setGradeModal(true);
    };
    const handleCloseGradeModal = () => {
        setGradeModal(false);
    };

    const handleChange1depthCategory = (v) => {
        setCategoryId(v.id);

        setCategory({ 1: v, 2: {}, 3: {} });
        setCategoryList({ ...categoryList, 2: v.children, 3: [] });

        setSubcategoryId(null);
        setProductId(null);
    };
    const handleChange2depthCategory = (v) => {
        setSubcategoryId(v.id);

        setCategory({ ...category, 2: v, 3: {} });
        setCategoryList({ ...categoryList, 3: v.children });
        setProductId(null);
    };
    const handleChange3depthCategory = (v) => {
        setProductId(v.id);
        setCategory({ ...category, 3: v });
    };

    const categoryFilter = [
        {
            label: "1차 분류",
            value: category[1],
            onChange: handleChange1depthCategory,
            list: categoryList[1],
        },
        {
            label: "2차 분류",
            value: category[2],
            onChange: handleChange2depthCategory,
            list: categoryList[2],
        },
        {
            label: "3차 분류",
            value: category[3],
            onChange: handleChange3depthCategory,
            list: categoryList[3],
        },
    ];

    const handleSearch = () => {
        getList({ type: 0 });
    };
    const handleClickInit = () => {
        window.location.reload();
    };
    const handleChangePage = (value) => {
        setPage(value);
        getList({ page: value });
    };

    const getCategoryList = async () => {
        const response = await getCategoryListApi();
        if (response && response.content) {
            setCategoryList({ 1: response.content, 2: [], 3: [] });
        }
    };
    const getList = async (query) => {
        const partnerId = localStorage.getItem("id");
        const pageQuery = query?.page ? query.page  - 1: 0;
        const typeQuery = query?.type || type;
        const searchData = {
            page: pageQuery,
            limit: take,
            partnerId: partnerId || 0,
            categoryId: categoryId || null,
            subcategoryId: subcategoryId || null,
            productId: productId || null,
            productName: optionText ? optionText : null,
            orderBy: orderBy,
            type: typeQuery,
            productSort: null,
        };
        const response = await getStockList(searchData);
        if (response && response.content) {
            setTotal(response.totalElements);
            const grouped = groupStocksByProduct(response.content);
            setList(grouped);
            //setPage(pageQuery);
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
            <AlertModal
                open={bulkDeleteAlert}
                text={`선택한 ${selectedKeys.size}개 상품을 삭제하시겠어요?`}
                onClose={() => setBulkDeleteAlert(false)}
                onConfirm={handleBulkDelete}
            />
            <GradeModal isOpen={gradeModal} onClose={handleCloseGradeModal} />
            <TemplateWrap>
                <Grid container justifyContent={"space-between"} alignItems={"end"}>
                    <TemplateTitleWrap>
                        <h2>판매 상품 관리</h2>
                        <h3>판매되고 있는 상품을 조회하고 수정할 수 있습니다.</h3>
                    </TemplateTitleWrap>
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
                        <Grid display={"inline-flex"} gap={1} alignItems="center">
                            <Button
                                variant="contained"
                                size="small"
                                disabled={selectedKeys.size === 0}
                                onClick={() => setBulkDeleteAlert(true)}
                                sx={{
                                    backgroundColor: selectedKeys.size > 0 ? "#0082FF" : undefined,
                                    color: selectedKeys.size > 0 ? "#fff" : undefined,
                                    fontWeight: 600,
                                    fontSize: "13px",
                                    padding: "6px 20px",
                                    borderRadius: "6px",
                                    boxShadow: "none",
                                    "&:hover": {
                                        backgroundColor: selectedKeys.size > 0 ? "#006AD6" : undefined,
                                        boxShadow: "none",
                                    },
                                    "&.Mui-disabled": {
                                        backgroundColor: "#e0e0e0",
                                        color: "#aaa",
                                    },
                                }}
                            >
                                선택 삭제{selectedKeys.size > 0 ? ` (${selectedKeys.size})` : ""}
                            </Button>
                            <Select
                                value={orderBy}
                                onChange={(v) => setOrderBy(v.target.value)}
                                size="small"
                                sx={{ width: "220px" }}
                            >
                                {STOCK_ORDER_BY_OPTIONS.map((v) => (
                                    <MenuItem
                                        key={v.value}
                                        value={v.value}
                                        sx={{ justifyContent: "end" }}
                                    >
                                        {v.name}
                                    </MenuItem>
                                ))}
                            </Select>
                            <Select
                                value={take}
                                onChange={(v) => setTake(v.target.value)}
                                size="small"
                                sx={{ width: "220px" }}
                            >
                                {STOCK_TAKE_OPTIONS.map((v) => (
                                    <MenuItem
                                        key={v.value}
                                        value={v.value}
                                        sx={{ justifyContent: "end" }}
                                    >
                                        {v.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </Grid>
                    </Grid>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell padding="checkbox">
                                    <Checkbox
                                        checked={isAllChecked}
                                        indeterminate={selectedKeys.size > 0 && !isAllChecked}
                                        onChange={(e) => handleCheckAll(e.target.checked)}
                                        size="small"
                                        sx={{
                                            color: "#bbb",
                                            "&.Mui-checked": { color: "#0082FF" },
                                            "&.MuiCheckbox-indeterminate": { color: "#0082FF" },
                                        }}
                                    />
                                </TableCell>
                                {STOCK_TABLE_HEAD_CELLS.map((v) => (
                                    <TableCell key={v}>{v}</TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {list.length ? (
                                list.map((gradeGroup) => (
                                    <React.Fragment key={gradeGroup.grade}>
                                        {gradeGroup.items.map((group, idx) => (
                                            <React.Fragment key={group.groupKey}>
                                                {/* 상품명 + 등급 섹션 헤더 (같은 등급 내 상품명이 바뀔 때마다 표시) */}
                                                {(idx === 0 || gradeGroup.items[idx - 1].productName !== group.productName) && (
                                                    <TableRow>
                                                        <TableCell
                                                            colSpan={STOCK_TABLE_HEAD_CELLS.length + 1}
                                                            sx={{
                                                                fontWeight: 700,
                                                                fontSize: "15px",
                                                                backgroundColor: "#f9f9f9",
                                                                borderBottom: "2px solid #ddd",
                                                                padding: "12px 10px",
                                                            }}
                                                        >
                                                            {group.productName}&nbsp;&nbsp;/&nbsp;&nbsp;{GRADE_LABEL[gradeGroup.grade] || `${gradeGroup.grade}급`}
                                                        </TableCell>
                                                    </TableRow>
                                                )}
                                                <StockItem
                                                    group={group}
                                                    getList={() => getList({ page })}
                                                    checked={selectedKeys.has(group.groupKey)}
                                                    onCheck={handleCheckItem}
                                                />
                                            </React.Fragment>
                                        ))}
                                    </React.Fragment>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={STOCK_TABLE_HEAD_CELLS.length + 1}>
                                        판매 상품이 없습니다.
                                    </TableCell>
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
