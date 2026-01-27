import {
    Button,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Modal,
    Select,
    TextField,
    Checkbox,
    FormControlLabel
} from "@mui/material";
import React, {useEffect, useState} from "react";
import {ModalButtonWrap, ModalWrap} from "./OrderHistoryModal";
import styled from "styled-components";
import {editOrderStatus} from "../../api/orders";
import AlertModal from "../common/AlertModal";
import toast from "react-hot-toast";
import {deliveryCorpList} from "../../constants/orders";

const DESC_LIST = {
    100: [
        "[출고불가신청]을 하는 경우 해당 상품/옵션의 재고수량이 0으로 변경돼요.",
        "출고불가 신청 후 [출고불가확정] 처리된 주문은 되돌릴 수 없어요.",
    ],
    140: [
        "검수 미통과된 상품으로 1일 이내(영업일 기준) 반송될 예정이예요.",
        "[출고불가신청]을 하는 경우 해당 상품/옵션의 재고수량이 0으로 변경돼요.",
        "출고불가 신청 후 [출고불가확정] 처리된 주문은 되돌릴 수 없어요.",
    ],
};

const StatusUpdateModal = ({
                               open,
                               onClose,
                               status,
                               statusText,
                               statusToBeGroup,
                               id,
                               reload,
                               lastInspectionFailComment,
                               productName,
                               optionText,
                           }) => {
    const [isOpenAlertModal, setOpenAlertModal] = useState(false);

    const [data, setData] = useState({});
    const [etcComment, setEtcComment] = useState("");
    //const [deliveryCorpList, setDeliveryCorpList] = useState([]);

    const [sendAlim, setSendAlim] = useState(true) // 알림톡 발송 여부(default: true)

    const handleOpenAlretModal = () => {
        setOpenAlertModal(true);
    };
    const handleCloseAlretModal = () => {
        setOpenAlertModal(false);
    };

    /*const getDeliveryCorpList = async () => {
      const { data, statusCode } = await getDelivery();
      if (statusCode === 200) setDeliveryCorpList(data.results);
    };*/

    const handleUpdateStatus = async () => {
        const statusComment = data.comment? data.comment : null;
        if (data.status === 150 ) {
            if(!isOpenAlertModal){
                handleOpenAlretModal();
                return;
            }

        }

        const formData = {
            ...data,
            comment: data.comment === "기타 (직접입력)" ? etcComment : data.comment,
            alim: data.status === 120 && sendAlim,
            orderItemId: id,
            deliveryCompany : data.deliveryCorp,
            trackingNumber :data.invoiceNo,
            cancelReason : data.status === 150 ? statusComment : null
        };
        console.log(formData);
        await editOrderStatus(formData);
        reload();
        handleCloseAlretModal();
        onClose();
    };

    useEffect(() => {
        if (open) {
            setData({});
            setEtcComment("");
        }
    }, [open]);
    useEffect(() => {
        //getDeliveryCorpList();
    }, []);

    return (
        <>
            <AlertModal
                open={isOpenAlertModal}
                text={`출고불가 신청을 하는 경우\n${productName}/${optionText} 상품의\n재고수량이 ‘0’으로 변경되어 품절처리 됩니다.`}
                onConfirm={handleUpdateStatus}
                onClose={handleCloseAlretModal}
            />
            <Modal
                open={open}
                onClose={onClose}
                sx={{display: "flex", justifyContent: "center", alignItems: "center"}}
            >
                <ModalWrap>
                    <Grid
                        component={"form"}
                        container
                        flexDirection={"column"}
                        gap={2}
                        onSubmit={(e) => {
                            e.preventDefault();
                            handleUpdateStatus();
                        }}
                    >
                        <h2>주문 처리상태 변경</h2>
                        {status === 100 ? (
                            <h3>
                                출고가능 여부에 따라 [출고대기] 또는 [출고불가신청]으로
                                변경해주세요
                            </h3>
                        ) : status === 140 ? (
                            <h3>
                                <span>검수미통과</span>사유: {lastInspectionFailComment}
                            </h3>
                        ) : null}
                        <FormControl disabled>
                            <InputLabel>현재</InputLabel>
                            <Select label="현재" value={status}>
                                <MenuItem value={status}>{statusText}</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl required>
                            <InputLabel>변경 후</InputLabel>
                            <Select
                                label="변경 후"
                                value={data.status || ""}
                                onChange={(e) => setData({status: e.target.value})}
                            >
                                {statusToBeGroup?.map(({key, value}) => (
                                    <MenuItem value={value} key={value}>
                                        {key}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        {/* 출고완료 */}
                        {data.status === 120 ? (
                            <OptionWrap>
                                <p>출고 배송정보</p>
                                <div>
                                    <FormControl required>
                                        <InputLabel>택배사</InputLabel>
                                        <Select
                                            label="택배사"
                                            value={data.deliveryCorp || ""}
                                            onChange={(e) =>
                                                setData({...data, deliveryCorp: e.target.value})
                                            }
                                        >
                                            {deliveryCorpList.map(({key, value}) => (
                                                <MenuItem value={value} key={value}>
                                                    {key}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                    <TextField
                                        required
                                        placeholder="운송장번호"
                                        value={data.invoiceNo}
                                        onChange={(e) =>
                                            setData({...data, invoiceNo: e.target.value})
                                        }
                                    />
                                </div>
                                <div>
                                    <p>고객에게 알림톡 발송</p>
                                    <div>
                                        <FormControlLabel
                                            label={"발송"}
                                            control={
                                                <Checkbox
                                                    checked={sendAlim}
                                                    onChange={() => {
                                                        setSendAlim(true)
                                                    }}
                                                />
                                            }
                                        />
                                        <FormControlLabel
                                            label={"미발송"}
                                            control={
                                                <Checkbox
                                                    checked={!sendAlim}
                                                    onChange={() => {
                                                        setSendAlim(false)
                                                    }}
                                                />
                                            }
                                        />
                                    </div>
                                </div>
                            </OptionWrap>
                        ) : null}
                        {/* 출고불가신청 */}
                        {data.status === 150 ? (
                            <OptionWrap>
                                <p>출고불가 신청 사유</p>
                                <div>
                                    <FormControl required>
                                        <Select
                                            value={data.comment || ""}
                                            onChange={(e) =>
                                                setData({...data, comment: e.target.value})
                                            }
                                        >
                                            <MenuItem value="재고 부족">재고 부족</MenuItem>
                                            <MenuItem value="기타 (직접입력)">
                                                기타 (직접입력)
                                            </MenuItem>
                                        </Select>
                                    </FormControl>
                                    {data.comment === "기타 (직접입력)" ? (
                                        <TextField
                                            required
                                            placeholder="출고불가 사유를 입력해 주세요."
                                            value={etcComment || ""}
                                            onChange={(e) => setEtcComment(e.target.value)}
                                        />
                                    ) : null}
                                </div>
                            </OptionWrap>
                        ) : null}
                        <DescWrap>
                            {DESC_LIST[status]?.map((v) => (
                                <li key={v}>{v}</li>
                            ))}
                        </DescWrap>
                        <ModalButtonWrap>
                            <Button onClick={onClose} variant="outlined" size="large">
                                취소
                            </Button>
                            <Button variant="contained" size="large" type="submit">
                                확인
                            </Button>
                        </ModalButtonWrap>
                    </Grid>
                </ModalWrap>
            </Modal>
        </>
    );
};

export default StatusUpdateModal;

const DescWrap = styled.ul`
    list-style: inside disc;
    font-size: 14px;
`;

const OptionWrap = styled.div`
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 24px;
    border-radius: 8px;
    background: #f5f7fc;

    p {
        font-size: 14px;
        font-weight: 500;
    }

    & > div {
        display: flex;
        flex-direction: column;
        gap: 6px;
    }

`;
