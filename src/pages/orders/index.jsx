import React, {useEffect, useState} from "react";
import styled from "styled-components";
import {useLocation, useNavigate} from "react-router-dom";
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
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {DatePicker} from "@mui/x-date-pickers/DatePicker";
import "dayjs/locale/ko";
import dayjs from "dayjs";
import StatusUpdateModal from "../../components/orders/StatusUpdateModal";
import toast from "react-hot-toast";
import {getExcel, getExcels} from "../../api/excel";
import {getOrder} from "../../api/orders";
import {getStatusToBeGroup, OrderDeliveryCorp, OrderStatus} from "../../constants/orders";

const take = 10;

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

export const statusBgColor = (value) =>
    value === 100
        ? "success"
        : value === 110 || value === 140
            ? "error"
            : "default";

const statusKeys = [100, 110, 120, 130, 140, 150, 160, 200, 990];

const statusList = Object.entries(OrderStatus).map(([value, key]) => ({
    key,
    value: Number(value),
}));

const getGradeLabel = (grade) => {
    const gradeMap = {
        0: "S급",
        1: "A급",
        2: "B급",
    };
    return gradeMap[grade] || `${grade}급`;
};

const getGradeLabel2 = (grade) => {
    const gradeMap = {
        0: "S",
        1: "A",
        2: "B",
    };
    return gradeMap[grade] || `${grade}급`;
};

export const getDeliveryCorpName = (code) => {
    const entry = Object.entries(OrderDeliveryCorp).find(([, value]) => value === code);
    return entry ? entry[0] : code;
};

