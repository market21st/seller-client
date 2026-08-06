export const STOCK_TABLE_HEAD_CELLS = [
  "",
  "용량",
  "최저가",
  "판매가",
  "추천가",
  "최종 수정 일시",
  "",
];

// countKey: 탭별 카운트 응답(getStockCountApi)에서 참조하는 필드명
export const STOCK_TAB_ITEMS = [
  { label: "전체", value: 0, countKey: "all" },
  { label: "최저가 상품", value: 1, countKey: "minPrice" },
  { label: "최저가 아닌 상품", value: 2, countKey: "notMinPrice" },
  { label: "재고 등록 대기", value: 3, countKey: "pending" },
];

export const GRADE_LABEL = { 0: "B급", 1: "A급", 2: "S급" };

export const STOCK_GRADE_COLORS = {
  0: "#F3F4F6", // B급
  1: "#E8F5E9", // A급
  2: "#EFF3FE", // S급
};
