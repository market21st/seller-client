import React, { useEffect, useMemo, useState } from "react";
import {
    Grid,
    Button,
    // Checkbox, // 선택 삭제 기능과 함께 주석 처리 (아래 6번 항목 참고)
    Tabs,
    Tab,
} from "@mui/material";
import styled from "styled-components";
// import toast from "react-hot-toast"; // 선택 삭제 기능과 함께 주석 처리
// import { deleteProductVariety } from "../../api/stocks"; // 선택 삭제 기능과 함께 주석 처리
// import AlertModal from "../../components/common/AlertModal"; // 선택 삭제 확인 모달 - 주석 처리
import { getCategoryListApi, getStockListGrouped, getStockListAll } from "../../api/stocks";
import GradeModal from "../../components/stock/GradeModal";
import { TemplateTitleWrap, TemplateWrap } from "../order";
import CategoryNav from "../../components/stocks/CategoryNav";
import ProductCard from "../../components/stocks/ProductCard";
import { STOCK_TAB_ITEMS } from "../../constants/stocks";

// 가나다순 정렬 UI는 제거되었지만 검색 API는 orderBy 파라미터를 요구하므로 기본값을 고정 전송한다
const DEFAULT_ORDER_BY = 1;

// 재고 목록은 페이징이 필요 없어 한 번에 모두 조회한다
const NO_PAGING_LIMIT = 1000;

