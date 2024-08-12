import React, { useEffect, useState } from "react";
import { Modal } from "@mui/material";
import styled from "styled-components";
import closeIcon from "../../assets/close.png";
import nextIcon from "../../assets/next.png";
import prevIcon from "../../assets/prev.png";

const GradeModal = ({ isOpen, onClose }) => {
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
  const grades = ["S급", "A급", "B급"];

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
      sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
    >
      <ModalWrap>
        <button>
          <img src={closeIcon} alt="닫기" onClick={onClose} />
        </button>
        <CategoryList>
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
        </CategoryList>
        <Contents>
          {cetagoryNum > 1 ? null : (
            <ImageWrap>
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
            </ImageWrap>
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
          <ul>
            {/* S급 */}
            <Info className={num === 0 ? "active" : ""}>
              {cetagoryNum === 0 ? (
                <div>
                  <h3>무역업체 외관 기준 A ~ A- 외관 기준</h3>
                </div>
              ) : null}
              <div>
                <h3>외관 기준</h3>
                <ul>
                  <li>액정 : 기스 없음</li>
                  <li>외관 : 미세한 생활기스 가능</li>
                  <li>테두리 : 찍힘 없음</li>
                </ul>
              </div>
              <div>
                <h3>성능 기준</h3>
                <ul>
                  <li>배터리 효율 최소 80% 이상</li>
                  <li>전체 기능 및 성능 검수를 통과한 100% 정상 작동 기기</li>
                </ul>
              </div>
            </Info>
            {/* A급 */}
            <Info className={num === 1 ? "active" : ""}>
              {cetagoryNum === 0 ? (
                <div>
                  <h3>무역업체 외관 기준 A- ~ B+ 외관 기준</h3>
                </div>
              ) : null}
              <div>
                <h3>외관 기준</h3>
                <ul>
                  <li>액정 : 미세한 생활기스 가능</li>
                  <li>외관 : 1-2군데 스크래치 및 까짐 가능</li>
                  <li>테두리 : 미세한 까짐 및 약한 찍힘 가능</li>
                </ul>
              </div>
              <div>
                <h3>성능 기준</h3>
                <ul>
                  <li>배터리 효율 최소 80% 이상</li>
                  <li>전체 기능 및 성능 검수를 통과한 100% 정상 작동 기기</li>
                </ul>
              </div>
            </Info>
            {/* B급 */}
            <Info className={num === 2 ? "active" : ""}>
              {cetagoryNum === 0 ? (
                <div>
                  <h3>무역업체 외관 기준 B+ ~ B 외관 기준</h3>
                </div>
              ) : null}
              <div>
                <h3>외관 기준</h3>
                <ul>
                  <li>액정 : 약한 칼 기스, 약잔상 가능</li>
                  <li>외관 : 스크래치 및 까짐 가능</li>
                  <li>테두리 : 까짐과 찍힘 가능</li>
                </ul>
              </div>
              <div>
                <h3>성능 기준</h3>
                <ul>
                  <li>배터리 효율 최소 80% 이상</li>
                  <li>전체 기능 및 성능 검수를 통과한 100% 정상 작동 기기</li>
                </ul>
              </div>
            </Info>
          </ul>
        </Contents>
      </ModalWrap>
    </Modal>
  );
};

export default GradeModal;

const ModalWrap = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 450px;
  max-width: 90%;
  & > button {
    display: flex;
    position: absolute;
    top: 10px;
    right: 10px;
  }
`;

const CategoryList = styled.ul`
  background: #fff;
  display: flex;
  gap: 8px;
  padding: 50px 20px 10px;
  li {
    width: 100%;
    font-weight: 500;
    border-radius: 8px;
    padding: 10px;
    text-align: center;
    cursor: pointer;
  }
  li.active {
    color: #fff;
    background: #0082ff;
  }
`;

const Contents = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 20px;
  background: #e9e9e9;
`;

const ImageWrap = styled.div`
  position: relative;
  overflow: hidden;
  ul {
    position: relative;
    display: flex;
    left: 0%;
    &.left100 {
      left: -100%;
    }
    &.left200 {
      left: -200%;
    }
    img {
      width: 410px;
      object-fit: cover;
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
  button {
    padding: 10px;
  }
`;

const GradeList = styled.ul`
  display: flex;
  gap: 16px;
  li {
    width: 100%;
    font-weight: 500;
    border-radius: 8px;
    padding: 10px 20px;
    border: 1px solid #404040;
    text-align: center;
    cursor: pointer;
  }
  .active {
    background: #404040;
    color: #fff;
  }
`;

const Info = styled.li`
  display: none;
  flex-direction: column;
  gap: 16px;
  & > div {
    display: flex;
    flex-direction: column;
    gap: 8px;
    font-size: 14px;
    h3 {
      font-weight: 500;
    }
    li {
      color: #5a6080;
    }
  }
  &.active {
    display: flex;
  }
`;
