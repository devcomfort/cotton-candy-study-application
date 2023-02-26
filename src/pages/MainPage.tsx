import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { activeModal, roomNumberSet } from "../store";
import { ApplicationTitle } from "../styles/components/ApplicationTitle";
import {
  ContentsWrap,
  Drawing,
  InviteCodeBtn,
  MainPageBtnWrap,
  MainTitle,
  MainTitleWrap,
  MainWrap,
  MemberHistory,
  MemberList,
  RoomExitBtn,
  RouletteBtn,
} from "../styles/pages/MainPage";
import { io } from "socket.io-client";
import { useNavigate } from "react-router-dom";

const MainPage = () => {
  const [roomNum, setRoomNum] = useRecoilState(roomNumberSet);
  const [activityModal, setActivityModal] = useRecoilState(activeModal);
  const [msg, setMsg] = useState([""]);
  const path = useNavigate();

  const socket = io("http://localhost:3002", {
    transports: ["websocket"],
  });

  useEffect(() => {
    const userNickname = localStorage.getItem("StudyName");
    const inviteCode = window.location.pathname.substring(8);
    socket.emit("enterRoom", inviteCode, userNickname);
    socket.on("welcome", (data) => {
      return setMsg(data);
    });
    setRoomNum(inviteCode);
  });

  const fetchMemberList = () => {
    // 백엔드에서 방에 입장한 사람들 목록 받아오기
    return;
  };

  const onLeaveRoom = () => {
    // 소켓 io 방 나가기
    path("/");
  };

  const copyInviteCode = async () => {
    const inviteCode = window.location.pathname.substring(8);
    await navigator.clipboard.writeText(`${inviteCode}`);
    alert("초대 링크 복사 완료!");
  };

  // 룰렛 페이지로 가기
  const goRoulette = () => {
    path("/random/roulette");
  };

  // 제비뽑기 페이지로 가기
  const goLots = () => {
    path("/random/lots");
  };

  /** 스터디룸 입장모달 활성화 */
  const handleModalShowBtn = () => setActivityModal(true);

  return (
    <MainWrap>
      <ApplicationTitle>발표도우미</ApplicationTitle>
      <MainTitleWrap>
        <MainTitle>
          <div>스터디 방 {roomNum}</div>
          <RoomExitBtn onClick={onLeaveRoom}>방 나가기</RoomExitBtn>
        </MainTitle>
        <InviteCodeBtn onClick={copyInviteCode}>초대 링크 복사</InviteCodeBtn>
      </MainTitleWrap>
      <ContentsWrap>
        <MemberList>
          <strong>유저 리스트</strong>
          <div onClick={handleModalShowBtn} style={{ cursor: "pointer" }}>
            이름
          </div>
        </MemberList>
        <MemberHistory>
          <div>{msg}</div>
        </MemberHistory>
      </ContentsWrap>
      {/** 방장(rank 1)만 보이는 버튼 */}
      <MainPageBtnWrap>
        <RouletteBtn onClick={goRoulette}>룰렛 돌리기</RouletteBtn>
        <Drawing onClick={goLots}>제비 뽑기</Drawing>
      </MainPageBtnWrap>
    </MainWrap>
  );
};

export default MainPage;
