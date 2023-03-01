import { useState } from "react";
import { Wheel } from "react-custom-roulette";

import { RouletteWrapper, RuletteBtnWrap } from "../styles/pages/RoulettePage";

interface UserType {
  userDataArr: string[];
}

const RoulettePage = ({ userDataArr }: UserType) => {
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);

  // 더미데이터
  const userInfo = [{ option: "솜사탕" }, { option: "비니루" }, { option: "데브" }, { option: "준서" }, { option: "혜린" }];
  const [userData, setUserData] = useState(userInfo);

  const handleSpinClick = () => {
    const newPrizeNumber = Math.floor(Math.random() * userData.length);
    setPrizeNumber(newPrizeNumber);
    setMustSpin(true);
    setTimeout(() => {
      alert(`당첨자 : ${userData[newPrizeNumber].option}`);
      deleteArrayClick(newPrizeNumber);
    }, 1500);
  };

  const deleteArrayClick = (newPrizeNumber: number) => {
    userData.splice(newPrizeNumber, 1);
    setUserData([...userData]);

    if (userData.length === 1) {
      alert(`마지막 당첨자 ${userData[0].option}`);
      userData.splice(0, 1);
      return setUserData([...userData]);
    }
  };

  console.log(userData.length);

  // 돌리기 누르고 당첨자 나올시 모달창 뛰우고 모달창 닫으면 배열 삭제,
  // 모달창을 닫았을때 배열이 1개이면 모달 바로 뛰워서 당첨자 발표.

  return (
    <RouletteWrapper>
      <Wheel
        mustStartSpinning={mustSpin}
        onStopSpinning={() => setMustSpin(false)}
        prizeNumber={prizeNumber}
        data={userData}
        backgroundColors={["#3e3e3e", "#df3428", "blue", "green", "orange", "teal"]}
        textColors={["#ffffff"]}
        spinDuration={0.1}
      />
      <RuletteBtnWrap>
        <button onClick={handleSpinClick}>돌리기</button>
      </RuletteBtnWrap>
    </RouletteWrapper>
  );
};

export default RoulettePage;
