import styled from "styled-components";

export const ChatContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 3rem;
  position: relative;
  @media screen and (max-width: 768px) {
    padding: 2rem;
  }
  @media screen and (max-width: 400px) {
    padding: 1rem;
  }
`;

export const MessageWrap = styled.div`
  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
  padding: 1rem;
  padding-bottom: 150px;
  scroll-behavior: smooth;
  height: 100%;
  scroll-margin-bottom: 9999px;
`;
export const AIContainrer = styled.div`
  margin-bottom: 2rem;
`;
