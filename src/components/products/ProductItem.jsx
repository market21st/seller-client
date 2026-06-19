import { Button, Grid } from "@mui/material";
import { GRADE_LIST } from "../../constants/common";

const ProductItem = ({ group, postProductGroup, myList }) => {
  // 그룹 내 모든 색상에 대해 해당 등급이 등록되었는지 확인
  const isGradePosted = (gradeValue) => {
    return group.items.every((item) => {
      const found = myList?.find(
        (v) =>
          v.productName === item.productName &&
          v.storage === item.storage &&
          v.color === item.color
      );
      return found?.productsGrade?.map(Number)?.includes(gradeValue);
    });
  };

  return (
    <Grid
      container
      justifyContent="flex-start"
      gap={1}
      sx={{ padding: "10px 0" }}
    >
      {GRADE_LIST.map(({ name, value }) => (
        <Button
          key={value}
          variant="outlined"
          size="small"
          color={isGradePosted(value) ? "primary" : "secondary"}
          onClick={() => postProductGroup(group.items, value)}
          sx={{
            fontSize: "13px",
            padding: "4px 20px",
            borderRadius: "6px",
            fontWeight: isGradePosted(value) ? 700 : 500,
          }}
        >
          {name}급
        </Button>
      ))}
    </Grid>
  );
};

export default ProductItem;
