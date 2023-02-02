const orderColumns = [
  {
    field: "merchantUid",
    headerName: "주문번호",
    width: 150,
    align: "center",
    type: "merchantUid",
  },
  {
    field: "createdAt",
    headerName: "주문일시",
    width: 180,
    align: "center",
    type: "createdAt",
  },
  {
    field: "uid",
    headerName: "주문자",
    width: 80,
    align: "center",
    type: "uid",
  },
  {
    field: "phone",
    headerName: "전화번호",
    width: 150,
    align: "center",
    type: "orderer.phone",
  },
  {
    field: "productName",
    headerName: "상품명",
    width: 280,
    align: "left",
    renderCell: ({ row }) => {
      return (
        <div>
          {row?.productName}
          <br />
          {row?.productOption}
        </div>
      );
    },
  },
  {
    field: "productGrade",
    headerName: "등급",
    width: 80,
    align: "center",
  },
  {
    field: "productPrice",
    headerName: "판매가",
    width: 100,
    align: "center",
    type: "productOption.price",
  },
  {
    field: "status",
    headerName: "주문상태",
    width: 120,
    align: "center",
  },
  {
    field: "new",
    headerName: "신규주문",
    width: 100,
    align: "center",
  },
];

export default orderColumns;
