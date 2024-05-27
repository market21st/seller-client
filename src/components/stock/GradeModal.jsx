import React, { useEffect, useState } from "react";
import { Modal } from "@mui/material";
import styled from "styled-components";
import closeIcon from "../../assets/close.png";
import nextIcon from "../../assets/next.png";
import prevIcon from "../../assets/prev.png";

const ContentModal = ({ isOpen, onClose }) => {
  // 카테고리 클릭시
  const [cetagoryNum, setCetagoryNum] = useState(0);

  // 등급 클릭시
  const [num, setNum] = useState(0);
  const [gradeList, setGradeList] = useState(["_s_1", "_s_2", "_s_3"]);

  // 슬라이드 버튼 클릭시
  const [slideNum, setSlideNum] = useState(0);
  const nextEvent = () => {
    if (slideNum > 1) {
      setSlideNum(0);
      return;
    }
    setSlideNum(slideNum + 1);
  };

  const prevEvent = () => {
    if (slideNum < 1) {
      setSlideNum(2);
      return;
    }
    setSlideNum(slideNum - 1);
  };

  const imgUrl = `https://image.21market.kr/standard/grade/${
    cetagoryNum === 0 ? "phone" : "book"
  }`;
  const cetagory = ["스마트폰", "노트북", "워치", "태블릿"];
  const grades = ["S등급", "A등급", "B등급"];

  useEffect(() => {
    const TextChange = () => {
      if (num === 0) setGradeList(["_s_1", "_s_2", "_s_3"]);
      if (num === 1) setGradeList(["_a_1", "_a_2", "_a_3"]);
      if (num === 2) setGradeList(["_b_1", "_b_2", "_b_3"]);
    };
    TextChange();
  }, [num]);

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <InnerBox>
        <CategoryBox>
          <img src={closeIcon} alt="닫기" onClick={onClose} />
          <ul>
            {cetagory?.map((el, idx) => (
              <li
                key={idx}
                onClick={() => {
                  setCetagoryNum(idx);
                  setNum(0);
                }}
                className={cetagoryNum === idx ? "active" : ""}
              >
                {el}
              </li>
            ))}
          </ul>
        </CategoryBox>
        <Contents>
          {cetagoryNum > 1 ? null : (
            <section>
              <ul
                className={
                  slideNum === 1 ? "left100" : slideNum === 2 ? "left200" : ""
                }
              >
                {gradeList.map((el, idx) => (
                  <li key={idx}>
                    <img src={`${imgUrl}${el}.jpg`} alt="상세이미지1" />
                  </li>
                ))}
              </ul>
              <BtnBox>
                <button onClick={prevEvent}>
                  <img src={prevIcon} alt="이전" />
                </button>
                <button onClick={nextEvent}>
                  <img src={nextIcon} alt="다음" />
                </button>
              </BtnBox>
            </section>
          )}

          <GradeList>
            {grades?.map((el, idx) => (
              <li
                key={idx}
                onClick={() => {
                  setNum(idx);
                }}
                className={num === idx ? "active" : ""}
              >
                {el}
              </li>
            ))}
          </GradeList>
          <InfoList>
            {/* S급 */}
            <List className={num === 0 ? "active" : ""}>
              <h3>외관 기준</h3>
              <ul>
                <li>액정 : 기스없이 깨끗해요.</li>
                <li>외관 : 기스없이 깨끗해요.</li>
                <li>테두리 : 찍힘이 없이 개끗해요.</li>
              </ul>
              <h3>성능 기준</h3>
              <ul>
                <li>배터리 효율 최소 90% 이상</li>
                <li>전체 기능 및 성능 검수를 통과한 100% 정상 작동 기기</li>
              </ul>
            </List>
            {/* A급 */}
            <List className={num === 1 ? "active" : ""}>
              <h3>외관 기준</h3>
              <ul>
                <li>액정 : 기스없이 깨끗해요.</li>
                <li>외관 : 미세한 기스가 있을 수 있어요.</li>
                <li>테두리 : 미세한 까짐이 있어요.</li>
              </ul>
              <h3>성능 기준</h3>
              <ul>
                <li>배터리 효율 최소 85% 이상</li>
                <li>전체 기능 및 성능 검수를 통과한 100% 정상 작동 기기</li>
              </ul>
            </List>
            {/* B급 */}
            <List className={num === 2 ? "active" : ""}>
              <h3>외관 기준</h3>
              <ul>
                <li>액정 : 잔기스가 있지만 화면을 볼 때 거슬리지 않아요.</li>
                <li>외관 : 육안으로 확인되는 기스가 있어요.</li>
                <li>테두리 : 까짐과 찍힘이 있어요.</li>
              </ul>
              <h3>성능 기준</h3>
              <ul>
                <li>배터리 효율 최소 80% 이상</li>
                <li>전체 기능 및 성능 검수를 통과한 100% 정상 작동 기기</li>
              </ul>
            </List>
          </InfoList>
        </Contents>
      </InnerBox>
    </Modal>
  );
};

export default ContentModal;

const InnerBox = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #fff;
  width: 490px;
  box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.25);
  border-radius: 2px;
  outline: none;
`;

const CategoryBox = styled.div`
  background: #fff;
  padding: 0 0 15px;
  align-items: flex-end;
  display: flex;
  flex-direction: column;
  ul {
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding: 0 35px;
  }
  li {
    border-radius: 15px;
    padding: 10px 18px;
    color: #404040;
    font-size: 20px;
    cursor: pointer;
  }
  img {
    padding: 5px;
    cursor: pointer;
  }
  .active {
    color: #fff;
    background: #0082ff;
  }
`;
const Contents = styled.div`
  padding: 20px 35px 44px;
  background: #e9e9e9;
  section {
    position: relative;
    overflow: hidden;
    ul {
      position: relative;
      display: flex;
      justify-content: space-between;
      left: 0%;
    }
    .left100 {
      left: -100%;
    }
    .left200 {
      left: -200%;
    }
    li {
      margin: 0 10px;
    }
    img {
      display: block;
    }
  }
`;

const BtnBox = styled.div`
  display: flex;
  justify-content: space-between;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 100%;
  padding: 0 12px;
`;

const GradeList = styled.ul`
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 0 14px;
  li {
    padding: 18px 30px;
    border: 1px solid #404040;
    border-radius: 8px;
    font-size: 16px;
    /* font-weight: 500; */
    cursor: pointer;
  }
  .active {
    background: #404040;
    color: #fff;
  }
`;

const InfoList = styled.ul`
  width: 100%;
  padding: 0 14px;
  h3 {
    /* font-weight: 500; */
    margin: 20px 0 8px;
  }
  ul {
    li {
      width: 100%;
      list-style: disc;
      font-size: 14px;
      color: #747474;
      margin-left: 14px;
      line-height: 1.5;
    }
  }
  .active {
    display: block;
  }
`;

const List = styled.li`
  display: none;
`;
