import React, {useEffect, useState} from "react";
import {Grid, Link, Modal, Typography} from "@mui/material";
import {
    getProductVarietyApi,
    getPartnerProductVarietyApi,
    postProductVarietyApi,
} from "../../api/stocks";
import {toast} from "react-hot-toast";
import {ModalWrap} from "../order/OrderHistoryModal";
import ProductItem from "./ProductItem";

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

    const postProduct = async (productVarietyId, grade, productImage) => {
        const partnerId = localStorage.getItem("id");
        const payload = {
            productVarietyId : productVarietyId,
            grade : grade,
            productImage : productImage,
            partnerId: partnerId,
        };
        const response = await postProductVarietyApi(payload);
        if (response && response.data.statusCode === 200) {
            toast.success("등록되었습니다.", {
                duration: 4000,
                style: {
                    marginTop: "20px",
                },
            });
            getPartnerProductVariety();
        }else {
            toast.error("등록할수없습니다.", {
                duration: 4000,
                style: {
                    marginTop: "20px",
                },
            });
        }
    };

    useEffect(() => {
        if (infoId) {
            getProductVariety();
            getPartnerProductVariety();
        }
    }, [infoId]);

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
                    <a href="/stock" style={{textDecoration: "underline"}}>
                        [판매 상품 관리]
                    </a>{" "}
                    메뉴에서 관리 또는 삭제할 수 있어요.
                </Typography>
                <Grid component={"ul"} container flexDirection={"column"} gap={2}>
                    {list?.map(({ productVarietyId, productName, storage, color, productImage, productsGrade }) => (
                        <ProductItem
                            key={productVarietyId}
                            optionId={productVarietyId}
                            optionText={`${productName} / ${storage} / ${color}`}
                            thumb={`https://image.21market.kr/${productImage}`}
                            productImage={productImage}
                            postProduct={postProduct}
                            postedGrade={myList
                                ?.find((v) =>
                                    v.productName === productName &&
                                    v.storage === storage &&
                                    v.color === color
                                )
                                ?.productsGrade?.map(Number)}
                        />
                    ))}
                </Grid>
            </ModalWrap>
        </Modal>
    );
};

export default ListModal;
