import { Button, Grid, Typography } from "@mui/material";
import { GRADE_LIST } from "../../constants/common";

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
        <img
          src={thumb}
          alt={optionText}
          width={50}
          height={50}
          style={{ objectFit: "contain" }}
        />
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
