import { useState } from "react";
import styled from "styled-components";
import { AiProfile } from "@/components/Svg";

const Chat = () => {
  const [selectdSbj, setSelectedSbj] = useState<string>("Java");

  const SUBJECT_LIST = [
    "Java",
    "JavaScript",
    "Kotlin",
    "React",
    "Next.js",
    "Node.js",
    "Nest.js",
    "Spring",
    "CS",
  ];

  return (
    <ChatContainer>
      <MessageWrap>
        <DateText>오늘</DateText>
        <AIContainrer>
          <Row>
            <ProfileImgWrap>
              <AiProfile />
            </ProfileImgWrap>
            <p>AI 면접 멘토</p>
          </Row>

          <AIMessageWrap>모의면접 학습할 주제를 선택해주세요.</AIMessageWrap>
          <SubjectItemWrap>
            {SUBJECT_LIST.map(sbj => (
              <SubjectItem
                key={sbj}
                onClick={() => {
                  setSelectedSbj(sbj);
                }}
                $selectdSbj={!!(selectdSbj === sbj)}
              >
                {sbj}
              </SubjectItem>
            ))}
          </SubjectItemWrap>
        </AIContainrer>
        <AIContainrer>
          <Row>
            <ProfileImgWrap>
              <AiProfile />
            </ProfileImgWrap>
            <p>AI 면접 멘토</p>
          </Row>

          <AIMessageWrap>
            Virtual DOM이란 무엇인가요? 왜 사용하나요?
          </AIMessageWrap>
        </AIContainrer>
        <RowEnd>
          <MyMessageWrap>
            Virtual DOM은 웹 개발에서 사용되는 개념으로, 웹 애플리케이션의
            성능을 최적화하기 위한 도구 중 하나입니다. Virtual DOM은 실제
            DOM(Document Object Model)의 가상 표현입니다. DOM은 웹 페이지의
            구조를 나타내는 트리 구조로, HTML 요소들을 표현하고 조작하는 데
            사용됩니다. Virtual DOM은 다음과 같은 방식으로 작동합니다: 초기
            렌더링: 웹 애플리케이션이 시작될 때, Virtual DOM은 실제 DOM과 동일한
            구조의 가상 트리를 생성합니다. 이 가상 트리는 메모리에 존재하며,
            브라우저 화면에는 표시되지 않습니다. 상태 변경: 사용자 상호 작용
            또는 데이터 변경과 같은 이벤트가 발생하면, 애플리케이션 상태가
            업데이트됩니다. 가상 DOM 업데이트: 업데이트된 애플리케이션 상태를
            기반으로 새로운 가상 DOM 트리가 생성됩니다. 이전 가상 DOM과 새로운
            가상 DOM을 비교하여 어떤 부분이 변경되었는지를 찾습니다. 변경된 부분
            식별: 변경된 부분을 식별한 후, 이 변경 내용을 실제 DOM에 적용합니다.
            이때 실제 DOM 조작은 비교적 느린 작업 중 하나이지만, Virtual DOM을
            사용하면 변경된 부분만 업데이트하므로 전체 DOM을 다시 그리는 것보다
            효율적입니다. Virtual DOM을 사용하는 이유는 다음과 같습니다: 성능
            최적화: Virtual DOM은 실제 DOM 조작을 최소화하여 성능을
            향상시킵니다. 변경된 부분만 업데이트하기 때문에 화면 갱신이
            빨라집니다. 효율성: 복잡한 웹 애플리케이션에서 상태 변화를 관리하기
            용이하며, 코드를 간소화하고 유지 보수를 쉽게 만듭니다. 크로스 플랫폼
            호환성: Virtual DOM은 다양한 브라우저와 플랫폼에서 일관된 동작을
            제공하므로 개발자가 크로스 브라우징 문제를 해결하는 데 도움을
            줍니다. React와 같은 라이브러리 및 프레임워크에서 Virtual DOM을
            활용하여 웹 애플리케이션을 개발하면 코드의 효율성과 성능을 향상시킬
            수 있습니다.
          </MyMessageWrap>
        </RowEnd>
        <AIContainrer>
          <Row>
            <ProfileImgWrap>
              <AiProfile />
            </ProfileImgWrap>
            <p>아리의 ai 멘토</p>
          </Row>
          <AIMessageWrap>
            Virtual DOM이란 무엇인가요? 왜 사용하나요?
          </AIMessageWrap>
        </AIContainrer>
      </MessageWrap>
      <ChatWrap>
        <CustomTextarea />
        <ChatSendBtnWrap>
          <p>남은 답변 횟수 7/10</p>
          <ChatSendBtn>전송</ChatSendBtn>
        </ChatSendBtnWrap>
      </ChatWrap>
    </ChatContainer>
  );
};

export default Chat;

const ChatContainer = styled.div`
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
`;

const MessageWrap = styled.div`
  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
  padding: 1rem;
  padding-bottom: 150px;
`;

const DateText = styled.p`
  width: 100%;
  text-align: center;
`;
const ProfileImgWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 35px;
  height: 35px;
  border-radius: 100%;
  overflow: hidden;
  background-color: ${({ theme: { color } }) => color.mainColor};
`;

const AIContainrer = styled.div`
  margin-bottom: 2rem;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
`;

const RowEnd = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
`;
const MyMessageWrap = styled.div`
  width: 60%;
  padding: 2rem;
  background-color: #fefcf4;
  border-radius: 0.75rem 0.75rem 0 0.75rem;
  line-height: 180%;
  margin-bottom: 1rem;
  @media screen and (max-width: 768px) {
    width: 100%;
  }
`;
const AIMessageWrap = styled.div`
  width: 30%;
  min-width: 470px;
  padding: 1rem 2rem;
  background-color: ${({ theme: { color } }) => color.subColor};
  border-radius: 0.75rem 0.75rem 0.75rem 0;
  line-height: 180%;
  margin-top: 1.5rem;
`;

const ChatWrap = styled.div`
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
`;
const CustomTextarea = styled.textarea`
  width: 100%;
  border: 0;
  height: 100px;
  resize: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const ChatSendBtnWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const ChatSendBtn = styled.button`
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

const SubjectItemWrap = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem 2rem;
  margin-top: 1.5rem;
  max-width: 800px;
  @media screen and (max-width: 768px) {
    width: 100%;
  }
`;

const SubjectItem = styled.button<{ $selectdSbj: boolean }>`
  padding: 0.5rem 1rem;
  border: 1px solid
    ${({ theme: { color }, $selectdSbj }) =>
      $selectdSbj ? color.mainColor : color.borderColor};
  color: ${({ theme: { color }, $selectdSbj }) =>
    $selectdSbj && color.mainColor};
  border-radius: 10px;
  font-weight: bold;
  width: 130px;
  @media screen and (max-width: 768px) {
    width: 100px;
    padding: 0.5rem;
  }
`;
