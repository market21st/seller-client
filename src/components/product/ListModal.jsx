import React, { useEffect, useState } from "react";
import { Grid, Modal, Button, Typography } from "@mui/material";
import { getOptions, getMyProduct, postProduct } from "../../api/stock";
import { toast } from "react-hot-toast";
import { ModalWrap } from "../order/OrderHistoryModal";

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
      // price: "5000",
      stock: "",
    };
    const { statusCode } = await postProduct(list);
    if (statusCode === 200) {
      toast.success("상품 등록 완료", {
        duration: 4000,
        style: {
          marginTop: "20px",
        },
      });
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
        <h2>상품 리스트</h2>
        <Typography py={1} fontWeight={500}>
          판매할 상품을 어쩌고젖쩌고
        </Typography>
        <Grid component={"ul"} container flexDirection={"column"} gap={2}>
          {data.map((v, idx) => (
            <Grid
              key={v.id}
              component={"li"}
              container
              justifyContent={"space-between"}
              alignItems={"center"}
              gap={2}
            >
              <Grid display={"inline-flex"} alignItems={"center"} gap={1}>
                <img
                  src={v.thumb}
                  alt={v.optionText}
                  width={50}
                  style={{ objectFit: "cover" }}
                />
                <Typography fontWeight={500} whiteSpace={"nowrap"}>
                  {v.optionText}
                </Typography>
              </Grid>
              <Grid display={"inline-flex"} gap={1}>
                {[
                  { value: "2", txt: "S급" },
                  { value: "1", txt: "A급" },
                  { value: "0", txt: "B급" },
                ].map(({ txt, value }) => (
                  <Button
                    key={value}
                    variant="outlined"
                    color={
                      current[v.id]?.indexOf(value) !== -1
                        ? "primary"
                        : "secondary"
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
