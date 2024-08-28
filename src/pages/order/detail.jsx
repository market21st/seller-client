import styled from "styled-components";
import {
  TemplateBox,
  TemplateRow,
  TemplateTitleWrap,
  TemplateWrap,
  statusBgColor,
} from ".";
import { Link, useParams } from "react-router-dom";
import { useEffect } from "react";
import { getOrderHistory, getOrderDetail } from "../../api/order";
import { useState } from "react";
import {
  Button,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import dayjs from "dayjs";
import StatusUpdateModal from "../../components/order/StatusUpdateModal";
import toast from "react-hot-toast";

const TABLE_HEAD_CELLS = ["변경 일시", "처리 상태", "변경 주체", "사유"];

const rowCells = (row) => [
  dayjs(row.createdAt).format("YYYY.MM.DD HH:mm:ss"),
  row.statusText,
  row.workUser,
  row.reason?.contents,
];

const OrderDetailPage = () => {
  const { id } = useParams();

  const [detail, setDetail] = useState({});
  const [history, setHistory] = useState([]);
  const [isOpenStatusUpdateModal, setIsOpenStatusUpdateModal] = useState(false);

  const handleOpenStatusUpdateModal = () => {
    setIsOpenStatusUpdateModal(true);
  };
  const handleCloseStatusUpdateModal = () => {
    setIsOpenStatusUpdateModal(false);
  };

  const handleClickChip = () => {
    const status = detail.status;
    if (status === 120 || status === 130 || status === 200) {
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
    } else if (status === 990) {
      toast.success(
        `주문취소 건은 정산내역에서 제외돼요.\n주문취소 사유: ${detail.lastOrderCancellationComment}`,
        {
          duration: 4000,
          style: {
            marginTop: "20px",
          },
        }
      );
      return;
    }
    handleOpenStatusUpdateModal();
  };

  const getDetail = async () => {
    const { data, statusCode } = await getOrderDetail(id);
    if (statusCode === 200) setDetail(data);
  };
  const getHistory = async () => {
    const { data, statusCode } = await getOrderHistory(id, "status");
    if (statusCode === 200) setHistory(data);
  };

  useEffect(() => {
    getDetail();
    getHistory();
  }, []);

  return (
    <>
      <StatusUpdateModal
        open={isOpenStatusUpdateModal}
        onClose={handleCloseStatusUpdateModal}
        status={detail.status}
        statusText={detail.statusText}
        statusToBeGroup={detail.statusToBeGroup?.results}
        lastInspectionFailComment={detail.lastInspectionFailComment}
        id={detail.id}
        productName={detail.productName}
        optionText={detail.optionText}
        reload={() => {
          getDetail();
          getHistory();
        }}
      />
      <TemplateWrap>
        <TemplateTitleWrap>
          <h2>주문 상세 정보</h2>
          <h3>주문의 상세정보 확인 및 수정이 가능합니다.</h3>
        </TemplateTitleWrap>
        <TemplateBox>
          <TemplateRow>
            <p>주문번호</p>
            <span>{detail.merchantUid}</span>
          </TemplateRow>
          <TemplateRow>
            <p>처리상태</p>
            <Chip
              label={detail.statusText}
              color={statusBgColor(detail.status)}
              onClick={handleClickChip}
            />
          </TemplateRow>
          <TemplateRow>
            <p>주문일자</p>
            <span>{dayjs(detail.createdAt).format("YYYY.MM.DD HH:mm:ss")}</span>
          </TemplateRow>
          <TemplateRow>
            <p>상품명 - 옵션</p>
            <span>
              {detail.productName} - {detail.optionText}
            </span>
          </TemplateRow>
          <TemplateRow>
            <p>판매가</p>
            <span>{detail.price}</span>
          </TemplateRow>
          <TemplateRow>
            <p>수수료율</p>
            <span>{detail.fee}</span>
          </TemplateRow>
        </TemplateBox>
        <TemplateBox>
          <h4>배송정보</h4>
          <TemplateRow>
            <p>
              출고 배송정보 <span>파트너의 상품 출고</span>
            </p>
            <span>
              {detail.deliveryInformationToAdmin?.deliveryCorpNameToAdmin ||
                "-"}
            </span>
            <span>|</span>
            <span>
              {detail.deliveryInformationToAdmin?.invoiceNoToAdmin || "-"}
            </span>
            <span>
              (송장번호 입력일시:{" "}
              {detail.deliveryInformationToAdmin?.createdAtOfReleaseToAdmin
                ? dayjs(
                    detail.deliveryInformationToAdmin?.createdAtOfReleaseToAdmin
                  ).format("YYYY.MM.DD HH:mm:ss")
                : "-"}
              )
            </span>
          </TemplateRow>
          <TemplateRow>
            <p>
              반송 배송정보<span>검수 미통과 상품 반송</span>
            </p>{" "}
            <span>
              {detail.deliveryInformationToPartner?.deliveryCorpNameToPartner ||
                "-"}
            </span>
            <span>|</span>
            <span>
              {detail.deliveryInformationToPartner?.invoiceNoToPartner || "-"}
            </span>
            <a
              href={"https://www.cjlogistics.com//ko/tool/parcel/tracking"}
              target="_blank"
              rel="noreferrer"
            >
              <Button variant="outlined" size="small">
                배송추적
              </Button>
            </a>
            <span>
              (송장번호 입력일시:{" "}
              {detail.deliveryInformationToPartner?.createdAtOfReleaseToPartner
                ? dayjs(
                    detail.deliveryInformationToPartner
                      ?.createdAtOfReleaseToPartner
                  ).format("YYYY.MM.DD HH:mm:ss")
                : "-"}
              )
            </span>
          </TemplateRow>
        </TemplateBox>
        <TemplateBox>
          <h4>주문 처리상태</h4>
          <Table>
            <TableHead>
              <TableRow>
                {TABLE_HEAD_CELLS.map((v) => (
                  <TableCell key={`head_cell_${v}`}>{v}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {history?.map((row, idx) => (
                <TableRow
                  key={`row_${idx}`}
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                    "&:hover": {
                      background: "#F2F8FF",
                    },
                  }}
                >
                  {rowCells(row).map((v, idx) => (
                    <TableCell key={`row_cell_${idx}`}>{v || "-"}</TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TemplateBox>
        <BackButtonWrap>
          <Link to={"/order"}>
            <button>{`<`} 목록으로 돌아가기</button>
          </Link>
        </BackButtonWrap>
      </TemplateWrap>
    </>
  );
};

export default OrderDetailPage;

const BackButtonWrap = styled.div`
  padding: 16px 0;
  display: flex;
  justify-content: center;
  button {
    padding: 11px 16px;
    color: #4a5c80;
    font-size: 13px;
  }
`;
