import styled from "styled-components";

export const SubjectItemWrap = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem 2rem;
  margin-top: 1.5rem;
  max-width: 800px;
  @media screen and (max-width: 768px) {
    width: 100%;
  }
`;

export const SubjectItem = styled.button<{ $groupId: boolean }>`
  padding: 0.5rem 1rem;
  border: 1px solid
    ${({ theme: { color }, $groupId }) =>
      $groupId ? color.mainColor : color.borderColor};
  color: ${({ theme: { color }, $groupId }) => $groupId && color.mainColor};
  border-radius: 10px;
  font-weight: bold;
  width: 130px;
  @media screen and (max-width: 768px) {
    width: 100px;
    padding: 0.5rem;
  }
`;

export const Row = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
`;

export const AIMessageWrap = styled.div`
  width: 30%;
  min-width: 470px;
  padding: 1rem 2rem;
  background-color: ${({ theme: { color } }) => color.subColor};
  border-radius: 0.75rem 0.75rem 0.75rem 0;
  line-height: 180%;
  margin-top: 1.5rem;
  @media screen and (max-width: 768px) {
    width: 100%;
    min-width: 100%;
  }
`;
export const ProfileImgWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 35px;
  height: 35px;
  border-radius: 100%;
  overflow: hidden;
  background-color: ${({ theme: { color } }) => color.mainColor};
`;
