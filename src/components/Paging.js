import React from "react";
import Pagination from "@mui/material/Pagination";

function Paging({ totalcnt, onChangepage, limit, currentpage }) {
  let pageCnt = totalcnt % limit;
  if (pageCnt === 0) {
    pageCnt = parseInt(totalcnt / limit);
  } else {
    pageCnt = parseInt(totalcnt / limit) + 1;
  }
  return (
    <div>
      <Pagination
        count={pageCnt ? pageCnt : 1}
        page={parseInt(currentpage)}
        onChange={onChangepage}
        showFirstButton
        showLastButton
      />
    </div>
  );
}
export default Paging;
