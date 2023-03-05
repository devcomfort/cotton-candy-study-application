import { useState } from "react";

// Global States
import { useRecoilState } from "recoil";
import { roomNumberSet, IsFeedBackModal } from "../store";

// components
import {
  FeedBackContainer,
  FeedBackTitle,
  FeedBackSelect,
  FeedBackOption,
  FeedBackForm,
  FeedBackInputData,
  FeedBackFooter,
  FeedBackPostBtn,
  FeedBackCancleBtn,
} from "../styles/components/FeedBackModal";

interface ModalType {
  userDataArr: string[];
}

const FeedBackModal = (props: ModalType) => {
  const [text, setText] = useState("");
  const [roomNum, setRoomNum] = useRecoilState(roomNumberSet);
  const [feedBackUserList, setFeedBackUserList] = useState(props.userDataArr[0]);
  // 피드백 모달 여부 확인
  const [modal, setModal] = useRecoilState(IsFeedBackModal);

  // 유저리스트 셀렉 함수
  const selectedUserList = (e: React.ChangeEvent<HTMLSelectElement>) => setFeedBackUserList(e.target.value);

  // 피드백 POST API
  const submitFeedBackPost = async (e: React.FormEvent) => {
    e.preventDefault();
    const myName = localStorage.getItem("StudyName");
    await fetch("http://localhost:3002/feadback/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        roomCode: roomNum,
        giverName: myName,
        evaluatedName: feedBackUserList,
        message: text,
      }),
    });
    alert(`${myName}님 ${feedBackUserList}님 에게 피드백을 남겼습니다 !`);
    setText("");
  };

  // textarea value state에 저장
  const feedBackInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => setText(e.target.value);

  // 상위 컴포넌트 페이지인 Roulette, LotsBox 셋팅된 함수를 호출하여 state의 반대값을 저장하여 모달을 닫는 함수
  const handleCloseFeedBackModal = () => setModal(false);

  return (
    <FeedBackContainer>
      <FeedBackTitle>
        피드백 전송하기
        <FeedBackSelect onChange={selectedUserList}>
          {props.userDataArr?.map((data, i) => (
            <FeedBackOption key={i}>{data}</FeedBackOption>
          ))}
        </FeedBackSelect>
        <FeedBackForm onSubmit={submitFeedBackPost}>
          <FeedBackInputData onChange={feedBackInput} value={text} />
          <FeedBackFooter>
            {text.length === 0 ? <FeedBackPostBtn className="post_disabled">피드백 전송</FeedBackPostBtn> : <FeedBackPostBtn>피드백 전송</FeedBackPostBtn>}
            <FeedBackCancleBtn onClick={handleCloseFeedBackModal}>닫기</FeedBackCancleBtn>
          </FeedBackFooter>
        </FeedBackForm>
      </FeedBackTitle>
    </FeedBackContainer>
  );
};

export default FeedBackModal;
