import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

// Socket
import { io } from "socket.io-client";

// Global States
import { useRecoilValue } from "recoil";
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
  const [userMsg, setUserMsg] = useState([]);
  const [userList, setUserList] = useState<string[]>([]);
  const roomNum = useRecoilValue(roomNumberSet);

  const userName = localStorage.getItem("StudyName");
  const inviteCode = window.location.pathname.substring(8);
  const path = useNavigate();
  const rank = useLocation();

  const socket = io("http://localhost:3002", {
    transports: ["websocket"],
  });

  useEffect(() => {
    socket.emit("enterRoom", inviteCode, userName);
    socket.on("memberList", (members) => setUserList([...members]));
    socket.on("welcome", (userMsg: string, members) => {
      setUserList([...members]);
      MainPageProps(members);
    });
  }, []);

  console.log(userList);

  // 초대코드 복사 기능
  const copyInviteCode = async () => {
    await navigator.clipboard.writeText(`${inviteCode}`);
    alert("초대 코드 복사 완료!");
  };

  // 소켓 io 방 나가기
  const onLeaveRoom = () => {
    const socket = io("http://localhost:3002", {
      transports: ["websocket"],
    });

    // 방나갈시 유저닉네임, 방번호
    socket.emit("leave", inviteCode, userName);
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
          {userList.map((data, i) => (
            <div key={i}>{data}</div>
          ))}
        </MemberList>
        <MemberHistory>
          {userMsg?.map((userName, i) => (
            <div key={i}>{`${userName}님이 입장하였습니다.`}</div>
          ))}
          {/* {isInGetExit
            ? userList?.map((userName, i) => <div key={i}>{`${userName}님이 입장하였습니다.`}</div>)
            : userMsg?.map((userName, i) => <div key={i}>{`${userName}님이 퇴장하였습니다.`}</div>)} */}
        </MemberHistory>
      </ContentsWrap>
      {/** 방장(rank 1)만 보이는 버튼 */}
      {rank.state.value === 1 ? (
        <MainPageBtnWrap>
          <RouletteBtn onClick={goRoulette}>룰렛 돌리기</RouletteBtn>
          <Drawing onClick={goLots}>제비 뽑기</Drawing>
        </MainPageBtnWrap>
      ) : (
        <MainPageBtnWrap>
          <Drawing className="norank">{userList[0]} 님만 뽑을수있습니다.</Drawing>
        </MainPageBtnWrap>
      )}
    </MainWrap>
  );
};

export default MainPage;
