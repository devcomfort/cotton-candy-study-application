import { Routes, Route } from "react-router-dom";

// Global States
import { useRecoilValue } from "recoil";
import { IsStorageName } from "../store";

// components
import Logged from "../components/Logged";
import NotLogIn from "../components/NotLogIn";
import Roulette from "../components/Roulette";

// pages
import MainPage from "./MainPage";
import FeedBackPage from "./FeedBackPage";

const Router = () => {
  // Global State로 등록된 LocalStorage API Key 값을 가져온다.
  const storageName = useRecoilValue(IsStorageName);

  return (
    <div>
      {storageName ? (
        <Routes>
          <Route path="/" element={<Logged storageName={storageName} />} />
          <Route path="/main" element={<MainPage />} />
          <Route path="/feedback" element={<FeedBackPage />} />
          <Route path="/random/roulette" element={<Roulette />} />
          <Route path="*" element={<Logged storageName={storageName} />} />
        </Routes>
      ) : (
        <Routes>
          <Route path="/" element={<NotLogIn storageName={storageName} />} />
          <Route path="*" element={<NotLogIn storageName={storageName} />} />
        </Routes>
      )}
    </div>
  );
};

export default Router;
