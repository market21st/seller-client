import React from "react";
import { Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import styled from "styled-components";
import StockItem from "./StockItem";
import { GRADE_LABEL, STOCK_GRADE_COLORS, STOCK_TABLE_HEAD_CELLS } from "../../constants/stocks";

// 선택된 모델(2차 분류) 하나에 대한 등급/용량별 재고 테이블.
// 상품명은 좌측 2차 분류 목록에서 이미 선택되어 있으므로 별도 헤더로 다시 보여주지 않는다.
const ProductCard = ({ sections, getList }) => {
    return (
        <TableScroll>
            <Table sx={{ minWidth: 680 }}>
                <TableHead>
                    <TableRow>
                        {STOCK_TABLE_HEAD_CELLS.map((v, idx) => (
                            <TableCell key={idx} sx={{ whiteSpace: "nowrap" }}>{v}</TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {sections.map((section, idx) => {
                        const showGradeDivider = idx === 0 || sections[idx - 1].grade !== section.grade;
                        return (
                            <React.Fragment key={section.groupKey}>
                                {showGradeDivider && (
                                    <TableRow>
                                        <TableCell
                                            colSpan={STOCK_TABLE_HEAD_CELLS.length}
                                            sx={{
                                                fontWeight: 700,
                                                fontSize: "14px",
                                                padding: "8px 16px",
                                                borderBottom: "none",
                                                backgroundColor: STOCK_GRADE_COLORS[section.grade],
                                            }}
                                        >
                                            {GRADE_LABEL[section.grade] || `${section.grade}급`}
                                        </TableCell>
                                    </TableRow>
                                )}
                                <StockItem group={section} getList={getList} />
                            </React.Fragment>
                        );
                    })}
                </TableBody>
            </Table>
        </TableScroll>
    );
};

export default ProductCard;

const TableScroll = styled.div`
    overflow-x: auto;
`;
