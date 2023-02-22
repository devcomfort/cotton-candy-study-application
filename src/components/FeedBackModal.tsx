import { activeModal, inviteNumber, isNumberCheck } from "../store";
import { useRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
import { ChangeEventHandler } from "react";
import {
  InviteModalWrapper,
  InviteModalBg,
  InviteModalTitle,
  InviteModalInfoWrap,
  InviteModalBtnWrapper,
  InviteModalCancleBtn,
  InviteModalJoinBtnDisabled,
  InviteModalJoinBtnActive,
} from "../styles/components/InviteModal";

const FeedBackModal = () => {
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
    console.log("방입장 소켓 연동시 이용가능");
    setActivityModal(false);
    isNumberOk(false);
    navigate("/main");
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

  return (
    <InviteModalWrapper>
      <InviteModalBg>
        <InviteModalTitle>devcomfort 피드백하기</InviteModalTitle>
        <InviteModalInfoWrap>
          <textarea style={{ width: "100%", height: "160px" }} />
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

export default FeedBackModal;
