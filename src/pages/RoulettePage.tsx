import { useState } from "react";

// library
import { Wheel } from "react-custom-roulette";
import { useNavigate } from "react-router-dom";

// Global States
import { useRecoilState } from "recoil";
import { IsFeedBackModal } from "../store";

// components
import FeedBackModal from "../components/FeedBackModal";

// styles
import {
  ButtonWrap,
  RouletteWrapper,
  RuletteBtn,
  RuletteGoRootBtn,
  WheelWrap,
} from "../styles/pages/RoulettePage";
import { ApplicationTitle } from "../styles/components/ApplicationTitle";

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

  // props로 전달받은 소켓유저 가공 데이터
  const userOptions: UserData[] = userDataArr.map((userData) => ({
    option: userData,
  }));
  // 가공된 데이터를 State에 저장
  const [userData, setUserData] = useState(userOptions);

  // 당첨자 저장되는 배열 state
  const [resultData, setResultData] = useState<string[]>([]);

  // 피드백 모달 여부 확인
  const [modal, setModal] = useRecoilState(IsFeedBackModal);

  const path = useNavigate();

  // 룰렛 스핀 시작함수
  const handleSpinClick = () => {
    userData.length === 0 && alert("1명은 룰렛을 돌릴수가 없습니다.");
    const newPrizeNumber = Math.floor(Math.random() * userData.length);
    setPrizeNumber(newPrizeNumber);
    setMustSpin(true);
    setTimeout(() => {
      alert(`이번 발표자 : ${userData[newPrizeNumber].option}`);
      deleteArrayClick(newPrizeNumber);
    }, 3800);
  };

  // 당첨자가 나올시, 해당 당첨자를 배열에서 삭제하는 함수
  const deleteArrayClick = (newPrizeNumber: number) => {
    userData.splice(newPrizeNumber, 1);
    setUserData([...userData]);

    if (userData.length === 1) {
      alert(`마지막 발표자 ${userData[0].option}`);
      userData.splice(0, 1);
      // 마지막 발표자 결과 데이터에 추가
      setResultData([...userData[0].option]);
      return setUserData([...userData]);
    }
    // 이번발표자 결과 데이터에 추가
    setResultData([...userData[newPrizeNumber].option]);
  };

  // 피드백 모달 true or false
  const handleFeedBackBtn = () => {
    setModal(true);
  };

  const goRoot = () => path("/");

  return (
    <RouletteWrapper>
      {modal && <FeedBackModal userDataArr={userDataArr} />}
      <ApplicationTitle>룰렛 돌리기</ApplicationTitle>
      <WheelWrap>
        {userData.length === 0 ? (
          <div style={{ height: "400px" }}>
            발표 순서 :
            <>
              {resultData.map((user, i) => {
                <div key={i}>{user}</div>;
              })}
            </>
          </div>
        ) : (
          <Wheel
            mustStartSpinning={mustSpin}
            onStopSpinning={() => setMustSpin(false)}
            prizeNumber={prizeNumber}
            data={userData}
            backgroundColors={[
              "#3e3e3e",
              "#df3428",
              "blue",
              "green",
              "orange",
              "teal",
            ]}
            textColors={["#ffffff"]}
            spinDuration={0.3}
          />
        )}
      </WheelWrap>
      <ButtonWrap>
        {userData.length === 0 ? (
          <RuletteBtn className="FeedBackPost" onClick={handleFeedBackBtn}>
            발표자 피드백 남기기
          </RuletteBtn>
        ) : (
          <RuletteBtn onClick={handleSpinClick}>돌리기</RuletteBtn>
        )}
        <RuletteGoRootBtn onClick={goRoot}>나가기</RuletteGoRootBtn>
      </ButtonWrap>
    </RouletteWrapper>
  );
};

export default RoulettePage;
