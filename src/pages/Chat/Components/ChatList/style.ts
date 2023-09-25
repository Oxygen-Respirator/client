import styled from "styled-components";

export const DateText = styled.p`
  width: 100%;
  text-align: center;
  margin-bottom: 2rem;
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

export const AIContainrer = styled.div`
  margin-bottom: 2rem;
`;

export const Row = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
`;

export const RowEnd = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
`;
export const MyMessageWrap = styled.div`
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
