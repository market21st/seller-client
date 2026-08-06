import React from "react";
import styled from "styled-components";

const CategoryNav = ({
    firstDepthList,
    secondDepthList,
    selectedFirstDepthId,
    selectedSecondDepthId,
    firstDepthStockCounts,
    secondDepthStockCounts,
    onSelectFirstDepth,
    onSelectSecondDepth,
}) => {
    const firstDepthTotal = firstDepthList.reduce(
        (sum, item) => sum + (firstDepthStockCounts?.[item.id] ?? 0),
        0
    );
    const secondDepthTotal = secondDepthList.reduce(
        (sum, item) => sum + (secondDepthStockCounts?.[item.name] ?? 0),
        0
    );

    return (
        <NavWrap>
            <NavColumn>
                <NavColumnHeader>
                    <span>1차 분류 - 시리즈</span>
                    <span>재고 {firstDepthTotal}대</span>
                </NavColumnHeader>
                <NavList>
                    {firstDepthList.map((item) => (
                        <NavItem
                            key={item.id}
                            className={selectedFirstDepthId === item.id ? "active" : ""}
                            onClick={() => onSelectFirstDepth(item)}
                        >
                            <span>{item.name}</span>
                            <em>재고 {firstDepthStockCounts?.[item.id] ?? 0}대</em>
                        </NavItem>
                    ))}
                </NavList>
            </NavColumn>
            <NavColumn>
                <NavColumnHeader>
                    <span>2차 분류 - 모델</span>
                    <span>재고 {secondDepthTotal}대</span>
                </NavColumnHeader>
                <NavList>
                    {secondDepthList.map((item) => (
                        <NavItem
                            key={item.id}
                            className={selectedSecondDepthId === item.id ? "active" : ""}
                            onClick={() => onSelectSecondDepth(item)}
                        >
                            <span>{item.name}</span>
                            <em>재고 {secondDepthStockCounts?.[item.name] ?? 0}대</em>
                        </NavItem>
                    ))}
                </NavList>
            </NavColumn>
        </NavWrap>
    );
};

export default CategoryNav;

const NavWrap = styled.div`
    display: flex;
    width: 460px;
    min-width: 460px;
    border-right: 1px solid #e4e9f5;
`;

const NavColumn = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    min-width: 0;
    &:first-of-type {
        border-right: 1px solid #e4e9f5;
    }
`;

const NavColumnHeader = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 8px 16px 12px;
    font-size: 13px;
    font-weight: 700;
    color: #8e9ebf;
    border-bottom: 1px solid #e4e9f5;
`;

const NavList = styled.ul`
    flex: 1;
    overflow-y: auto;
    max-height: 560px;
`;

const NavItem = styled.li`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
    padding: 10px 16px;
    font-size: 14px;
    cursor: pointer;
    color: #333;

    span {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    em {
        font-style: normal;
        font-size: 12px;
        color: #8e9ebf;
        white-space: nowrap;
    }

    &:hover {
        background: #f2f8ff;
    }

    &.active {
        background: #f2f8ff;
        color: #0082ff;
        font-weight: 700;

        em {
            color: #0082ff;
        }
    }
`;
