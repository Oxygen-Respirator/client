import { useCallback, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { LogoIcon, MyProfile } from "@/components/Svg";
import Sign from "./Sign";
import { useGetUserInfoMutation } from "./authHook/authMutationHook";
import { useRecoilState } from "recoil";
import { userInfoAtom } from "@/atom/userInfo";

const Nav = () => {
  const navigate = useNavigate();
  const location = useLocation().pathname;
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSignModal, setIsSignModal] = useState<IsSignModal>({
    in: false,
    up: false,
  });
  const links = [
    { to: "/", text: "AI 모의면접" },
    { to: "/rank", text: "랭킹" },
    { to: "/report", text: "학습 리포트" },
  ];

  const [userInfo, setUserInfo] = useRecoilState(userInfoAtom);

  const { mutateAsync: getUserInfo } = useGetUserInfoMutation();

  const [isLogin, setIsLogin] = useState(false);

  const onGetUserInfo = useCallback(async () => {
    const {
      data: { data: _userInfo },
    } = await getUserInfo();
    setUserInfo(_userInfo);
    setIsLogin(true);
  }, [getUserInfo, setUserInfo]);

  useEffect(() => {
    const isToken = localStorage.getItem("ptToken");
    if (isToken) {
      onGetUserInfo();
    }
  }, [isSignModal, onGetUserInfo]);

  useEffect(() => {
    const isToken = localStorage.getItem("ptToken");
    !isToken && setIsSignModal(prev => ({ ...prev, in: true }));
  }, []);

  const onClickLoginOutBtn = () => {
    localStorage.removeItem("ptToken");
    setIsLogin(false);
    setIsSignModal({ in: true, up: false });
  };

  return (
    <HeaderContainer isMobileMenuOpen={isMobileMenuOpen}>
      <LogoIconContainer>
        <MobileMenuOpenBtn
          isMobileMenuOpen={isMobileMenuOpen}
          onClick={() => {
            setIsMobileMenuOpen(true);
          }}
        >
          <ul>
            <li></li>
            <li></li>
            <li></li>
          </ul>
        </MobileMenuOpenBtn>
        <LogoIconWrap to="/" isMobileMenuOpen={isMobileMenuOpen}>
          <LogoIcon />
        </LogoIconWrap>
      </LogoIconContainer>

      <RowBetwwen isMobileMenuOpen={isMobileMenuOpen}>
        <LinkList>
          {links.map((link, index) => (
            <LinkItem key={index} location={!!(location === link.to)}>
              <LinkBtn
                location={!!(location === link.to)}
                onClick={() => {
                  navigate(`${link.to}`);
                  setIsMobileMenuOpen(false);
                }}
              >
                {link.text}
              </LinkBtn>
            </LinkItem>
          ))}
        </LinkList>
        <Row>
          {isLogin && userInfo?.userNickname ? (
            <MyprofileContainer>
              <MyprofileWrap>
                <MyProfile />
                {userInfo?.userNickname} 님 반가워요!
              </MyprofileWrap>
              <Button type="button" onClick={onClickLoginOutBtn}>
                로그아웃
              </Button>
            </MyprofileContainer>
          ) : (
            <Button
              onClick={() => {
                setIsSignModal(prev => ({ ...prev, in: true }));
              }}
            >
              로그인 / 회원가입
            </Button>
          )}
          <ClosBtn
            onClick={() => {
              setIsMobileMenuOpen(false);
            }}
          >
            x
          </ClosBtn>
        </Row>
      </RowBetwwen>
      {<Sign isSignModal={isSignModal} setIsSignModal={setIsSignModal} />}
    </HeaderContainer>
  );
};

export default Nav;

const HeaderContainer = styled.div<{ isMobileMenuOpen: boolean }>`
  width: 100%;
  display: flex;
  height: 60px;
  padding: 1rem 0;
  box-shadow: 0 1px 15px rgba(0, 0, 0, 0.04), 0 1px 6px rgba(0, 0, 0, 0.04);
  @media screen and (max-width: 768px) {
    height: ${({ isMobileMenuOpen }) => (isMobileMenuOpen ? "100%" : "60px")};
    flex-direction: column;
    padding: ${({ isMobileMenuOpen }) => (isMobileMenuOpen ? "2rem" : "1rem")};
  }
`;

const LogoIconWrap = styled(Link)<{ isMobileMenuOpen: boolean }>`
  font-weight: bold;
  color: ${({ theme: { color } }) => color.mainColor};
  font-size: 18px;
  width: 15%;
  min-width: 220px;
  padding: 0 2rem;
  display: block;
  @media screen and (max-width: 768px) {
    padding: 0;
    width: auto;
    min-width: auto;
    display: ${({ isMobileMenuOpen }) => (isMobileMenuOpen ? "none" : "block")};
  }
`;
const MyprofileContainer = styled.div`
  gap: 1rem;
  display: flex;
  margin-right: 1rem;
  @media screen and (max-width: 768px) {
    width: 100%;
    margin-right: 0;
  }
`;

const MyprofileWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const Button = styled.button`
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
const Row = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  @media screen and (max-width: 768px) {
    width: 100%;
    justify-content: space-between;
  }
`;

const LinkList = styled.ul`
  display: flex;
  align-items: center;
  gap: 1rem;
  @media screen and (max-width: 768px) {
    flex-direction: column;
    width: 100%;
    margin-top: 2rem;
  }
`;
const LinkItem = styled.li<{ location: boolean }>`
  display: block;
  width: 130px;
  text-align: center;
  font-weight: ${({ location }) => location && "bold"};
  border-bottom: ${({ theme: { color }, location }) =>
    location && `2px solid ${color.mainColor}`};
  padding: 2px;

  @media screen and (max-width: 768px) {
    width: 100%;
    padding: 1rem;
    border: none;
    a {
      text-align: left;
    }
  }
`;

const LinkBtn = styled.button<{ location: boolean }>`
  width: 100%;
  height: 100%;
  display: block;
  padding: 1rem;
  font-weight: ${({ location }) => location && "bold"};
`;
const RowBetwwen = styled.div<{ isMobileMenuOpen: boolean }>`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-right: 2rem;
  @media screen and (max-width: 768px) {
    flex-direction: column-reverse;
    display: ${({ isMobileMenuOpen }) => (isMobileMenuOpen ? "flex" : "none")};
    padding-right: 0;
  }
`;

const MobileMenuOpenBtn = styled.button<{ isMobileMenuOpen: boolean }>`
  display: none;
  ul {
    display: flex;
    flex-direction: column;
    gap: 5px;
  }
  li {
    background-color: #434343;
    display: block;
    width: 30px;
    height: 4px;
  }
  @media screen and (max-width: 768px) {
    display: block;
    display: ${({ isMobileMenuOpen }) => (isMobileMenuOpen ? "none" : "block")};
  }
`;

const LogoIconContainer = styled.div`
  width: 15%;
  min-width: 220px;
  @media screen and (max-width: 768px) {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
  }
`;
const ClosBtn = styled.button`
  font-size: 2rem;
  display: none;

  @media screen and (max-width: 768px) {
    display: block;
  }
`;
