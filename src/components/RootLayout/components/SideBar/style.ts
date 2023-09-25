import styled from "styled-components";

export const TitleText = styled.p`
  margin-top: 1rem;
  font-weight: bold;
`;

export const SideBarContainer = styled.div`
  width: 15%;
  min-width: 220px;
  height: 100%;
  background-color: ${({ theme: { color } }) => color.subColor};
  box-shadow: 0 1px 15px rgba(0, 0, 0, 0.04), 0 1px 6px rgba(0, 0, 0, 0.04);
  padding: 2rem;
  @media screen and (max-width: 768px) {
    display: none;
  }
`;

export const Myinfo = styled.button`
  width: 100%;
  margin-top: 1rem;
  padding: 1rem;
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;
