import { useNavigate } from "react-router-dom";

// socket
import io from "socket.io-client";

// Global States
import { activeModal, inviteNumber, isNumberCheck } from "../store";
import { useRecoilState } from "recoil";

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

const InviteModal = () => {
  const socket = io();
  const [activityModal, setActivityModal] = useRecoilState(activeModal);
  const [inviteNum, setInviteNum] = useRecoilState(inviteNumber);
  const [numberOk, isNumberOk] = useRecoilState(isNumberCheck);

  // 번호 모두 입력시 버튼 활성화

  const navigate = useNavigate();
  const handleModalCancleBtn = () => {
    setActivityModal(false);
    isNumberOk(false);
  };

  /** 입장하기 함수
   *   - 백엔드 api로 post요청을하여, DB상에 생성된 방이 있는지 검증 후 true일 경우 방 참여
   */
  const handleEnterRoomInBtn = async () => {
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
    //localhost:3002/api/rooms/:inviteCode
  };

  // input에 사용자가 입력한 값의 길이를 검증한다.
  const handleInviteNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length > 5) {
      e.target.value = e.target.value.slice(0, 5);
      isNumberOk(true);
    } else if (e.target.value.length === 4) {
      isNumberOk(true);
    }
    const num = Number(e.target.value);
    setInviteNum(num);
    console.log(inviteNum);
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
