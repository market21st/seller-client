import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

// Components
import AlertModal from "../../components/AlertModal";
import Paging from "../../components/Paging";
import orderColumns from "./orderColumns";

// Api
import { getOrder, getState } from "../../api/order";
import { TextField } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

// Mui
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

const gridBtm = {
  "& .MuiDataGrid-columnHeaderTitleContainer": {
    paddingLeft: "10px",
    justifyContent: "center",
  },
  "& .MuiDataGrid-cell": {
    paddingLeft: "20px",
    cursor: "pointer",
  },
  "& .MuiDataGrid-iconSeparator": {
    display: "none",
  },
  "& .MuiDataGrid-footerContainer": {
    display: "none",
  },
  "& .MuiDataGrid-columnHeaders": {
    borderTop: "5px solid #9BA3E3",
    borderBottom: "5px solid #9BA3E3",
  },
  "& .MuiDataGrid-virtualScroller": {
    height: "30vh !important",
    overflowY: "scroll !important",
  },
};

const Container = styled.div`
  width: 100%;
  height: 100%;
  padding: 50px 59px 0;
  h1 {
    font-size: 24px;
    font-weight: bold;
  }
  .area {
    width: 279px;
  }
  & .MuiOutlinedInput-notchedOutline {
    border: none !important;
  }
  a {
    display: block;
    padding: 10px 0 5px;
  }
  .scroll::-webkit-scrollbar {
    display: none;
  }
`;

const TopBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
`;

const SearchArea = styled.div`
  width: 100%;
  input {
    border-radius: 10px;
    padding: 10px 14px;
    font-weight: 800;
    box-sizing: border-box;
  }
  .orderNum {
    width: 36%;
  }
  .name {
    width: 60%;
  }
`;

const RowInner = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const TextInput = styled.div`
  width: 58%;
  display: flex;
  justify-content: space-between;
`;

const GridContainer = styled.div`
  height: 38vh;
  /* position: relative;
  width: 100%;
  height: 0;
  padding-bottom: 100%; */
`;

const DateBox = styled.div`
  width: 40%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const DateInput = styled.div`
  width: 47%;
  background: #fff;
  border-radius: 10px;
  padding: 10px 14px;
`;

const DateInputs = styled.div`
  width: 5%;
  text-align: center;
`;

const CheckList = styled.div`
  display: flex;
  align-items: center;
  span {
    margin-right: 20px;
  }
  label {
    padding-left: 12px;
  }
`;
const Area = styled.div`
  height: 110px;
  display: flex;
  justify-content: center;
  align-items: center;
  button {
    border-radius: 5px;
    color: #fff;
    padding: 12px 35px;
    background: #4552ce;
    font-weight: bold;
  }
`;

const InfoTitle = styled.h2`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  span {
    color: #d74b4b;
    padding: 0 4px;
  }
  div {
    border: 1.5px solid #404040;
    border-radius: 5px;
    background: #fff;
    padding: 12px 10px;
    font-size: 16px;
  }
`;

