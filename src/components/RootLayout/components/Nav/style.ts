import { Link } from "react-router-dom";
import styled from "styled-components";

export const HeaderContainer = styled.div`
  width: 100%;
  display: flex;
  height: 60px;
  padding: 1rem 0;
  box-shadow: 0 1px 15px rgba(0, 0, 0, 0.04), 0 1px 6px rgba(0, 0, 0, 0.04);
  @media screen and (max-width: 768px) {
    display: none;
  }
`;
export const LogoIconContainer = styled.div`
  width: 15%;
  min-width: 220px;
`;
export const LogoIconWrap = styled(Link)`
  font-weight: bold;
  color: ${({ theme: { color } }) => color.mainColor};
  font-size: 18px;
  width: 15%;
  min-width: 220px;
  display: flex;
  align-items: center;
  padding: 0 2rem;
  justify-content: center;
`;
export const MyprofileContainer = styled.div`
  gap: 1rem;
  display: flex;
  margin-right: 1rem;
`;

export const MyprofileWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  @media screen and (max-width: 1000px) {
    display: none;
  }
`;

export const Button = styled.button`
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
export const Row = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

export const LinkList = styled.ul`
  display: flex;
  align-items: center;
  gap: 1rem;
`;
export const LinkItem = styled.li<{ $location: boolean }>`
  display: block;
  width: 130px;
  text-align: center;
  font-weight: ${({ $location }) => $location && "bold"};
  border-bottom: ${({ theme: { color }, $location }) =>
    $location && `2px solid ${color.mainColor}`};
  padding: 2px;
`;

export const LinkBtn = styled.button<{ $location: boolean }>`
  width: 100%;
  height: 100%;
  display: block;
  padding: 1rem;
  font-weight: ${({ $location }) => $location && "bold"};
`;
export const RowBetwwen = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-right: 2rem;
`;

export const MoblieHeaderContainer = styled.div<{ $isMobileMenuOpen: boolean }>`
  display: none;
  width: 100%;
  @media screen and (max-width: 768px) {
    display: flex;
    flex-direction: column;
    height: ${({ $isMobileMenuOpen }) => $isMobileMenuOpen && "100%"};
  }
`;
export const MoblieLogoIconContainer = styled.div`
  width: 100%;
  height: 60px;
  box-shadow: 0 1px 15px rgba(0, 0, 0, 0.04), 0 1px 6px rgba(0, 0, 0, 0.04);
  display: flex;
  align-items: center;
  justify-content: space-between;
  z-index: 999;
  padding: 1rem 2rem;
`;
export const MoblieLogoIconWrap = styled(Link)`
  font-weight: bold;
  color: ${({ theme: { color } }) => color.mainColor};
  font-size: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
export const MoblieMyprofileContainer = styled.div`
  gap: 1rem;
  display: flex;
  padding: 1rem 2rem;
  width: 100%;
`;

export const MoblieMyprofileWrap = styled.div`
  margin-top: 1.5rem;
  display: flex;
  align-items: center;
  gap: 1rem;
`;
export const MoblieUserNickname = styled.p`
  font-weight: bold;
  font-size: 18px;
  margin-bottom: 3px;
`;
export const MoblieUserUserId = styled.p`
  opacity: 0.5;
`;

export const MoblieRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  width: 100%;
  height: 100%;
`;

export const MoblieLinkList = styled.ul`
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  margin: 2rem 0;
  padding: 0 2rem;
`;
export const MoblieLinkItem = styled.li<{ $location?: boolean }>`
  width: 100%;
  font-weight: ${({ $location }) => $location && "bold"};
  border-bottom: ${({ theme: { color }, $location }) =>
    $location && `2px solid ${color.mainColor}`};
  background-color: ${({ theme: { color }, $location }) =>
    $location && color.subColor};
  padding: 2px;
  width: 100%;
  border: none;
`;

export const MoblieLinkBtn = styled.button<{ $location: boolean }>`
  width: 100%;
  height: 100%;
  padding: 1rem;
  font-weight: ${({ $location }) => $location && "bold"};
  text-align: left;
`;
export const MoblieRowBetwwen = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  background-color: #fff;
  padding-right: 0;
`;

export const MobileMenuOpenBtn = styled.button`
  ul {
    display: flex;
    flex-direction: column;
    gap: 5px;
  }
  li {
    background-color: #434343;
    display: block;
    width: 25px;
    height: 3px;
  }
`;

export const MoblieClosBtn = styled.button`
  font-size: 2rem;
`;
