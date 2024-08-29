export const STOCK_TABLE_HEAD_CELLS = [
  "섬네일",
  "상품명/옵션",
  "등급",
  "최저가",
  "판매가",
  "재고",
  "판매가 수정 일시",
  "",
];

export const STOCK_TAB_ITEMS = [
  { label: "전체", value: "ALL" },
  { label: "최저가 상품", value: 1 },
  { label: "최저가 아닌 상품", value: 2 },
  { label: "재고 등록 대기", value: 3 },
];

export const STOCK_ORDER_BY_OPTIONS = [
  { name: "가나다 순", value: 1 },
  { name: "판매가 최종 수정 일시 순", value: 2 },
];

export const STOCK_TAKE_OPTIONS = [
  { name: "10개씩 보기", value: 10 },
  { name: "20개씩 보기", value: 20 },
  { name: "30개씩 보기", value: 30 },
];
