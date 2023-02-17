import { useEffect } from "react";
import { useRecoilState } from "recoil";
import FeedBackModal from "../components/FeedBackModal";
import { activeModal, roomNumberSet } from "../store";
import { ApplicationTitle } from "../styles/components/ApplicationTitle";
import {
  ContentsWrap,
  Drawing,
  InviteCodeBtn,
  MainPageBtnWrap,
  MainTitle,
  MainTitlWrap,
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
  const inviteCode = "this is invite code~!";
  const path = useNavigate();

  const socket = io("http://localhost:3000", {
    transports: ["websocket"],
  });

  useEffect(() => {
    socket.connect();
    const inviteCode = window.location.pathname.substring(7);
    socket.emit("enterRoom", inviteCode);
    setRoomNum(inviteCode);
    fetchMemberList();
    console.log(inviteCode);
    console.log(socket);
  }, []);

  const fetchMemberList = () => {
    // 백엔드에서 방에 입장한 사람들 목록 받아오기
    return;
  };

  const onLeaveRoom = () => {
    // 소켓 io 방 나가기
    path("/");
  };

  const copyInviteCode = () => {
    window.navigator["clipboard"].writeText(inviteCode);
    alert("초대 링크 복사 완료!");
  };

  /** 스터디룸 입장모달 활성화 */
  const handleModalShowBtn = () => setActivityModal(true);

  return (
    <MainWrap>
      {activityModal && <FeedBackModal />}
      <ApplicationTitle>발표도우미</ApplicationTitle>
      <MainTitlWrap>
        <MainTitle>
          <div>스터디 방 {roomNum}</div>
          <RoomExitBtn onClick={onLeaveRoom}>방 나가기</RoomExitBtn>
        </MainTitle>
        <InviteCodeBtn onClick={copyInviteCode}>초대 링크 복사</InviteCodeBtn>
      </MainTitlWrap>
      <ContentsWrap>
        <MemberList>
          <strong>유저 리스트</strong>
          <div onClick={handleModalShowBtn} style={{ cursor: "pointer" }}>
            이름
          </div>
        </MemberList>
        <MemberHistory>
          <span>솜사탕님이 입장했습니다.</span>
        </MemberHistory>
      </ContentsWrap>
      {/** 방장(rank 1)만 보이는 버튼 */}
      <MainPageBtnWrap>
        <RouletteBtn>룰렛 돌리기</RouletteBtn>
        <Drawing>제비 뽑기</Drawing>
      </MainPageBtnWrap>
    </MainWrap>
  );
};

export default MainPage;
