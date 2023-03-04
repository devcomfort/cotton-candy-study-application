import { useState } from "react";
import { useNavigate } from "react-router-dom";

// socket
import io from "socket.io-client";

// Global States
import { useRecoilState } from "recoil";
import { roomNumberSet } from "../store";

// styles
import {
  InviteModalWrapper,
  InviteModalBg,
  InviteModalTitle,
  InviteModalInfoWrap,
  InviteModalInput,
  InviteModalBtnWrapper,
  InviteModalCancleBtn,
  InviteModalJoinBtnDisabled,
  InviteModalJoinBtnActive,
} from "../styles/components/InviteModal";

// props type
interface ModalType {
  handleActivityModalBtn: () => void;
}

const InviteModal = (props: ModalType) => {
  const userName = localStorage.getItem("StudyName");
  const [inviteNum, setInviteNum] = useState<Number>();
  const [numberOk, isNumberOk] = useState(false);
  const [roomNum, setRoomNum] = useRecoilState(roomNumberSet);

  const path = useNavigate();

  // 상위컴포넌트인 Logged의 props 함수를 호출하여 modal state 값을 상위에서 변경
  const handleModalCancleBtn = () => props.handleActivityModalBtn();

  /** 입장하기 함수
   *   - 백엔드 api로 post요청을하여, DB상에 생성된 방이 있는지 검증 후 true일 경우 방 참여
   */
  const handleEnterRoomInBtn = async () => {
    const socket = io("http://localhost:3002", {
      transports: ["websocket"],
    });
    const data = await fetch("http://localhost:3002/api/rooms/inviteCode", {
      method: "POST",
      body: new URLSearchParams({
        inviteCode: `${roomNum}`,
      }),
    });
    const json = await data.json();
    console.log(json);
    if (json.result) {
      socket.emit("searchAndJoinRoom", roomNum, userName);
      console.log(roomNum);
      path(`/rooms/:${roomNum}`);
      return;
    } else {
      return alert("해당 방은 존재하지 않습니다.");
    }
  };

  // input에 사용자가 입력한 값의 길이를 검증한다.
  const handleInviteNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length > 5) {
      e.target.value = e.target.value.slice(0, 5);
      isNumberOk(true);
    } else if (e.target.value.length === 4) {
      isNumberOk(true);
    }
    setRoomNum(e.target.value);
  };

  return (
    <InviteModalWrapper>
      <InviteModalBg>
        <InviteModalTitle>초대번호를 입력해주세요</InviteModalTitle>
        <InviteModalInfoWrap>
          <InviteModalInput type="number" name="roomcode" onChange={handleInviteNumberChange} />
          <InviteModalBtnWrapper>
            <InviteModalCancleBtn onClick={handleModalCancleBtn}>취소</InviteModalCancleBtn>
            {numberOk ? (
              <InviteModalJoinBtnActive onClick={handleEnterRoomInBtn}>입장</InviteModalJoinBtnActive>
            ) : (
              <InviteModalJoinBtnDisabled>입장</InviteModalJoinBtnDisabled>
            )}
          </InviteModalBtnWrapper>
        </InviteModalInfoWrap>
      </InviteModalBg>
    </InviteModalWrapper>
  );
};

export default InviteModal;
