import styled from "@emotion/styled";

export const FeedBackWrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const FeedBackGetUserWrap = styled.form`
  width: 400px;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  margin-bottom: 30px;
`;

export const FeedBackInput = styled.input`
  width: 170px;
  height: 33px;
  margin-right: 25px;
  border-radius: 5px;
  border: 1px solid grey;
  padding-left: 10px;
  &:focus {
    outline: none;
    border: 1.2px solid darkorange;
  }
`;

export const FeedBackGetInfoBtn = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  background-color: darkorange;
  color: white;
  cursor: pointer;
`;

export const FeedBackSection = styled.div`
  width: 100%;
  height: 400px;
  display: grid;
  place-items: center;
  font-size: 14px;
  overflow: auto;
  gap: 15px;
  padding: 20px 0;
  background-color: grey;
`;

export const FeedBackGoRootBtn = styled.div`
  margin-top: 20px;
  padding: 15px 50px;
  border-radius: 5px;
  background-color: green;
  box-sizing: border-box;
  font-weight: bold;
  color: white;
`;

export const FeedBackInfo = styled.div`
  width: 285px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid grey;
  border-radius: 5px;
  padding: 0 15px;
  color: white;
  background-color: darkgrey;
`;

export const FeedBackUserHeaderInfo = styled.div`
  width: inherit;
  display: flex;
  justify-content: space-between;
  padding-top: 10px;
`;

export const FeedBackMsg = styled.div`
  width: inherit;
  padding: 10px 0;
  box-sizing: border-box;
`;