const FilterBtn = styled.div`
  display: flex;
  button {
    width: 118px;
    padding: 10px 15px;
    background: #fff;
    color: #000;
    font-weight: bold;
    border-radius: 5px;
  }
  button:last-child {
    color: #fff;
    background: #4552ce;
    margin-left: 15px;
  }
`;
const PagingBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const OrderList = () => {
  const navigator = useNavigate();

  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);
  const [statusList, setStatusList] = useState([]);

  const [page, setPage] = useState(1);
  const [pageBtn, setPageBtn] = useState(1);

  const handleChangess = async (event, value) => {
    setPageBtn(value);
    setPage(value);
  };

  // 기간
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const start = `${startDate?.$D}`;
  const end = `${endDate?.$D}`;
  const sday = startDate && start.length === 1 ? `0${start}` : start;
  const eday = endDate && end.length === 1 ? `0${end}` : end;

  // state
  const [listData, setListData] = useState([]);

  // 상태 목록 조회
  const getStateList = async () => {
    const { data, statusCode } = await getState();
    if (statusCode == 200) {
      setStatusList(data.results);
    }
  };

  const rowsData = listData?.map((e) => {
    return {
      id: e.id,
      merchantUid: e.merchantUid.split("-")[0],
      createdAt: `${e.createdAt.split("T")[0]} ${e.createdAt.substring(
        11,
        19
      )}`,
      uid: e.orderer.name,
      phone: e.orderer.phone,
      productName: e.productOption.name,
      productOption: e.productOption.optionText,
      productGrade:
        e.product.grade == "2" ? "S" : e.product.grade == "1" ? "A" : "B",
      productPrice: Number(e.productOption.price).toLocaleString(),
      status: e.statusText,
      new: e.isNew ? "신규주문" : "-",
    };
  });

  // Modal
  const [alertModal, setAlertModal] = useState(false);
  const [text, setText] = useState("");
  const aleatHandleClose = () => {
    setAlertModal(false);
    if (text.includes("저장")) {
      window.location.reload();
    }
  };

  // 변경하는 필터값
  const [userInfo, setUserInfo] = useState({
    productInfoId: "",
    optionText: "",
  });

  function onChange(e) {
    const { name, value } = e.target;
    setUserInfo({
      ...userInfo,
      [name]: value,
    });
  }

  const [checkItems, setCheckItems] = useState([]);
  const [statusData, setStatusData] = useState([]);

  // 상세보기 링크
  const handleRowClick = (params) => {
    const row = params.row;
    navigator(`/order/item/${row.id}`);
  };

  // 전체 리스트 조회
  const getList = async () => {
    const list = {
      take: 10,
      page: page,
      status: checkItems,
      merchantUid: userInfo.merchantUid,
      name: userInfo.name,
      phone: userInfo.phone,
      productName: userInfo.productName,
      startDate: startDate
        ? `${startDate?.$y}-${startDate?.$M + 1}-${sday}`
        : "",
      endDate: endDate ? `${endDate?.$y}-${endDate?.$M + 1}-${eday}` : "",
    };
    const { data, statusCode } = await getOrder(list);
    if (statusCode == 200) {
      setTotal(data.total);
      setListData(data.results);
    }
  };

  // 체크박스 전체 선택
  const handleAllCheck = (checked) => {
    if (checked) {
      const idArray = [];
      statusData.forEach((el) => idArray.push(el.value));
      setCheckItems(idArray);
    } else {
      setCheckItems([]);
    }
  };
  // 체크박스 단일 선택
  const handleSingleCheck = (checked, id) => {
    if (checked) {
      setCheckItems((prev) => [...prev, id]);
    } else {
      setCheckItems(checkItems.filter((el) => el !== id));
    }
  };
  const onReset = () => {
    sessionStorage.clear(); // 전체 삭제
  };

  useEffect(() => {
    getStateList();
    getList();
  }, [pageBtn]);

  return (
    <>
      <AlertModal isOpen={alertModal} onClose={aleatHandleClose} text={text} />
      <Container>
        <TopBox>
          <h1>주문 관리</h1>
        </TopBox>
        <SearchArea>
          <RowInner>
            <TextInput>
              <input
                className="orderNum"
                type="text"
                placeholder="주문번호"
                onChange={onChange}
                name="merchantUid"
              />
              <input
                className="name"
                type="text"
                placeholder="상품명"
                onChange={onChange}
                name="productName"
              />
            </TextInput>
            <DateBox>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateInput>
                  <DatePicker
                    fullWidth
                    value={startDate}
                    inputFormat={"YYYY-MM-DD"}
                    onChange={(newValue) => {
                      setStartDate(newValue);
                    }}
                    renderInput={(params) => {
                      return <TextField {...params} />;
                    }}
                  />
                </DateInput>
                <DateInputs>~</DateInputs>
                <DateInput>
                  <DatePicker
                    value={endDate}
                    inputFormat={"YYYY-MM-DD"}
                    onChange={(newValue) => {
                      setEndDate(newValue);
                    }}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </DateInput>
              </LocalizationProvider>
            </DateBox>
          </RowInner>
          <RowInner>
            <TextInput>
              <input
                className="orderNum"
                type="text"
                placeholder="주문자명"
                onChange={onChange}
                name="name"
              />
              <input
                className="name"
                type="text"
                placeholder="휴대번호"
                onChange={onChange}
                name="phone"
              />
            </TextInput>
          </RowInner>
          <CheckList>
            <span key={100}>
              <input
                type="checkbox"
                name="all"
                id="all"
                onChange={(e) => handleAllCheck(e.target.checked)}
                checked={
                  checkItems?.length === statusData?.length ? true : false
                }
              />
              <label htmlFor="all">전체</label>
            </span>
            {statusList?.map((el, i) => (
              <span key={el?.value}>
                <input
                  type="checkbox"
                  name={el?.key}
                  id={el?.value}
                  onChange={(e) =>
                    handleSingleCheck(e.target.checked, el.value)
                  }
                  checked={checkItems.includes(el.value) ? true : false}
                />
                <label htmlFor={el?.value}>{el?.key}</label>
              </span>
            ))}
          </CheckList>
        </SearchArea>
        <Area>
          <FilterBtn>
            <button onClick={() => window.location.reload()}>초기화</button>
            <button onClick={getList}>필터적용</button>
          </FilterBtn>
        </Area>
        <GridContainer>
          <DataGrid
            sx={gridBtm}
            autoHeight
            rows={rowsData}
            pageSize={10}
            rowCount={total}
            columns={orderColumns}
            experimentalFeatures={{ newEditingApi: true }}
            onRowClick={handleRowClick}
            cell--textCenter
          />
          <PagingBox>
            <Paging
              totalcnt={total}
              onChangepage={handleChangess}
              limit={10}
              currentpage={pageBtn}
            />
          </PagingBox>
        </GridContainer>
      </Container>
    </>
  );
};
export default OrderList;
