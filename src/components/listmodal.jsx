import React, { useEffect, useState } from "react";
import { Grid, Modal, Button } from "@mui/material";
import styled from "styled-components";
import { getOptions, getMyProduct, postProduct } from "../api/stock";
import { toast } from "react-hot-toast";
import closeIcon from "../assets/close.png";
const InnerBox = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #fff;
  box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  outline: none;
`;
const Text = styled.h2`
  font-size: 1.2rem;
  line-height: 1.5;
  margin: 40px 50px 20px;
`;
const Img = styled.img`
  width: 36px;
  height: 36px;
  position: absolute;
  right: 20px;
  cursor: pointer;
`;
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
      toast.success("제품 등록 완료");
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
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <InnerBox>
        <Grid container position={"relative"} alignItems="center">
          <Text>상품 리스트</Text>
          <Img src={closeIcon} alt="닫기" onClick={onClose} />
        </Grid>
        <Grid
          container
          overflow={"auto"}
          flexWrap="nowrap"
          maxHeight="700px"
          flexDirection={"column"}
          padding={"0 50px 40px"}
        >
          {data.map((v, idx) => (
            <Grid
              container
              key={v.id}
              flexWrap="nowrap"
              justifyContent="space-between"
              alignItems="center"
              borderTop={idx ? "1px solid #eee" : "none"}
              py="15px"
              gap="25px"
            >
              <Grid display={"inline-flex"} alignItems="center">
                <Grid item marginRight={"25px"}>
                  <img src={v.thumb} alt="" style={{ width: "55px" }} />
                </Grid>
                <Grid
                  item
                  fontWeight="700"
                  letterSpacing="0.4px"
                  whiteSpace={"nowrap"}
                >
                  {v.optionText}
                </Grid>
              </Grid>
              <Grid display={"inline-flex"} columnGap={"10px"}>
                {[
                  { value: "2", txt: "S급" },
                  { value: "1", txt: "A급" },
                  { value: "0", txt: "B급" },
                ].map(({ txt, value }) => (
                  <Grid key={value}>
                    <Button
                      variant={
                        current[v.id]
                          ? current[v.id]?.indexOf(value) !== -1
                            ? "contained"
                            : "outlined"
                          : "outlined"
                      }
                      color={"secondary"}
                      onClick={() => onResult(value, v.id)}
                    >
                      {txt}
                    </Button>
                  </Grid>
                ))}
              </Grid>
            </Grid>
          ))}
        </Grid>
      </InnerBox>
    </Modal>
  );
};

export default ListModal;