const StockListPage = () => {
    const [gradeModal, setGradeModal] = useState(false);

    const [list, setList] = useState([]);
    console.log(list);
    const [tabCounts, setTabCounts] = useState({});
    // 파트너사가 등록해둔 전체 상품 목록 - 1차/2차 분류별 재고 집계에 사용 (getStockListAll)
    const [allStockList, setAllStockList] = useState([]);

    // 3차 분류(productId)는 제거 - 2차 분류(모델)가 곧 상품 단위
    const [category, setCategory] = useState({ 1: {}, 2: {} });
    const [categoryList, setCategoryList] = useState({ 1: [], 2: [] });

    const [type, setType] = useState(0);
    // 시리즈와 모델을 모두 선택하기 전까지는 재고 목록을 조회하지 않는다
    const [hasSearched, setHasSearched] = useState(false);

    // ----- 선택 삭제(체크박스 다중 선택 후 일괄 삭제) 기능 - 주석 처리 -----
    // const [selectedKeys, setSelectedKeys] = useState(new Set());
    // const [bulkDeleteAlert, setBulkDeleteAlert] = useState(false);
    // const allGroupKeys = list.map((section) => getGroupKey(section));
    // const isAllChecked = allGroupKeys.length > 0 && allGroupKeys.every((key) => selectedKeys.has(key));
    // const handleCheckItem = (groupKey, checked) => {
    //     setSelectedKeys((prev) => {
    //         const next = new Set(prev);
    //         if (checked) {
    //             next.add(groupKey);
    //         } else {
    //             next.delete(groupKey);
    //         }
    //         return next;
    //     });
    // };
    // const handleCheckAll = (checked) => {
    //     if (checked) {
    //         setSelectedKeys(new Set(allGroupKeys));
    //     } else {
    //         setSelectedKeys(new Set());
    //     }
    // };
    // const handleBulkDelete = async () => {
    //     const varietyIds = [];
    //     list.forEach((section) => {
    //         if (selectedKeys.has(getGroupKey(section))) {
    //             section.varieties.forEach((v) => {
    //                 varietyIds.push(v.productVarietyId);
    //             });
    //         }
    //     });
    //     try {
    //         for (const id of varietyIds) {
    //             await deleteProductVariety(id);
    //         }
    //         setBulkDeleteAlert(false);
    //         setSelectedKeys(new Set());
    //         toast.success(`${selectedKeys.size}개 상품이 삭제되었습니다.`, {
    //             duration: 4000,
    //             style: { marginTop: "20px" },
    //         });
    //         getList({ page });
    //     } catch {
    //         toast.error("삭제에 실패했습니다.");
    //     }
    // };
    // ----- 선택 삭제 기능 끝 -----

    // groupKey 생성 헬퍼
    const getGroupKey = (section) =>
        section.groupKey || `${section.productName}_${section.storage}_${section.grade}`;

    // 모델명(productName) -> 시리즈 id 역참조 맵
    // getStockListAll 응답 항목엔 productId가 없고 productName만 있어 이름으로 매칭한다.
    // categoryList[1]의 각 시리즈 노드는 /category 응답의 children(모델 목록)을 그대로 갖고 있다
    const seriesIdByProductName = useMemo(() => {
        const map = {};
        categoryList[1].forEach((series) => {
            (series.children || []).forEach((model) => {
                map[model.name] = series.id;
            });
        });
        return map;
    }, [categoryList]);

    // 1차 분류(시리즈)별 재고 합계 - 파트너사 전체 상품(allStockList)을 시리즈 단위로 집계
    // allStockList의 각 항목은 색상 하나(variety)당 한 행이며 productStock을 직접 갖고 있다
    const firstDepthStockCounts = useMemo(() => {
        const map = {};
        allStockList.forEach((item) => {
            const seriesId = seriesIdByProductName[item.productName];
            if (seriesId === undefined) return;
            map[seriesId] = (map[seriesId] || 0) + Number(item.productStock || 0);
        });
        return map;
    }, [allStockList, seriesIdByProductName]);

    // 2차 분류(모델)별 재고 합계 - 파트너사 전체 상품(allStockList)을 모델명 단위로 집계
    const secondDepthStockCounts = useMemo(() => {
        const map = {};
        allStockList.forEach((item) => {
            map[item.productName] = (map[item.productName] || 0) + Number(item.productStock || 0);
        });
        return map;
    }, [allStockList]);

    // 모델(2차 분류)까지 선택해야만 조회되므로 list는 항상 하나의 상품에 대한 등급/용량 행들이다
    const sections = useMemo(
        () => list.map((section) => ({ ...section, groupKey: getGroupKey(section) })),
        [list]
    );

    const handleOpenGradeModal = () => {
        setGradeModal(true);
    };
    const handleCloseGradeModal = () => {
        setGradeModal(false);
    };

    // 실제 검색 API(getStockListGrouped)는 categoryId=브랜드(depth1), subcategoryId=시리즈(depth2)로
    // 스코프가 고정되어 있음을 실제 dev API 호출로 확인함(depth2 id를 categoryId로 보내면 필터가 깨져
    // 0건이 나옴). 따라서 "1차 분류(시리즈)" 선택 시에는 시리즈 자신의 id를 subcategoryId로,
    // 그 시리즈의 상위 브랜드 id(brandId)를 categoryId로 함께 보낸다.
    // "2차 분류(모델)"는 depth3이라 전용 필터 파라미터가 검증되지 않아, 기존 productId 파라미터를
    // (UI상 3차 드롭다운은 없앴지만) 내부적으로 계속 사용한다.
    const handleChange1depthCategory = (v) => {
        setCategory({ 1: v, 2: {} });
        setCategoryList((prev) => ({ ...prev, 2: v.children || [] }));
        getList({ type: 0, categoryId: v.brandId ?? null, subcategoryId: v.id, productId: null });
    };
    const handleChange2depthCategory = (v) => {
        setCategory((prev) => ({ ...prev, 2: v }));
        getList({
            type: 0,
            categoryId: category[1]?.brandId ?? null,
            subcategoryId: category[1]?.id ?? null,
            productId: v.id,
        });
    };

    const getCategoryList = async () => {
        const response = await getCategoryListApi();
        if (response && response.content) {
            // /category는 브랜드(depth1) > 시리즈(depth2) > 모델(depth3) 3단 구조로 내려온다.
            // "1차 분류(시리즈)"는 모든 브랜드의 depth2 노드를 평탄화한 목록이고,
            // "2차 분류(모델)"는 선택된 시리즈(depth2)의 children(depth3)이다.
            // brandId를 함께 보관 - 검색 API의 categoryId(브랜드 스코프) 파라미터를 채우기 위함
            const seriesList = response.content.flatMap((brand) =>
                (brand.children || []).map((series) => ({ ...series, brandId: brand.id }))
            );
            setCategoryList({ 1: seriesList, 2: [] });
        }
    };

    // 파트너사가 등록해둔 전체 상품 - 1차/2차 분류별 재고 합계 및 탭 카운트를 계산하는 데 사용한다.
    // 응답: { totalCount, lowestPriceCount, notLowestPriceCount, pendingStockCount,
    //         content: [{ productName, storage, grade, color, productVarietyId, productStock, ... }] }
    // content는 색상(variety) 하나당 한 행이며 productId는 내려오지 않는다.
    const getAllStockList = async () => {
        const partnerId = localStorage.getItem("id");
        const response = await getStockListAll({ partnerId: partnerId || 0 });
        if (response) {
            setAllStockList(response.content || []);
            setTabCounts({
                all: response.totalCount ?? 0,
                minPrice: response.lowestPriceCount ?? 0,
                notMinPrice: response.notLowestPriceCount ?? 0,
                pending: response.pendingStockCount ?? 0,
            });
        }
    };

    const getList = async (query) => {
        const partnerId = localStorage.getItem("id");
        const typeQuery = query?.type ?? type;
        const categoryIdQuery = query?.categoryId !== undefined ? query.categoryId : category[1]?.brandId ?? null;
        const subcategoryIdQuery = query?.subcategoryId !== undefined ? query.subcategoryId : category[1]?.id ?? null;
        const productIdQuery = query?.productId !== undefined ? query.productId : category[2]?.id ?? null;

        // 시리즈만 선택하고 모델을 아직 선택하지 않았거나, 둘 다 선택하지 않은 상태라면 재고 목록을 조회하지 않는다.
        // 모델(productId)까지 선택했을 때만 조회한다.
        if (!productIdQuery) {
            setList([]);
            setHasSearched(false);
            return;
        }
        setHasSearched(true);

        // 탭 값: 전체(0)는 type과 상관없이 전부 보여줘야 하므로 필터를 보내지 않는다(null).
        // 최저가 상품(1)/최저가 아닌 상품(2)/재고등록 대기(3)만 그 값 그대로 type으로 전달한다.
        const typeFilter = typeQuery === 0 ? null : typeQuery;

        // 재고는 페이징이 필요 없어 한 번에 모두 조회한다
        const searchData = {
            page: 0,
            limit: NO_PAGING_LIMIT,
            partnerId: partnerId || 0,
            orderBy: DEFAULT_ORDER_BY,
            type: typeFilter,
            categoryId: categoryIdQuery,
            subcategoryId: subcategoryIdQuery,
            productId: productIdQuery,
        };
        const response = await getStockListGrouped(searchData);
        if (response && response.content) {
            setList(response.content);
            setType(typeQuery);
        }
    };

    // 상품 저장/삭제 후 현재 화면과 좌측 재고 집계를 함께 새로고침한다
    const refreshAfterEdit = async () => {
        await Promise.all([getList(), getAllStockList()]);
    };

    useEffect(() => {
        getCategoryList();
        getAllStockList();
    }, []);
    useEffect(() => {
        getList();
    }, [type]);

    return (
        <>
            {/* <AlertModal
                open={bulkDeleteAlert}
                text={`선택한 ${selectedKeys.size}개 상품을 삭제하시겠어요?`}
                onClose={() => setBulkDeleteAlert(false)}
                onConfirm={handleBulkDelete}
            /> */}
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
                <Tabs value={type} onChange={(e, v) => setType(v)}>
                    {STOCK_TAB_ITEMS.map((v) => (
                        <Tab
                            key={v.value}
                            label={`${v.label}(${tabCounts[v.countKey] ?? 0})`}
                            value={v.value}
                        />
                    ))}
                </Tabs>
                <MergedBox>
                    <CategoryNav
                        firstDepthList={categoryList[1]}
                        secondDepthList={categoryList[2]}
                        selectedFirstDepthId={category[1]?.id}
                        selectedSecondDepthId={category[2]?.id}
                        firstDepthStockCounts={firstDepthStockCounts}
                        secondDepthStockCounts={secondDepthStockCounts}
                        onSelectFirstDepth={handleChange1depthCategory}
                        onSelectSecondDepth={handleChange2depthCategory}
                    />
                    <ResultSection>
                        {sections.length ? (
                            <ProductCard sections={sections} getList={refreshAfterEdit} />
                        ) : (
                            <EmptyState>
                                {!hasSearched
                                    ? !category[1]?.id
                                        ? "시리즈와 모델을 선택해주세요."
                                        : "모델을 선택해주세요."
                                    : "판매 상품이 없습니다."}
                            </EmptyState>
                        )}
                    </ResultSection>
                </MergedBox>
            </TemplateWrap>
        </>
    );
};
export default StockListPage;

// 1차/2차 분류 목록과 결과 테이블을 하나의 박스로 합쳐서 보여준다
const MergedBox = styled.div`
    display: flex;
    align-items: stretch;
    background: #fff;
    border-radius: 10px;
    border: 1px solid #cfd4f0;
    overflow: hidden;
`;

const ResultSection = styled.div`
    flex: 1;
    min-width: 0;
    overflow-x: auto;
`;

const EmptyState = styled.div`
    padding: 60px 20px;
    text-align: center;
    color: #8e9ebf;
    font-size: 14px;
`;
