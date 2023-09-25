import styled from "styled-components";

export const ChatWrap = styled.div`
  width: 100%;
  border: 1px solid #d7d7d7;
  background-color: #fff;
  border-radius: 5px;
  padding: 1rem;
  width: calc(100% - 6rem);
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  @media screen and (max-width: 768px) {
    width: 100%;
    min-width: 100%;
  }
`;
export const CustomTextarea = styled.textarea`
  width: 100%;
  border: 0;
  height: 100px;
  resize: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

export const ChatSendBtnWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

export const ChatSendBtn = styled.button`
  width: 100px;
  padding: 0.5rem 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  border: 1px solid #d7d7d7;
  border-radius: 8px;
  background-color: #fff;
  font-size: 0.9rem;
  font-weight: bold;
`;
