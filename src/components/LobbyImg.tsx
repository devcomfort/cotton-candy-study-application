// assets
import logo from "../assets/logo/logo.png";

// styles
import { ApplicationTitle } from "../styles/components/ApplicationTitle";
import { LobbyWrap, LobbyImgLogo } from "../styles/components/LobbyImg";

const LobbyImg = () => {
  return (
    <LobbyWrap>
      <LobbyImgLogo src={logo} />
      <ApplicationTitle>발표도우미</ApplicationTitle>
    </LobbyWrap>
  );
};

export default LobbyImg;
