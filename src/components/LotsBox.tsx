import { useState } from "react";

// Global States
import { useRecoilState } from "recoil";
import { IsFeedBackModal } from "../store";

// library
import Confetti from "react-confetti";
import { useNavigate } from "react-router-dom";

// components
import FeedBackModal from "../components/FeedBackModal";

// styles
import { LotsBoxWrap, LotsBtn, DefaultLotsBox, ShakingLotsBox } from "../styles/components/LotsBox";

interface UserType {
  userDataArr: string[];
}

const LotsBox = ({ userDataArr }: UserType) => {
  // Box의 흔들림을 체크하는 state
  const [isShakeBox, setIsShakeBox] = useState(true);
  // 뽑히는 user의 인덱스 state
  const [userIdx, setUserIdx] = useState(0);
  // Confetti(폭죽) 체크하는 state
  const [isShakeConfetti, setIsShakeConfetti] = useState(false);
  // props로 전달된 userDataArr을 state로 저장
  const [userData, setUserData] = useState(userDataArr);
  // 뽑힌 사람들이 역순으로 들어간 배열 state
  const [pickupData, setPickupData] = useState<string[]>([]);
  // 피드백 모달 여부 확인
  const [isActivityFeedBackModal, setIsActivityFeedBackModal] = useRecoilState(IsFeedBackModal);

  const path = useNavigate();

  // 박스가 흔들릴때의 함수
  const onShakeBox = () => {
    // 박스 흔들림 state -> true로 변경
    setIsShakeBox(true);
    // Confetti 터짐 state -> true로 변경
    setIsShakeConfetti(true);
    // 2초 뒤에 userDataArr에서 뽑힌 유저 삭제 함수 실행
    setTimeout(() => {
      removeUserData();
    }, 2000);
  };

  // userDataArr에서 뽑힌 유저 삭제하는 함수
  const removeUserData = () => {
    // userLength로 관련 로직 계산
    const userLength = userData.length - 1;
    // 뽑혔을때 Confetti 터짐 state -> false로 변경
    setIsShakeConfetti(false);
    // 뽑혔을때 박스 흔들림 state -> false로 변경
    setIsShakeBox(false);
    // userDataArr의 길이만큼 랜덤으로 인덱스 값 설정
    setUserIdx(Math.floor(Math.random() * userLength));
    // 뽑힌사람 알려주기
    alert(`뽑힌 사람 : ${userData[userIdx]}`);

    // userDataArr에 1명 남았을 때
    if (userLength === 0) {
      // pickupData에 마지막 남은 1명 추가
      setPickupData([userData[0], ...pickupData]);
      // userDataArra에 해당 인덱스 1명 제외
      userData.splice(userIdx, 1);
      // 제외한 데이터 저장
      setUserData([...userData]);
      return;
    }
    // 그 외
    // userDataArr[랜덤 인덱스] 유저값을 pickupData에 저장
    setPickupData([userData[userIdx], ...pickupData]);
    // userDataArra에 해당 인덱스 1명 제외
    userData.splice(userIdx, 1);
    // 제외한 데이터 저장
    setUserData([...userData]);
  };

  // 피드백 모달 클릭시, 모달 생성, FeedBackModal 컴포넌트로 props 전달
  const handleFeedBackBtn = () => setIsActivityFeedBackModal((prev) => !prev);

  const goRoot = () => path("/");

  return (
    <LotsBoxWrap>
      <h1>제비 뽑기</h1>
      {/* 1. 솜사탕 작업 목록  isInFeedBackModal 값에 따라 피드백 컴포넌트 렌더링 */}
      {isActivityFeedBackModal && <FeedBackModal userDataArr={pickupData} />}
      {isShakeConfetti ? <Confetti recycle={false} gravity={0.5} /> : null}
      {isShakeBox ? <ShakingLotsBox /> : <DefaultLotsBox />}
      {userData.length === 0 ? (
        // userData.length 값이 0일시 피드백을 남길수 있는 함수 컴포넌트로 렌더링
        <div style={{ width: "100%", display: "flex", justifyContent: "space-between" }}>
          <LotsBtn onClick={handleFeedBackBtn}>피드백 남기기</LotsBtn>
          <LotsBtn onClick={goRoot}>나가기</LotsBtn>
        </div>
      ) : (
        <div style={{ width: "100%", display: "flex", justifyContent: "space-between" }}>
          <LotsBtn onClick={onShakeBox}>제비뽑기 시작</LotsBtn>
          <LotsBtn onClick={goRoot}>나가기</LotsBtn>
        </div>
      )}
      {/* 뽑힌 사람들 보여주기 */}
      {pickupData.map((item, i) => (
        <span key={i}>{item}</span>
      ))}
    </LotsBoxWrap>
  );
};

export default LotsBox;
