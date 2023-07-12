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
  width: 1000px;
  height: 800px;
  box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.25);
  border-radius: 2px;
  outline: none;
`;
const Text = styled.h2`
  font-size: 1.2rem;
  line-height: 1.5;
  margin: 45px 30px;
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
          maxHeight="600px"
          flexDirection={"column"}
          padding={"0 30px"}
          gap={"15px"}
        >
          {data.map((v) => (
            <Grid container key={v.id} columnGap={"15px"} alignItems="center">
              <Grid item marginRight={"10px"}>
                <img src={v.thumb} alt="" style={{ width: "60px" }} />
              </Grid>
              <Grid item marginRight={"10px"}>
                {v.optionText}
              </Grid>
              <Grid display={"flex"} columnGap={"10px"}>
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
                      color="secondary"
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
