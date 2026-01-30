export const OrderStatus: Record<number, string> = {
    100: "신규주문",
    110: "출고대기",
    120: "출고완료",
    130: "검수중",
    140: "검수미통과",
    150: "출고불가신청",
    160: "출고불가확정",
    200: "매입확정",
    990: "주문취소",
};

export const getDisplayStatus = (status) => {
    return OrderStatus[status] ? status : 200;
};

const statusToBeGroupMap = {
    100: [{ key: "출고대기", value: 110 }, { key: "출고불가신청", value: 150 }],
    110: [{ key: "출고완료", value: 120 }],
    140: [{ key: "출고대기", value: 110 }, { key: "출고불가신청", value: 150 }],
};

export const getStatusToBeGroup = (status) => {
    return statusToBeGroupMap[status] || [];
};

export const OrderDeliveryCorp = {
    "우체국": "01",
    "CJ대한통운": "04",
    "한진택배": "05",
    "로젠택배": "06",
    "롯데택배": "08",
    "GSPostbox택배": "24",
    "CU편의점택배": "46",
};

export const deliveryCorpList = Object.entries(OrderDeliveryCorp).map(([key, value]) => ({
    key,
    value,
}));