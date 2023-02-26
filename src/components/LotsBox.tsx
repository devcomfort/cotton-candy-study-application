import { useEffect, useState } from "react";
import Confetti from "react-confetti";
import { LotsBoxWrap, LotsBtn, DefaultLotsBox, ShakingLotsBox } from "../styles/components/LotsBox";
// import LotsFinishedModal from "./LotsFinishedModal";

const LotsBox = () => {
  // 상자 흔들거리는 state
  const [isShakeBox, setIsShakeBox] = useState(false);

  // 하늘에서 이펙트가 떨어지는거
  const [isShakeConfetti, setIsShakeConfetti] = useState(false);

  // dummy data
  const dummyUserArray = [{ name: "1. 솜사탕" }, { name: "2. 데브컴포트" }, { name: "3. 준서킴" }, { name: "4. 혜린" }, { name: "5. 비니루" }];

  const [userData, setUserData] = useState(dummyUserArray);
  const [userIdx, setUserIdx] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [pickupData, setPickupData] = useState([""]);

  const onShakeBox = () => {
    setIsShakeBox(true);
    setIsShakeConfetti(true);
    setIsFinished(true);
    setTimeout(() => {
      removeUserData();
    }, 2500);
  };

  // remove user data
  const removeUserData = () => {
    const userLength = userData.length - 1;
    setIsShakeConfetti(false);
    setIsShakeBox(false);
    if (userLength === 0) {
      // 모두 뽑혔을때의 로직 추가
      alert(`모두 뽑힘, 마지막 ${userData[userLength].name}`);
      return;
    }
    setUserIdx(Math.floor(Math.random() * userLength));
    alert(`뽑힌 사람 : ${userData[userIdx].name}`);
    userData.splice(userIdx, 1);
    setUserData([...userData]);
    setPickupData([userData[userIdx].name, ...pickupData]);
  };

  return (
    <LotsBoxWrap>
      {isFinished && <Confetti recycle={isShakeConfetti} gravity={0.3} />}

      <h1>제비 뽑기</h1>
      {userData.map((items, i) => (
        <span key={i}>{items.name}</span>
      ))}
      {isShakeBox ? <ShakingLotsBox /> : <DefaultLotsBox />}
      <div style={{ width: "100%", display: "flex" }}>
        <LotsBtn onClick={onShakeBox}>제비뽑기 시작</LotsBtn>
      </div>
    </LotsBoxWrap>
  );
};

export default LotsBox;
