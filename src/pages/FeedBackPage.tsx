import { useState } from "react";

// styles
import { ApplicationTitle } from "../styles/components/ApplicationTitle";
import {
  FeedBackWrapper,
  FeedBackGetUserWrap,
  FeedBackInput,
  FeedBackGetInfoBtn,
  FeedBackSection,
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

  // input value state에 저장
  const handleSetFeedBackUserName = (e: React.ChangeEvent<HTMLInputElement>) => setUserName(e.target.value);

  // 사용자의 피드백 히스토리 서버로부터 Get 요청
  const getFeedBackUserName = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = await fetch(`http://localhost:3002/feadback/myfeadback?iam=${userName}`);
    const json = await data.json();
    setFeedBackData(json);
  };
  return (
    <FeedBackWrapper>
      <ApplicationTitle>발표도우미</ApplicationTitle>
      <FeedBackGetUserWrap onSubmit={getFeedBackUserName}>
        <FeedBackInput type="text" placeholder="닉네임" onChange={handleSetFeedBackUserName} />
        <FeedBackGetInfoBtn>검색</FeedBackGetInfoBtn>
      </FeedBackGetUserWrap>

      <FeedBackSection>
        {feedbackData?.feadbacks.map((data, i) => {
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
    </FeedBackWrapper>
  );
};

export default FeedBackPage;
