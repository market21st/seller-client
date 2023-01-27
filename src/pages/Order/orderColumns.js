const orderColumns = [
  {
    field: "merchantUid",
    headerName: "주문번호",
    width: 150,
    type: "merchantUid",
  },
  {
    field: "createdAt",
    headerName: "주문일시",
    width: 180,
    type: "createdAt",
  },
  {
    field: "uid",
    headerName: "주문자",
    width: 100,
    type: "uid",
  },
  {
    field: "phone",
    headerName: "전화번호",
    width: 150,
    type: "orderer.phone",
  },
  {
    field: "productName",
    headerName: "상품명",
    width: 200,
  },
  // {
  //   field: "productGrade",
  //   headerName: "등급",
  //   width: 80,
  // },
  {
    field: "productPrice",
    headerName: "판매가",
    width: 100,
    type: "productOption.price",
  },
  {
    field: "status",
    headerName: "주문상태",
    width: 100,
  },
  {
    field: "new",
    headerName: "신규주문",
    width: 100,
  },
];

export default orderColumns;
