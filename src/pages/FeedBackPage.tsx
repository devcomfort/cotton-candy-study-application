import { useState } from "react";
import { useNavigate } from "react-router-dom";

// styles
import { ApplicationTitle } from "../styles/components/ApplicationTitle";
import {
  FeedBackWrapper,
  FeedBackGetUserWrap,
  FeedBackInput,
  FeedBackGetInfoBtn,
  FeedBackSection,
  FeedBackGoRootBtn,
  FeedBackInfo,
  FeedBackUserHeaderInfo,
  FeedBackMsg,
} from "../styles/pages/FeedBackPage";

// FeedBackData State Type 지정
type Feedback = Record<"roomCode" | "evaluatedName" | "content" | "_id" | "__v" | "createdAt", string>;

interface Response {
  evaluatedName: string;
  feadbacks: Feedback[];
  __v: number;
  _id: string;
}

const FeedBackPage = () => {
  const [userName, setUserName] = useState("");
  const [feedbackData, setFeedBackData] = useState<Response>();
  const path = useNavigate();

  // input value state에 저장
  const handleSetFeedBackUserName = (e: React.ChangeEvent<HTMLInputElement>) => setUserName(e.target.value);

  // 사용자의 피드백 히스토리 서버로부터 Get 요청
  const getFeedBackUserName = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = await fetch(`http://localhost:3002/feadback/myfeadback?iam=${userName}`);
    const json = await data.json();
    if (json.message) return alert("피드백 사용자가 없습니다.");
    setFeedBackData(json);
  };

  const goRoot = () => path("/");

  return (
    <FeedBackWrapper>
      <ApplicationTitle>발표도우미</ApplicationTitle>
      <FeedBackGetUserWrap onSubmit={getFeedBackUserName}>
        <FeedBackInput type="text" placeholder="닉네임" onChange={handleSetFeedBackUserName} />
        <FeedBackGetInfoBtn>검색</FeedBackGetInfoBtn>
      </FeedBackGetUserWrap>

      <FeedBackSection>
        {feedbackData?.feadbacks?.map((data, i) => {
          return (
            <FeedBackInfo key={i}>
              <FeedBackUserHeaderInfo>
                <div>{feedbackData.evaluatedName}</div>
                <div>{data.roomCode}</div>
              </FeedBackUserHeaderInfo>
              <FeedBackMsg>{data.content}</FeedBackMsg>
            </FeedBackInfo>
          );
        })}
      </FeedBackSection>
      <FeedBackGoRootBtn onClick={goRoot}>나가기</FeedBackGoRootBtn>
    </FeedBackWrapper>
  );
};

export default FeedBackPage;
