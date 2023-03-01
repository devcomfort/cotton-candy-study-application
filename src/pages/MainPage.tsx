import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { roomNumberSet } from "../store";
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
  const [userMsg, setUserMsg] = useState([localStorage.getItem("StudyName")]);
  const path = useNavigate();

  const socket = io("http://localhost:3002", {
    transports: ["websocket"],
  });

  useEffect(() => {
    // 사파리에서 접속했을경우 방장이 안뜸
    socket.on("welcome", (userMsg: string) => {
      setUserMsg((defaultUser) => {
        return [...defaultUser, userMsg];
      });
    });
    socket.on("bye", (userName: string) => {
      const userList = userMsg.filter((data) => data !== userName);
      setUserMsg([...userList]);
    });
  }, []);

  useEffect(() => {
    const inviteCode = window.location.pathname.substring(8);
    const userName = localStorage.getItem("StudyName");
    socket.emit("enterRoom", inviteCode, userName);

    setRoomNum(inviteCode);
  }, []);

  // 초대코드 복사 기능
  const copyInviteCode = async () => {
    const inviteCode = window.location.pathname.substring(8);
    await navigator.clipboard.writeText(`${inviteCode}`);
    alert("초대 코드 복사 완료!");
  };

  // 소켓 io 방 나가기
  const onLeaveRoom = () => {
    path("/");
  };

  // 룰렛 페이지로 가기
  const goRoulette = () => {
    path("/random/roulette");
  };

  // 제비뽑기 페이지로 가기
  const goLots = () => {
    path("/random/lots");
  };

  return (
    <MainWrap>
      <ApplicationTitle>발표도우미</ApplicationTitle>
      <MainTitleWrap>
        <MainTitle>
          <div>스터디 방 {roomNum}</div>
          <RoomExitBtn onClick={onLeaveRoom}>방 나가기</RoomExitBtn>
        </MainTitle>
        <InviteCodeBtn onClick={copyInviteCode}>초대 코드 복사</InviteCodeBtn>
      </MainTitleWrap>
      <ContentsWrap>
        <MemberList>
          <strong>유저 리스트</strong>
          {/* {userMsg?.map((userName, i) => (
            <div key={i}>{userName}</div>
          ))} */}
        </MemberList>
        <MemberHistory>
          <div id="joinmsg"></div>
          {userMsg?.map((userName, i) => (
            <div key={i}>{`${userName}님이 입장하였습니다.`}</div>
          ))}
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