const OrderListPage = () => {
    const today = dayjs().set("hour", 0).set("minute", 0).set("second", 0);
    const navigator = useNavigate();
    const location = useLocation();
    const params = new URLSearchParams(location.search);

    const [isCheckAllStatus, setCheckAllStatus] = useState(!params.get("status"));
    //const [statusList, setStatusList] = useState([]);
    const [list, setList] = useState([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);

    const [startDate, setStartDate] = useState(today.add(-1, "M"));
    const [endDate, setEndDate] = useState(today);
    const [merchantUid, setMerchantUid] = useState("");
    const [productName, setProductName] = useState("");
    const [status, setStatus] = useState(
        params.get("status") ? [Number(params.get("status"))] : [...statusKeys]
    );

    const [isOpenStatusUpdateModal, setIsOpenStatusUpdateModal] = useState(false);
    const [item, setItem] = useState({});

    const rowCells = (row) => [
        `${row.productName}\n${row.productColor}/${row.productStorage}/${getGradeLabel(row.productGrade)}`,
        getGradeLabel2(row.productGrade),
        row.orderUid,
        dayjs(row.createdAt).format("YYYY.MM.DD HH:mm:ss"),
        <div onClick={(e) => e.stopPropagation()}>
            <Chip
                label={OrderStatus[row.status]}
                color={statusBgColor(row.status)}
                onClick={() => handleClickChip(row)}
            />
        </div>,
        `${row.price ? Number(row.price).toLocaleString() : 0}원`,
        row.fee,
        `${
            row.deliveryCompany
                ? `${getDeliveryCorpName(row.deliveryCompany)} | ${row.trackingNumber}`
                : "-"
        }`,
    ];

    const handleSearch = () => {
        getList();
    };
    const handleClickInit = () => {
        window.location.reload();
    };
    const handleClickRow = (id) => {
        navigator(`/orders/item/${id}`);
    };

    const handleChangePage = (value) => {
        setPage(value);
        getList(value);
    };

    const handleCheckAllStatus = () => {
        if (isCheckAllStatus) setStatus([]);
        else setStatus([...statusList.map((v) => v.value)]);

        setCheckAllStatus(!isCheckAllStatus);
    };
    const handleCheckStauts = (value) => {
        if (status.indexOf(value) === -1) setStatus([...status, value]);
        else setStatus([...status.filter((v) => v !== value)]);
    };

    const handleOpenStatusUpdateModal = () => {
        setIsOpenStatusUpdateModal(true);
    };
    const handleCloseStatusUpdateModal = () => {
        setIsOpenStatusUpdateModal(false);
    };

    const handleClickChip = (item) => {
        const status = item.status;
        if (status === 120 || status === 130) {
            toast.success("담당자가 주문 처리상태 확인중이에요.", {
                duration: 4000,
                style: {
                    marginTop: "20px",
                },
            });
            return;
        } else if (status === 150) {
            toast.success(
                "담당자가 주문 처리상태 확인중이에요.\n[출고불가신청]을 철회하고 싶으면 21세기전파상 담당자에게 연락해 주세요.",
                {
                    duration: 4000,
                    style: {
                        marginTop: "20px",
                    },
                }
            );
            return;
        } else if (status === 160) {
            toast.success(
                "담당자가 주문 처리상태 확인중이에요.\n[출고불가확정] 처리된 주문은 되돌릴 수 없어요.",
                {
                    duration: 4000,
                    style: {
                        marginTop: "20px",
                    },
                }
            );
            return;
        } else if (status === 200) {
            toast.success("매입확정으로 처리가 완료된 주문 입니다.", {
                duration: 4000,
                style: {
                    marginTop: "20px",
                },
            });
            return;
        } else if (status === 990) {
            toast.success("주문취소로 처리가 완료된 주문 입니다.", {
                duration: 4000,
                style: {
                    marginTop: "20px",
                },
            });
            return;
        }
        setItem(item);
        handleOpenStatusUpdateModal();
    };

    const handleClickDownloadExcel = async () => {
        await getExcels("/partner/orders/download", "orders", {
            statuses : status,
            startDate: startDate.format("YYYY-MM-DD"),
            endDate : endDate.format("YYYY-MM-DD"),
            orderUid : merchantUid,
            productName : productName,
        });
    };

    /*const getStatusList = async () => {
        const {response} = await getState();
        if (response && response.content) {
            setStatusList(response.content);
        }
    };*/
    const getList = async (pageValue) => {
        const page = pageValue -1|| 0;
        const searchData = {
            limit : take,
            page: page,
            statuses : status,
            startDate: startDate.format("YYYY-MM-DD"),
            endDate : endDate.format("YYYY-MM-DD"),
            orderUid : merchantUid,
            productName : productName,
        };
        const response = await getOrder(searchData);
        if (response && response.content) {
            setTotal(response.totalElements);
            setList(response.content);
            //setPage(page);
        }
    };

    useEffect(() => {
        //getStatusList();
        getList();
    }, []);
    useEffect(() => {
        if (!statusList.length) return;
        if (status.length === statusList.length) setCheckAllStatus(true);
        else setCheckAllStatus(false);
    }, [status, statusList]);

    return (
        <>
            <StatusUpdateModal
                open={isOpenStatusUpdateModal}
                onClose={handleCloseStatusUpdateModal}
                status={item.status}
                statusText={OrderStatus[item.status]}
                statusToBeGroup={getStatusToBeGroup(item.status)}
                lastInspectionFailComment={item.rejectReason}
                id={item.orderItemId}
                productName={item.productName}
                optionText={`${item.productColor}/${item.productStorage}/${getGradeLabel(item.productGrade)}`}
                reload={() => {
                    getList();
                }}
            />
            <TemplateWrap>
                <TemplateTitleWrap>
                    <h2>주문 출고 관리</h2>
                    <h3>모든 주문 내역을 조회할 수 있는 메뉴입니다.</h3>
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
                        <h4>주문 검색</h4>
                        <TemplateRow>
                            <p>처리상태</p>
                            <Grid container flexWrap={"wrap"}>
                                <FormControlLabel
                                    label={"전체"}
                                    control={
                                        <Checkbox
                                            checked={isCheckAllStatus}
                                            onChange={handleCheckAllStatus}
                                        />
                                    }
                                />
                                {statusList.map(({key, value}) => (
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
                        </TemplateRow>
                        <TemplateRow>
                            <p>조회기간 (주문일)</p>
                            <LocalizationProvider
                                dateAdapter={AdapterDayjs}
                                adapterLocale="ko"
                            >
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
                        </TemplateRow>
                        <TemplateRow>
                            <p>상세조건</p>
                            <TextField
                                label="주문번호"
                                value={merchantUid}
                                onChange={(e) => setMerchantUid(e.target.value)}
                                sx={{width: "300px"}}
                            />
                            <TextField
                                label="상품명"
                                placeholder="갤럭시"
                                value={productName}
                                onChange={(e) => setProductName(e.target.value)}
                                sx={{width: "300px"}}
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
                    <Grid container justifyContent={"space-between"}>
                        <h4>전체 주문 검색 목록 ({total}건)</h4>
                        <Button
                            variant="contained"
                            color="excel"
                            onClick={handleClickDownloadExcel}
                        >
                            엑셀 다운로드
                        </Button>
                    </Grid>
                    <Table>
                        <TableHead>
                            <TableRow>
                                {TABLE_HEAD_CELLS.map((v) => (
                                    <TableCell key={`head_cell_${v}`}>{v}</TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {list.length ? (
                                list?.map((row) => (
                                    <TableRow
                                        key={`row_${row.orderItemId}`}
                                        sx={{
                                            "&:last-child td, &:last-child th": {border: 0},
                                            "&:hover": {
                                                background: "#F2F8FF",
                                            },
                                            cursor: "pointer",
                                        }}
                                        onClick={() => handleClickRow(row.orderItemId)}
                                    >
                                        {rowCells(row).map((v, idx) => (
                                            <TableCell
                                                key={`row_cell_${idx}`}
                                                sx={{whiteSpace: "pre-wrap"}}
                                            >
                                                {v}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell>주문건이 없습니다.</TableCell>
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
export default OrderListPage;

export const TemplateWrap = styled.div`
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
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
`;

export const TemplateTitleWrap = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
`;

export const TemplateBox = styled.div`
    background: #fff;
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 16px;
    border-radius: 10px;
    border: 1px solid #cfd4f0;
`;

export const TemplateButtonWrap = styled.div`
    padding-top: 20px;
    display: flex;
    gap: 16px;
    border-top: 1px solid var(--BlueGray-100, #e4e9f5);
`;

export const TemplateRow = styled.div`
    display: flex;
    align-items: center;
    gap: 16px;
    font-size: 14px;
    padding: 6px 0;

    & > p {
        display: flex;
        flex-direction: column;
        gap: 8px;
        min-width: 200px;
        font-weight: 500;

        & > span {
            color: #8e9ebf;
            font-size: 11px;
            font-weight: 400;
        }
    }
`;
