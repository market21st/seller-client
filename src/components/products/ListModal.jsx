import React, {useEffect, useState} from "react";
import {Grid, Modal, Typography} from "@mui/material";
import {
    getProductVarietyApi,
    getPartnerProductVarietyApi,
    postProductVarietyApi,
} from "../../api/stocks";
import {toast} from "react-hot-toast";
import {ModalWrap} from "../order/OrderHistoryModal";
import ProductItem from "./ProductItem";

/**
 * list를 productName + storage 기준으로 그룹핑
 * 반환: [{ productName, storage, productImage, items: [{원본 항목}, ...] }, ...]
 */
const groupByStorage = (list) => {
    const map = new Map();
    (list || []).forEach((item) => {
        const key = `${item.productName}_${item.storage}`;
        if (!map.has(key)) {
            map.set(key, {
                productName: item.productName,
                storage: item.storage,
                productImage: item.productImage,
                items: [],
            });
        }
        map.get(key).items.push(item);
    });
    return Array.from(map.values());
};

const ListModal = ({isOpen, onClose, infoId}) => {
    const [list, setList] = useState([]);
    const [myList, setMyList] = useState([]);

    const getProductVariety = async () => {
        const response = await getProductVarietyApi({
            productId : infoId
        });
        if (response && response.content) {
            setList(response.content);
        }
    };
    const getPartnerProductVariety = async () => {
        const partnerId = localStorage.getItem("id");
        const response = await getPartnerProductVarietyApi({
            productId : infoId,
            partnerId: partnerId
        });
        if (response && response.content) {
            setMyList(response.content);
        }
    };

    // 그룹 내 모든 색상을 한 번에 등록
    const postProductGroup = async (items, grade) => {
        const partnerId = localStorage.getItem("id");
        let successCount = 0;

        for (const item of items) {
            try {
                const response = await postProductVarietyApi({
                    productVarietyId: item.productVarietyId,
                    grade: grade,
                    productImage: item.productImage,
                    partnerId: partnerId,
                });
                if (response && response.data.statusCode === 200) {
                    successCount++;
                }
            } catch {
                // 개별 실패는 무시하고 계속 진행
            }
        }

        if (successCount > 0) {
            toast.success(`${successCount}개 색상이 등록되었습니다.`, {
                duration: 4000,
                style: { marginTop: "20px" },
            });
            getPartnerProductVariety();
        } else {
            toast.error("등록할수없습니다.", {
                duration: 4000,
                style: { marginTop: "20px" },
            });
        }
    };

    useEffect(() => {
        if (infoId) {
            getProductVariety();
            getPartnerProductVariety();
        }
    }, [infoId]);

    const grouped = groupByStorage(list);

    return (
        <Modal
            open={isOpen}
            onClose={onClose}
            sx={{display: "flex", justifyContent: "center", alignItems: "center"}}
        >
            <ModalWrap>
                <h2>상품 리스트</h2>
                <Typography py={1} fontWeight={500} whiteSpace={"pre-wrap"}>
                    등급별 판매 상품을 추가해 주세요.{"\n"}추가된 상품은{" "}
                    <a href="/stocks" style={{textDecoration: "underline"}}>
                        [판매 상품 관리]
                    </a>{" "}
                    메뉴에서 관리 또는 삭제할 수 있어요.
                </Typography>
                <Grid component={"ul"} container flexDirection={"column"} gap={2}>
                    {grouped.map((group) => (
                        <li key={`${group.productName}_${group.storage}`}>
                            {/* 헤더: 섬네일 + 모델명 / 용량 / 색상들 */}
                            <Grid
                                container
                                alignItems="center"
                                gap={1}
                                sx={{
                                    padding: "10px 0 8px",
                                    borderBottom: "1px solid #eee",
                                }}
                            >
                                <img
                                    src={`https://image.21market.kr/${group.productImage}`}
                                    alt="섬네일"
                                    width={44}
                                    height={44}
                                    style={{ objectFit: "contain" }}
                                />
                                <Typography fontWeight={700} fontSize="15px">
                                    {group.productName} / {group.storage}
                                </Typography>
                                <Typography fontSize="14px" color="#888" sx={{ marginLeft: "4px" }}>
                                    /
                                </Typography>
                                {group.items.map((item, idx) => (
                                    <Typography key={item.productVarietyId} fontSize="14px" color="#555">
                                        {item.color}{idx < group.items.length - 1 ? "" : ""}
                                    </Typography>
                                ))}
                            </Grid>

                            {/* 등급 버튼 */}
                            <ProductItem
                                group={group}
                                postProductGroup={postProductGroup}
                                myList={myList}
                            />
                        </li>
                    ))}
                </Grid>
            </ModalWrap>
        </Modal>
    );
};

export default ListModal;
