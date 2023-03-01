import { useNavigate } from "react-router-dom";
import LobbyImg from "./LobbyImg";
import { LoginInfoWrapper, LoginUserName, LoginCreateJoinWrapper, LoginCreateRoom, LoginEnterRoomIn, LoginSearchFeedBack } from "../styles/components/Logged";

import { activeModal, roomNumberSet } from "../store";
import { useRecoilState } from "recoil";

import io from "socket.io-client";

import InviteModal from "./InviteModal";
import { useState } from "react";
interface StorageType {
  storageName: string;
}

const Logged = (props: StorageType) => {
  const userName = localStorage.getItem("StudyName");
  const [roomNum, setRoomNum] = useRecoilState(roomNumberSet);
  const [activityModal, setActivityModal] = useRecoilState(activeModal);

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

  const pathFeedBack = () => path("/feedback");

  /** 스터디룸 입장모달 활성화 */
  const handleModalShowBtn = () => setActivityModal(true);

  return (
    <>
      {activityModal && <InviteModal />}
      <LobbyImg />
      <LoginInfoWrapper>
        <LoginUserName>{userName}님, 환영합니다.</LoginUserName>
        <LoginCreateJoinWrapper>
          <LoginCreateRoom onClick={pathCreateRoom}>새로운 스터디룸 생성하기</LoginCreateRoom>
          <LoginEnterRoomIn onClick={handleModalShowBtn}>친구들의 스터디룸 입장하기 (초대코드)</LoginEnterRoomIn>
          <LoginSearchFeedBack onClick={pathFeedBack}>피드백 검색하기</LoginSearchFeedBack>
        </LoginCreateJoinWrapper>
      </LoginInfoWrapper>
    </>
  );
};

export default Logged;
