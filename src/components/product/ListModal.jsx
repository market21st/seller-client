import React, { useEffect, useState } from "react";
import { Grid, Modal, Typography } from "@mui/material";
import {
  getProductInfoApi,
  getMyProductInfoApi,
  postProductApi,
} from "../../api/stock";
import { toast } from "react-hot-toast";
import { ModalWrap } from "../order/OrderHistoryModal";
import ProductItem from "./ProductItem";

const ListModal = ({ isOpen, onClose, infoId }) => {
  const [list, setList] = useState([]);
  const [myList, setMyList] = useState([]);

  const getProductInfo = async () => {
    const { statusCode, data } = await getProductInfoApi(infoId);
    if (statusCode === 200) setList(data);
  };
  const getMyProductInfo = async () => {
    const { statusCode, data } = await getMyProductInfoApi(infoId);
    if (statusCode === 200) setMyList(data);
  };

  const postProduct = async (optionId, grade) => {
    const payload = {
      infoId,
      optionId,
      grade,
      stock: "",
      // price: "5000",
    };
    const { statusCode, message } = await postProductApi(payload);
    if (statusCode === 200) {
      toast.success("상품 등록 완료", {
        duration: 4000,
        style: {
          marginTop: "20px",
        },
      });
      getMyProductInfo();
    } else if (statusCode === 400) {
      toast.error(message, {
        duration: 4000,
        style: {
          marginTop: "20px",
        },
      });
    }
  };

  useEffect(() => {
    if (infoId) {
      getProductInfo();
      getMyProductInfo();
    }
  }, [infoId]);

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
    >
      <ModalWrap>
        <h2>상품 리스트</h2>
        <Typography py={1} fontWeight={500}>
          판매할 상품을 어쩌고젖쩌고
        </Typography>
        <Grid component={"ul"} container flexDirection={"column"} gap={2}>
          {list?.map(({ id, optionText, thumb }) => (
            <ProductItem
              key={id}
              optionId={id}
              optionText={optionText}
              thumb={thumb}
              postProduct={postProduct}
              postedGrade={myList
                ?.filter((v) => v["fk_option_id"] === id)[0]
                ?.grade.split(",")
                .map(Number)}
            />
          ))}
        </Grid>
      </ModalWrap>
    </Modal>
  );
};

export default ListModal;
