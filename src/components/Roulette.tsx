import { useState } from "react";
import { Wheel } from "react-custom-roulette";

const Roulette = () => {
  const [mustSpin, setMustSpin] = useState<boolean>(false);
  const [prizeNumber, setPrizeNumber] = useState(0);

  // 더미데이터
  const data2 = [
    { option: "1.솜사탕", style: { backgroundColor: "green" } },
    { option: "2.비니루", style: { backgroundColor: "darkgrey" } },
    { option: "3.데브" },
    { option: "4.준서" },
    { option: "5.혜린" },
  ];

  const handleSpinClick = () => {
    const newPrizeNumber = Math.floor(Math.random() * data2.length);
    setPrizeNumber(newPrizeNumber);
    setMustSpin(true);
    console.log(newPrizeNumber + 1);
  };

  const deleteArryClick = () => {
    console.log(prizeNumber + 1);
    data2.splice(prizeNumber + 1, 1);
  };

  return (
    <div>
      <Wheel
        mustStartSpinning={mustSpin}
        onStopSpinning={() => setMustSpin(false)}
        prizeNumber={prizeNumber}
        data={data2}
        backgroundColors={["#3e3e3e", "#df3428", "blue", "yellow"]}
        textColors={["#ffffff"]}
        spinDuration={Math.random() * 0.8}
      />
      <button onClick={handleSpinClick}>돌리기</button>
      <button onClick={deleteArryClick}>삭제</button>
    </div>
  );
};

export default Roulette;
