import React, { useState } from "react";
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
        count={pageCnt ? pageCnt : 1} // 총 페이지 수 = 2
        page={parseInt(currentpage)} // 현재 페이지 = 1
        onChange={onChangepage} // 페이지가 변경되면 실행
        showFirstButton
        showLastButton
        // onChange={(e, page) => onChangepage(e, page)} // 페이지가 변경되면 실행
      />
    </div>
  );
}
export default Paging;
