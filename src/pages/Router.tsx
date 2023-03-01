import { Routes, Route } from "react-router-dom";

// Global States
import { useRecoilValue } from "recoil";
import { IsStorageName } from "../store";

// components
import Logged from "../components/Logged";
import NotLogIn from "../components/NotLogIn";

// pages
import MainPage from "./MainPage";
import FeedBackPage from "./FeedBackPage";
import RoulettePage from "./RoulettePage";
import Lots from "./Lots";
import { useState } from "react";

const Router = () => {
  // Global State로 등록된 LocalStorage API Key 값을 가져온다.
  const storageName = useRecoilValue(IsStorageName);
  const [userDataArr, setUserData] = useState<string[]>([]);

  const MainPageProps = (userList: string[]) => setUserData(userList);

  return (
    <div>
      {storageName ? (
        <Routes>
          <Route path="/" element={<Logged storageName={storageName} />} />
          <Route path="/rooms/:inviteCode" element={<MainPage MainPageProps={MainPageProps} />} />
          <Route path="/feedback" element={<FeedBackPage />} />
          <Route path="/random/roulette" element={<RoulettePage userDataArr={userDataArr} />} />
          <Route path="/random/lots" element={<Lots userDataArr={userDataArr} />} />
          <Route path="*" element={<Logged storageName={storageName} />} />
        </Routes>
      ) : (
        <Routes>
          <Route path="/" element={<NotLogIn />} />
          <Route path="*" element={<NotLogIn />} />
        </Routes>
      )}
    </div>
  );
};

export default Router;
