import styled from "@emotion/styled";

export const MainWrap = styled.div`
  max-width: 860px;
  display: flex;
  align-items: center;
  margin: 0 auto;
  flex-direction: column;
  padding: 0 1rem;
`;

export const MainTitleWrap = styled.div`
  display: flex;
  width: 100%;
  font-weight: 600;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 0;
  border-bottom: 1px solid #ebebeb;
`;

export const RoomExitBtn = styled.button`
  display: flex;
  border: 1px solid #333;
  color: white;
  background-color: #414141;
  border-radius: 0.5rem;
  padding: 0.6rem 1rem;
`;

export const InviteCodeBtn = styled.button`
  display: flex;
  border: 1px solid #ccc;
  background-color: #eeeeee;
  padding: 0.4rem 0.6rem;
  margin-left: 1rem;
  font-size: 12px;
`;

// 유저 리스트 + 히스토리
export const ContentsWrap = styled.div`
  width: 100%;
  height: 60vh;
  display: flex;
  flex-direction: row;
  margin-bottom: 1rem;
  border-bottom: 1px solid #ebebeb;
`;

// 좌측 유저 리스트
export const MemberList = styled.div`
  width: 30%;
  display: flex;
  justify-content: left;
  flex-direction: column;
  text-align: left;
  color: #222;
  overflow: auto;
  padding-top: 1rem;
`;

export const UserInfo = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-bottom: 0.5rem;
`;

// 우측 입장, 퇴장 히스토리
export const MemberHistory = styled.div`
  width: 70%;
  display: flex;
  flex-direction: column;
  justify-content: left;
  color: #666;
  font-size: 0.9rem;
  overflow: auto;
  border-left: 1px solid #ebebeb;
  padding-top: 1rem;

  > :nth-of-type(1n) {
    margin: 0 1rem 0.5rem 1rem;
  }
`;

export const Captin = styled.span`
  border: 1px solid #ac3939;
  border-radius: 0.4rem;
  font-size: 12px;
  color: white;
  background-color: #ff4d4d;
  padding: 0.2rem 0.4rem;
  margin-left: 1rem;
`;

// 하단 버튼
export const MainPageBtnWrap = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  .norank {
    cursor: default;
    margin-bottom: 10px;
  }
`;

export const RouletteBtn = styled.button`
  padding: 1rem;
  font-weight: 600;
  background-color: #d6dbff;
  border-radius: 0.5rem;
  margin-bottom: 0.5rem;
`;

// 제비 뽑기 버튼
export const Drawing = styled.button`
  padding: 1rem;
  font-weight: 600;
  background-color: #fce9aa;
  border-radius: 0.5rem;
`;

export const DrawingDisabled = styled.button`
  padding: 1rem;
  border: 1px solid #ccc;
  background-color: #ebebeb;
  border-radius: 0.5rem;
  color: #ccc;
`;

export const Label = styled.span`
  background-color: #ffffff;
  border-radius: 4px;
  border: 1px solid #00b7ff;
  color: #00b7ff;
  font-size: 12px;
  padding-left: 4px;
  padding-right: 4px;
  margin-left: 0.5rem;
`;
