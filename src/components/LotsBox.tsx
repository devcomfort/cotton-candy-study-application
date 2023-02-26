import { useEffect, useState } from "react";
import Confetti from "react-confetti";
import {
  LotsBoxWrap,
  LotsBtn,
  DefaultLotsBox,
  ShakingLotsBox,
} from "../styles/components/LotsBox";

const LotsBox = () => {
  // dummy data
  const dummyUserArray = [
    { name: "1. 솜사탕" },
    { name: "2. 데브컴포트" },
    { name: "3. 준서킴" },
    { name: "4. 혜린" },
    { name: "5. 비니루" },
  ];

  const [isShakeBox, setIsShakeBox] = useState(true);
  const [isShakeConfetti, setIsShakeConfetti] = useState(false);
  const [userData, setUserData] = useState(dummyUserArray);
  const [userIdx, setUserIdx] = useState(0);
  const [pickupData, setPickupData] = useState<Array<string>>([]);

  const onShakeBox = () => {
    setIsShakeBox(true);
    setIsShakeConfetti(true);
    setTimeout(() => {
      removeUserData();
    }, 2000);
  };

  // remove user data
  const removeUserData = () => {
    const userLength = userData.length - 1;
    setIsShakeConfetti(false);
    setIsShakeBox(false);
    setUserIdx(Math.floor(Math.random() * userLength));
    alert(`뽑힌 사람 : ${userData[userIdx].name}`);
    if (userLength === 0) {
      // 모두 뽑혔을때의 로직 추가
      alert(`모두 뽑힘, 마지막 ${userData[userLength].name}`);
      setPickupData([userData[userIdx].name, ...pickupData]);
      userData.splice(userIdx, 1);
      setUserData([...userData]);
      // 모두 뽑혔을때 버튼 더이상 동작하지 않도록 삭제
      console.log(pickupData);
      return;
    }
    setPickupData([userData[userIdx].name, ...pickupData]);
    userData.splice(userIdx, 1);
    setUserData([...userData]);
  };

  useEffect(() => {
    // 데이터로 가져옴
  }, []);

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
      {/* 다 뽑히고 1명만 남는다면 피드백 모달창 출력 */}
      {userData.length === 0 ? <></> : null}
    </LotsBoxWrap>
  );
};

export default LotsBox;
