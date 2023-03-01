// assets
import logo from "../assets/logo/logo.png";

// styles
import { ApplicationTitle } from "../styles/components/ApplicationTitle";
import { SplashWrap, SplashImgLogo } from "../styles/components/Splash";

const Splash = () => {
  return (
    <SplashWrap>
      <SplashImgLogo src={logo} />
      <ApplicationTitle>발표도우미</ApplicationTitle>
    </SplashWrap>
  );
};

export default Splash;
