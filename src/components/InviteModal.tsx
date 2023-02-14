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

import { activeModal, inputAlert, inviteNumber, isNumberCheck } from "../store";
import { useRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
import { ChangeEventHandler } from "react";

import io from "socket.io-client";

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

  const handleEnterRoomInBtn = () => {
    // 백엔드 /rooms/getRoom api 개발 후 해당 번호가 있는지 우선검증.
    setActivityModal(false);
    isNumberOk(false);
    navigate("/main");
    socket.emit("enterRoom", inviteNum);
  };

  const handleInviteNumberChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    if (e.target.value.length > 5) {
      e.target.value = e.target.value.slice(0, 5);
      isNumberOk(true);
    } else if (e.target.value.length === 5) {
      isNumberOk(true);
    }
    const num = Number(e.target.value);
    setInviteNum(num);
    console.log(inviteNum);
  };
  console.log(socket);

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
