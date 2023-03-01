import { useState } from "react";
import { useNavigate } from "react-router-dom";

// socket
import io from "socket.io-client";

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
  const [inviteNum, setInviteNum] = useState(0);
  const [numberOk, isNumberOk] = useState(false);

  const navigate = useNavigate();

  // 상위컴포넌트인 Logged의 props 함수를 호출하여 modal state 값을 상위에서 변경
  const handleModalCancleBtn = () => props.handleActivityModalBtn();

  /** 입장하기 함수
   *   - 백엔드 api로 post요청을하여, DB상에 생성된 방이 있는지 검증 후 true일 경우 방 참여
   */
  const handleEnterRoomInBtn = async () => {
    const socket = io();
    const data = await fetch("http://localhost:3002/api/rooms/:inviteNum", {
      method: "POST",
      body: new URLSearchParams({
        inviteCode: `${inviteNum}`,
      }),
    });
    const json = await data.json();
    if (json.result) {
      navigate(`/rooms/:${inviteNum}`);
      socket.emit("enterRoom", inviteNum);
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
    setInviteNum(Number(e.target.value));
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
