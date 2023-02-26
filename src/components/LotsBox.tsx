import { useEffect, useState } from "react";
import Confetti from "react-confetti";
import {
  LotsBoxWrap,
  LotsBtn,
  DefaultLotsBox,
  ShakingLotsBox,
} from "../styles/components/LotsBox";
import LotsFinishedModal from "./LotsFinishedModal";

const LotsBox = () => {
  const [isShakeBox, setIsShakeBox] = useState(true);
  const [isShakeConfetti, setIsShakeConfetti] = useState(false);

  // dummy data
  const dummyUserArray = [
    { name: "1. 솜사탕" },
    { name: "2. 데브컴포트" },
    { name: "3. 준서킴" },
    { name: "4. 혜린" },
    { name: "5. 비니루" },
  ];

  const [userData, setUserData] = useState(dummyUserArray);
  const [userIdx, setUserIdx] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const onShakeBox = () => {
    setInterval(() => setIsShakeBox(true), 3000);
    setIsShakeBox(false);
    setInterval(() => setIsShakeConfetti(true), 1000);
    removeUserData();
  };

  // remove user data
  const removeUserData = () => {
    const userLength = userData.length - 1;
    setIsShakeBox(false);
    if (userLength === 0) {
      // 모두 뽑혔을때의 로직 추가
      alert(`모두 뽑힘, 마지막 ${userData[userLength].name}`);
      setIsFinished(true);
      return;
    }
    setUserIdx(Math.floor(Math.random() * userLength));
    alert(`뽑힌 사람 : ${userData[userIdx].name}`);
    userData.splice(userIdx, 1);
    setUserData([...userData]);
  };

  useEffect(() => {
    // 데이터로 가져옴
  }, [isShakeConfetti]);

  return (
    <LotsBoxWrap>
      {isShakeConfetti ? <Confetti recycle={false} gravity={0.3} /> : null}
      <h1>제비 뽑기</h1>
      {userData.map((items, i) => (
        <span key={i}>{items.name}</span>
      ))}
      {isShakeBox ? <ShakingLotsBox /> : <DefaultLotsBox />}
      <div style={{ width: "100%", display: "flex" }}>
        <LotsBtn onClick={onShakeBox}>제비뽑기 시작</LotsBtn>
      </div>
      {isFinished ? <LotsFinishedModal props={!!isFinished} /> : null}
    </LotsBoxWrap>
  );
};

export default LotsBox;
