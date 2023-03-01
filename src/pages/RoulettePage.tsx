import { useState } from "react";

// library
import { Wheel } from "react-custom-roulette";
import { useNavigate } from "react-router-dom";

// components
import FeedBackModal from "../components/FeedBackModal";

// styles
import { RouletteWrapper, RuletteBtnWrap, RuletteGoRootBtn } from "../styles/pages/RoulettePage";

interface UserType {
  userDataArr: string[];
}

interface UserData {
  option: string;
}

const RoulettePage = ({ userDataArr }: UserType) => {
  // spin start or stop state
  const [mustSpin, setMustSpin] = useState(false);
  // 당첨자의 배열 인덱싱
  const [prizeNumber, setPrizeNumber] = useState(0);
  // 피드백 모달 활성화 여부 state
  const [isInFeedBackModal, setIsInFeedBackModal] = useState(false);

  // props로 전달받은 소켓유저 가공 데이터
  const userOptions: UserData[] = userDataArr.map((userData) => ({ option: userData }));
  // 가공된 데이터를 State에 저장
  const [userData, setUserData] = useState(userOptions);

  const path = useNavigate();

  // 룰렛 스핀 시작함수
  const handleSpinClick = () => {
    userData.length === 0 && alert("1명은 룰렛을 돌릴수가 없습니다.");
    const newPrizeNumber = Math.floor(Math.random() * userData.length);
    setPrizeNumber(newPrizeNumber);
    setMustSpin(true);
    setTimeout(() => {
      alert(`당첨자 : ${userData[newPrizeNumber].option}`);
      deleteArrayClick(newPrizeNumber);
    }, 3800);
  };

  // 당첨자가 나올시, 해당 당첨자를 배열에서 삭제하는 함수
  const deleteArrayClick = (newPrizeNumber: number) => {
    userData.splice(newPrizeNumber, 1);
    setUserData([...userData]);

    if (userData.length === 1) {
      alert(`마지막 당첨자 ${userData[0].option}`);
      userData.splice(0, 1);
      return setUserData([...userData]);
    }
  };

  // 피드백 모달 클릭시, 모달 생성, FeedBackModal 컴포넌트로 props 전달
  const handleFeedBackBtn = () => setIsInFeedBackModal((prev) => !prev);

  const goRoot = () => path("/");

  return (
    <RouletteWrapper>
      {isInFeedBackModal && <FeedBackModal isInFeedBackModal={handleFeedBackBtn} userDataArr={userDataArr} />}
      <Wheel
        mustStartSpinning={mustSpin}
        onStopSpinning={() => setMustSpin(false)}
        prizeNumber={prizeNumber}
        data={userData}
        backgroundColors={["#3e3e3e", "#df3428", "blue", "green", "orange", "teal"]}
        textColors={["#ffffff"]}
        spinDuration={0.3}
      />
      {userData.length === 0 ? (
        <RuletteBtnWrap onClick={handleFeedBackBtn}>발표자 피드백 남기기</RuletteBtnWrap>
      ) : (
        <RuletteBtnWrap onClick={handleSpinClick}>돌리기</RuletteBtnWrap>
      )}
      <RuletteGoRootBtn onClick={goRoot}>나가기</RuletteGoRootBtn>
    </RouletteWrapper>
  );
};

export default RoulettePage;
