import { useState } from "react";
import { useNavigate } from "react-router-dom";

// Global States
import { roomNumberSet } from "../store";
import { useRecoilState } from "recoil";

// assets
import LobbyImg from "./LobbyImg";

// components
import InviteModal from "./InviteModal";

// styles
import { LoginInfoWrapper, LoginUserName, LoginCreateJoinWrapper, LoginCreateRoom, LoginEnterRoomIn, LoginSearchFeedBack } from "../styles/components/Logged";

interface StorageType {
  storageName: string;
}

const Logged = (props: StorageType) => {
  const userName = localStorage.getItem("StudyName");
  const [roomNum, setRoomNum] = useRecoilState(roomNumberSet);
  const [activityModal, setActivityModal] = useState(false);

  const path = useNavigate();

  // 백엔드로 방생성 API Post 함수
  const pathCreateRoom = async () => {
    const data = await fetch("http://localhost:3002/api/rooms", {
      method: "POST",
    });
    const json = await data.json();
    setRoomNum(json.inviteCode);
    path(`/rooms/:${json.inviteCode}`);
  };

  // URl 경로 /feedback으로 이동하는 함수
  const pathFeedBack = () => path("/feedback");

  /** 스터디룸 입장모달 활성화
   * state의 기존값을 반대로 저장하며, InviteModal 컴포넌트 props로 전달해준다.
   */
  const handleActivityModalBtn = () => setActivityModal((prev) => !prev);

  return (
    <>
      {activityModal && <InviteModal handleActivityModalBtn={handleActivityModalBtn} />}
      <LobbyImg />
      <LoginInfoWrapper>
        <LoginUserName>{userName}님, 환영합니다.</LoginUserName>
        <LoginCreateJoinWrapper>
          <LoginCreateRoom onClick={pathCreateRoom}>새로운 스터디룸 생성하기</LoginCreateRoom>
          <LoginEnterRoomIn onClick={handleActivityModalBtn}>친구들의 스터디룸 입장하기 (초대코드)</LoginEnterRoomIn>
          <LoginSearchFeedBack onClick={pathFeedBack}>피드백 검색하기</LoginSearchFeedBack>
        </LoginCreateJoinWrapper>
      </LoginInfoWrapper>
    </>
  );
};

export default Logged;
