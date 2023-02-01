import React, { useState } from "react";
import LobbyImg from "./LobbyImg";
import { NotLoginWrap, InvalidUserSection, InvalidUserDesc, InvalidUserForm, InvalidUserInput, InvalidUserBtn } from "../styles/components/NotLogin";
import { getLogged } from "../store";
import { useRecoilState } from "recoil";

interface StorageType {
  storageName: string;
}

const NotLogin = (props: StorageType) => {
  const [userName, setUserName] = useState<string>("");
  const [logged, setLogged] = useRecoilState(getLogged);

  /** 로그인 기능 함수 */
  const handleUserLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (userName === "") {
      return alert("공백은 불가 합니다.");
    } else if (userName.length > 6) {
      alert("닉네임은 6글자 미만으로 해주세요 !");
      return setUserName("");
    }

    localStorage.setItem(props.storageName, userName);
    setLogged(true);
  };

  /** 사용자가 입력한 value를 state함수에 저장 */
  const handleUserName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = e;

    return setUserName(value);
  };

  return (
    <NotLoginWrap>
      <LobbyImg />
      <InvalidUserSection>
        <InvalidUserDesc>스터디 앱에서 사용하실 닉네임을 정해주세요.</InvalidUserDesc>
        <InvalidUserForm onSubmit={handleUserLogin}>
          <InvalidUserInput onChange={handleUserName} type="text" placeholder="닉네임 설정" value={userName} />
          <InvalidUserBtn>닉네임 저장</InvalidUserBtn>
        </InvalidUserForm>
      </InvalidUserSection>
    </NotLoginWrap>
  );
};

export default NotLogin;