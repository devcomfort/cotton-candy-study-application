import { useState } from "react";
import Confetti from "react-confetti";
import {
  LotsBoxWrap,
  LotsBtn,
  DefaultLotsBox,
  ShakingLotsBox,
} from "../styles/components/LotsBox";

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

  return (
    <LotsBoxWrap>
      <h1>제비 뽑기</h1>
      {isShakeConfetti ? <Confetti recycle={false} gravity={0.5} /> : null}
      {isShakeBox ? <ShakingLotsBox /> : <DefaultLotsBox />}
      {userData.length === 0 ? null : (
        <div style={{ width: "100%", display: "flex" }}>
          <LotsBtn onClick={onShakeBox}>제비뽑기 시작</LotsBtn>
        </div>
      )}
      {/* 뽑힌 사람들 보여주기 */}
      {pickupData.map((item, i) => (
        <span key={i}>{item}</span>
      ))}
      {/* @솜사탕 작업할 곳 :: 다 뽑히고나면 피드백 모달창 출력 */}
      {userData.length === 0 ? <></> : null}
    </LotsBoxWrap>
  );
};

export default LotsBox;
