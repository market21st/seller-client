import { Button, Grid, Typography } from "@mui/material";
import { GRADE_LIST } from "../../constants/common";
import RandomColorOverlay from "../common/RandomColorOverlay";

const ProductItem = ({
  optionId,
  optionText,
  thumb,
  postProduct,
  postedGrade,
}) => {
  return (
    <Grid
      component={"li"}
      container
      justifyContent={"space-between"}
      alignItems={"center"}
      gap={2}
    >
      <Grid display={"inline-flex"} alignItems={"center"} gap={1}>
        <Grid position={"relative"}>
          <img
            src={thumb}
            alt="섬네일"
            width={50}
            height={50}
            style={{ objectFit: "contain" }}
          />
          {optionText.indexOf("랜덤") !== -1 ? <RandomColorOverlay /> : null}
        </Grid>
        <Typography fontWeight={500} whiteSpace={"nowrap"}>
          {optionText}
        </Typography>
      </Grid>
      <Grid display={"inline-flex"} gap={1}>
        {GRADE_LIST.map(({ name, value }) => (
          <Button
            key={value}
            variant="outlined"
            color={
              (postedGrade || []).indexOf(value) !== -1
                ? "primary"
                : "secondary"
            }
            onClick={() => postProduct(optionId, value)}
          >
            {name}급
          </Button>
        ))}
      </Grid>
    </Grid>
  );
};

export default ProductItem;
