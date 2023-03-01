import styled from "@emotion/styled";

export const FeedBackContainer = styled.div`
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.6);
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 6;
`;

export const FeedBackTitle = styled.div`
  width: 90%;
  height: 370px;
  background-color: white;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  box-sizing: border-box;
  font-weight: bold;
`;

export const FeedBackSelect = styled.select`
  width: 50%;
  height: 25px;
  border-radius: 5px;
  margin-top: 10px;
  text-align: center;
`;

export const FeedBackOption = styled.option``;

export const FeedBackForm = styled.form`
  width: 100%;
  margin-top: 15px;
`;

export const FeedBackInputData = styled.textarea`
  width: 100%;
  height: 150px;
  resize: none;
  border: 1px solid grey;
  border-radius: 5px;
  box-sizing: border-box;
  &:focus {
    border: 1px solid brown;
    padding: 5px;
    outline: none;
  }
`;

export const FeedBackFooter = styled.div`
  width: 100%;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: white;
  font-weight: bold;

  .post_disabled {
    background-color: #e8e8e8;
    cursor: default;
  }
`;

export const FeedBackPostBtn = styled.button`
  width: 300px;
  height: 40px;
  background-color: #38b63c;
  margin-bottom: 10px;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;
export const FeedBackCancleBtn = styled.button`
  width: 300px;
  height: 40px;
  background-color: #e2758c;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;
