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

import { activeModal, inviteNumber, isNumberCheck } from "../store";
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

  const handleEnterRoomInBtn = async () => {
    const data = await fetch("http://localhost:3002/api/rooms/:inviteNum", {
      method: "POST",
      body: new URLSearchParams({
        inviteCode: `${inviteNum}`,
      }),
    });
    const json = await data.json();
    if (json.result) {
      setActivityModal(false);
      isNumberOk(false);
      navigate(`/rooms/:${inviteNum}`);
      socket.emit("enterRoom", inviteNum);
      return;
    } else {
      return alert("해당 방은 존재하지 않습니다.");
    }
    //localhost:3002/api/rooms/:inviteCode
  };

  const handleInviteNumberChange: ChangeEventHandler<HTMLInputElement> = (e) => {
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
