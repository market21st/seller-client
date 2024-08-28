import styled from "styled-components";

const RandomColorOverlay = () => {
  return (
    <Container>
      <TextWrap>랜덤컬러</TextWrap>
    </Container>
  );
};

export default RandomColorOverlay;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
  width: 50px;
  height: 50px;
  background: linear-gradient(
    0deg,
    rgba(255, 255, 255, 0.2) 0%,
    rgba(255, 255, 255, 0.2) 100%
  );
`;

const TextWrap = styled.div`
  padding: 3px 5px;
  border-radius: 2px;
  border: 1px solid #1d2840;
  background: #fff;
  color: #1d2840;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: -0.4px;
`;
