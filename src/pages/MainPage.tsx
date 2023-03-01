import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// Socket
import { io } from "socket.io-client";

// Global States
import { useRecoilState } from "recoil";
import { roomNumberSet } from "../store";

// styles
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

interface UserType {
  MainPageProps: (userList: string[]) => void;
}

const MainPage = ({ MainPageProps }: UserType) => {
  const [roomNum, setRoomNum] = useRecoilState(roomNumberSet);
  const [userMsg, setUserMsg] = useState([localStorage.getItem("StudyName")]);
  const [userList, setUserList] = useState<string[]>([]);
  const [isInGetExit, setIsInGetExit] = useState<boolean>(true);
  const path = useNavigate();

  const socket = io("http://localhost:3002", {
    transports: ["websocket"],
  });

  useEffect(() => {
    const inviteCode = window.location.pathname.substring(8);
    const userName = localStorage.getItem("StudyName");
    socket.emit("enterRoom", inviteCode, userName);
    socket.on("memberList", (members) => setUserList([...members]));
    setRoomNum(inviteCode);
    socket.on("welcome", (userMsg: string, members) => {
      setUserList([...members]);
      MainPageProps(members);
    });

    socket.on("bye", (userName: string) => {
      const userdata = userMsg.filter((data) => data !== userName);
      setUserList((prev: any) => {
        return [...prev, userdata];
      });
      setUserMsg(() => {
        const userdata = userMsg.filter((data) => data === userName);
        return userdata;
      });
    });
  }, []);

  // 초대코드 복사 기능
  const copyInviteCode = async () => {
    const inviteCode = window.location.pathname.substring(8);
    await navigator.clipboard.writeText(`${inviteCode}`);
    alert("초대 코드 복사 완료!");
  };

  // 소켓 io 방 나가기
  const onLeaveRoom = () => {
    const userName = localStorage.getItem("StudyName");
    const inviteCode = window.location.pathname.substring(8);
    // 방나갈시 유저닉네임, 방번호
    socket.emit("leave", userName, inviteCode);
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
          {userList?.map((userName, i) => (
            <div key={i}>{userName}</div>
          ))}
        </MemberList>
        <MemberHistory>
          <div id="joinmsg"></div>
          {isInGetExit
            ? userList?.map((userName, i) => <div key={i}>{`${userName}님이 입장하였습니다.`}</div>)
            : userMsg?.map((userName, i) => <div key={i}>{`${userName}님이 퇴장하였습니다.`}</div>)}
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
