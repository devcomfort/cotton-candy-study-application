import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

// Socket
import { io } from "socket.io-client";

// Global States
import { useRecoilValue, useRecoilState } from "recoil";
import { roomNumberSet, IsFeedBackModal } from "../store";

import FeedBackModal from "../components/FeedBackModal";

// styles
import { ApplicationTitle } from "../styles/components/ApplicationTitle";
import {
  Label,
  ContentsWrap,
  Drawing,
  InviteCodeBtn,
  MainPageBtnWrap,
  MainTitleWrap,
  MainWrap,
  MemberHistory,
  MemberList,
  RoomExitBtn,
  RouletteBtn,
  UserInfo,
  DrawingDisabled,
} from "../styles/pages/MainPage";

interface UserType {
  MainPageProps: (userList: string[]) => void;
}

const MainPage = ({ MainPageProps }: UserType) => {
  const [userMsg, setUserMsg] = useState<string[]>([]);
  const [userList, setUserList] = useState<string[]>([]);
  const roomNum = useRecoilValue(roomNumberSet);
  const [modal, setModal] = useRecoilState(IsFeedBackModal);

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
    socket.on("welcome", (username, members) => {
      setUserList([...members]);
      MainPageProps(members);
    });
  }, []);

  // 초대코드 복사 기능
  const copyInviteCode = async () => {
    await navigator.clipboard.writeText(`${inviteCode}`);
    alert("초대 코드 복사 완료!");
  };

  // 소켓 io 방 나가기
  const onLeaveRoom = () => {
    socket.emit("leave", inviteCode, userName);
    socket.on("welcome", (username, members) => setUserList([...members]));
    path("/");
  };

  // 룰렛 페이지로 가기
  const goRoulette = () => {
    if (userList.length === 1) return alert("추첨은 혼자서 할수 없습니다.");
    path("/random/roulette");
  };

  // 제비뽑기 페이지로 가기
  const goLots = () => {
    if (userList.length === 1) return alert("추첨은 혼자서 할수 없습니다.");
    path("/random/lots");
  };

  const handleShowFeedBack = () => {
    setModal(true);
  };

  return (
    <MainWrap>
      {modal && <FeedBackModal userDataArr={userList} />}
      <ApplicationTitle>발표도우미</ApplicationTitle>
      <MainTitleWrap>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          스터디 방 {roomNum}
          <InviteCodeBtn onClick={copyInviteCode}>
            <img src="../src/assets/copy-regular.svg" width="12px" />
            <span>복사</span>
          </InviteCodeBtn>
        </div>
        <RoomExitBtn onClick={onLeaveRoom}>방 나가기</RoomExitBtn>
      </MainTitleWrap>
      <ContentsWrap>
        <MemberList>
          <strong style={{ paddingBottom: "16px" }}>유저 리스트</strong>
          {userList.map((data, i) => (
            <UserInfo key={i}>
              <img
                src="../src/assets/circle-user-solid.svg"
                style={{ marginRight: "4px", width: "16px" }}
              />
              <span>{data}</span>
              {data === userList[0] && <Label>방장</Label>}
            </UserInfo>
          ))}
        </MemberList>
        <MemberHistory>
          {userList?.map((userName, i) => (
            <div key={i}>{`${userName}님이 입장하였습니다.`}</div>
          ))}
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
          <DrawingDisabled className="norank">
            {userList[0]} 님만 뽑을수있습니다.
          </DrawingDisabled>
          <RouletteBtn onClick={handleShowFeedBack}>피드백 남기기</RouletteBtn>
        </MainPageBtnWrap>
      )}
    </MainWrap>
  );
};

export default MainPage;
