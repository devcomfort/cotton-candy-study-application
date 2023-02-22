import { useState } from "react";
import { Wheel } from "react-custom-roulette";

const Roulette = () => {
  const [mustSpin, setMustSpin] = useState<boolean>(false);
  const [prizeNumber, setPrizeNumber] = useState(0);

  // 더미데이터
  const userInfo = [{ option: "1.솜사탕" }, { option: "2.비니루" }, { option: "3.데브" }, { option: "4.준서" }, { option: "5.혜린" }];

  const [userData, setUserData] = useState(userInfo);

  const handleSpinClick = () => {
    const newPrizeNumber = Math.floor(Math.random() * userData.length);
    setPrizeNumber(newPrizeNumber);
    setMustSpin(true);
    console.log("당첨자의 인덱싱", newPrizeNumber);
  };

  const deleteArrayClick = () => {
    userData.splice(prizeNumber, 1);
    setUserData([...userData]);
    console.log("삭제자의 인덱싱", prizeNumber);
    console.log("삭제후 유저데이터", userData);
  };

  // 돌리기 누르고 당첨자 나올시 모달창 뛰우고 모달창 닫으면 배열 삭제,
  // 모달창을 닫았을때 배열이 1개이면 모달 바로 뛰워서 당첨자 발표.

  return (
    <div>
      <Wheel
        mustStartSpinning={mustSpin}
        onStopSpinning={() => setMustSpin(false)}
        prizeNumber={prizeNumber}
        data={userData}
        backgroundColors={["#3e3e3e", "#df3428", "blue", "yellow"]}
        textColors={["#ffffff"]}
        spinDuration={0.1}
      />
      <button onClick={handleSpinClick}>돌리기</button>
      <button onClick={deleteArrayClick}>삭제</button>
    </div>
  );
};

export default Roulette;
