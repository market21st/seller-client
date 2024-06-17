import React, { useEffect, useState } from "react";
import { Grid, Modal, Button, Typography } from "@mui/material";
import { getOptions, getMyProduct, postProduct } from "../../api/stock";
import { toast } from "react-hot-toast";
import closeIcon from "../../assets/close.png";
import styled from "styled-components";

const ListModal = ({ isOpen, onClose, id }) => {
  const [data, setData] = useState([]);
  const [current, setCurrent] = useState({});
  const getList = async () => {
    const { statusCode, data } = await getOptions(id);
    if (statusCode === 200) {
      setData(data);
    }
  };
  const getMyList = async () => {
    const { statusCode, data } = await getMyProduct(id);
    if (statusCode === 200) {
      setCurrent(
        data
          .map(({ fk_option_id, grade }) => ({ [fk_option_id]: grade }))
          .reduce((acc, cur) => {
            let obj = { ...acc, ...cur };
            return obj;
          }, {})
      );
    }
  };
  const onResult = async (grade, optionId) => {
    const list = {
      infoId: id,
      optionId,
      grade,
      price: "100",
      stock: "",
    };
    const { statusCode } = await postProduct(list);
    if (statusCode === 200) {
      toast.success("상품 등록 완료");
      getMyList();
    }
  };

  useEffect(() => {
    if (isOpen && id) {
      getList();
      getMyList();
    }
  }, [id, isOpen]);

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
    >
      <ModalWrap>
        <Grid
          display={"inline-flex"}
          position={"absolute"}
          top={20}
          right={20}
          sx={{ cursor: "pointer" }}
        >
          <img
            src={closeIcon}
            alt="닫기"
            onClick={onClose}
            width={32}
            height={32}
          />
        </Grid>
        <h2>상품 리스트</h2>
        <Grid component={"ul"} container flexDirection={"column"}>
          {data.map((v, idx) => (
            <Grid
              key={v.id}
              component={"li"}
              container
              justifyContent={"space-between"}
              alignItems={"center"}
              gap={2}
              py={2}
              borderTop={idx ? "1px solid #eee" : "none"}
            >
              <Grid display={"inline-flex"} alignItems={"center"} gap={2}>
                <img
                  src={v.thumb}
                  alt=""
                  width={50}
                  style={{ objectFit: "cover" }}
                />
                <Typography fontWeight={500} whiteSpace={"nowrap"}>
                  {v.optionText}
                </Typography>
              </Grid>
              <Grid display={"inline-flex"} gap={2}>
                {[
                  { value: "2", txt: "S급" },
                  { value: "1", txt: "A급" },
                  { value: "0", txt: "B급" },
                ].map(({ txt, value }) => (
                  <Button
                    key={value}
                    variant={
                      current[v.id]
                        ? current[v.id]?.indexOf(value) !== -1
                          ? "contained"
                          : "outlined"
                        : "outlined"
                    }
                    onClick={() => onResult(value, v.id)}
                  >
                    {txt}
                  </Button>
                ))}
              </Grid>
            </Grid>
          ))}
        </Grid>
      </ModalWrap>
    </Modal>
  );
};

export default ListModal;

const ModalWrap = styled.div`
  position: relative;
  width: 600px;
  max-width: 80%;
  max-height: 80%;
  overflow-y: auto;
  padding: 40px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  border-radius: 10px;
  background: #fff;
  h2 {
    font-size: 18px;
    font-weight: 700;
  }
  h3 {
    font-weight: 500;
    padding: 10px 0;
  }
`;
