import styled from "@emotion/styled";

// 전체 wrap
export const RouletteWrapper = styled.div`
  max-width: 860px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 1rem;
  overflow: hidden;
  .FeedBackPost {
    background-color: #fcc1aa;
    font-weight: bold;
  }
`;

export const WheelWrap = styled.div`
  display: flex;
  margin: 4rem 0;
`;

// 발표자 피드백 남기기 / 룰렛 돌리기 버튼
export const ButtonWrap = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-top: 2rem;
`;

export const RuletteBtn = styled.button`
  padding: 1rem;
  font-weight: 600;
  background-color: #fce9aa;
  border-radius: 0.5rem;
  text-align: center;
  margin-bottom: 1rem;
`;

export const RuletteGoRootBtn = styled.button`
  padding: 1rem;
  font-weight: 600;
  background-color: #d6dbff;
  border-radius: 0.5rem;
  text-align: center;
`;
