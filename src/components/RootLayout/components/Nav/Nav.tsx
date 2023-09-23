import { useCallback, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { LogoIcon, MyProfile, Close } from "@/components/Svg";
import Sign from "./Sign";
import { useGetUserInfoMutation } from "./authHook/userAuthMutation";
import { useRecoilState } from "recoil";
import { userInfoAtom } from "@/atom/userInfo";
import { useGetLangListMutation } from "@/queryHook/useLangMutation";
import { useSetRecoilState } from "recoil";
import { langListAtom } from "@/atom/langList";

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
  const setLangAry = useSetRecoilState(langListAtom);

  const { mutateAsync: getUserInfo } = useGetUserInfoMutation();
  const { mutateAsync: getLangList } = useGetLangListMutation();

  const [isLogin, setIsLogin] = useState(false);

  const onGetUserInfo = useCallback(async () => {
    const {
      data: { data: _userInfo },
    } = await getUserInfo();

    const { data: _langList } = await getLangList();
    setLangAry(_langList.data);
    setUserInfo(_userInfo);
    setIsLogin(true);
  }, [getLangList, getUserInfo, setLangAry, setUserInfo]);

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
    <>
      <HeaderContainer>
        <LogoIconContainer>
          <LogoIconWrap to="/">
            <LogoIcon />
          </LogoIconWrap>
        </LogoIconContainer>

        <RowBetwwen>
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
          </Row>
        </RowBetwwen>
        {<Sign isSignModal={isSignModal} setIsSignModal={setIsSignModal} />}
      </HeaderContainer>
      <MoblieHeaderContainer isMobileMenuOpen={isMobileMenuOpen}>
        <MoblieLogoIconContainer>
          <MoblieLogoIconWrap to="/">
            <LogoIcon />
          </MoblieLogoIconWrap>
          {isMobileMenuOpen ? (
            <MoblieClosBtn
              onClick={() => {
                setIsMobileMenuOpen(false);
              }}
            >
              <Close />
            </MoblieClosBtn>
          ) : (
            <MobileMenuOpenBtn
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
          )}
        </MoblieLogoIconContainer>

        {isMobileMenuOpen && (
          <MoblieRowBetwwen>
            <MoblieRow>
              {isLogin && userInfo?.userNickname && (
                <MoblieMyprofileContainer>
                  <MoblieMyprofileWrap>
                    <MyProfile />
                    <div>
                      <MoblieUserNickname>
                        {userInfo?.userNickname} 님 반가워요!
                      </MoblieUserNickname>
                      <MoblieUserUserId>{userInfo?.userId}</MoblieUserUserId>{" "}
                    </div>
                  </MoblieMyprofileWrap>
                </MoblieMyprofileContainer>
              )}
            </MoblieRow>
            <MoblieLinkList>
              {links.map((link, index) => (
                <MoblieLinkItem key={index} location={!!(location === link.to)}>
                  <MoblieLinkBtn
                    location={!!(location === link.to)}
                    onClick={() => {
                      navigate(`${link.to}`);
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    {link.text}
                  </MoblieLinkBtn>
                </MoblieLinkItem>
              ))}
            </MoblieLinkList>
            {isLogin ? (
              <button type="button" onClick={onClickLoginOutBtn}>
                로그아웃
              </button>
            ) : (
              <button
                onClick={() => {
                  setIsSignModal(prev => ({ ...prev, in: true }));
                }}
              >
                로그인 / 회원가입
              </button>
            )}
          </MoblieRowBetwwen>
        )}
        {<Sign isSignModal={isSignModal} setIsSignModal={setIsSignModal} />}
      </MoblieHeaderContainer>
    </>
  );
};

export default Nav;

const HeaderContainer = styled.div`
  width: 100%;
  display: flex;
  height: 60px;
  padding: 1rem 0;
  box-shadow: 0 1px 15px rgba(0, 0, 0, 0.04), 0 1px 6px rgba(0, 0, 0, 0.04);
  @media screen and (max-width: 768px) {
    display: none;
  }
`;
const LogoIconContainer = styled.div`
  width: 15%;
  min-width: 220px;
`;
const LogoIconWrap = styled(Link)`
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
const MyprofileContainer = styled.div`
  gap: 1rem;
  display: flex;
  margin-right: 1rem;
`;

const MyprofileWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  @media screen and (max-width: 1000px) {
    display: none;
  }
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
`;

const LinkList = styled.ul`
  display: flex;
  align-items: center;
  gap: 1rem;
`;
const LinkItem = styled.li<{ location: boolean }>`
  display: block;
  width: 130px;
  text-align: center;
  font-weight: ${({ location }) => location && "bold"};
  border-bottom: ${({ theme: { color }, location }) =>
    location && `2px solid ${color.mainColor}`};
  padding: 2px;
`;

const LinkBtn = styled.button<{ location: boolean }>`
  width: 100%;
  height: 100%;
  display: block;
  padding: 1rem;
  font-weight: ${({ location }) => location && "bold"};
`;
const RowBetwwen = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-right: 2rem;
`;

const MoblieHeaderContainer = styled.div<{ isMobileMenuOpen: boolean }>`
  display: none;
  width: 100%;
  @media screen and (max-width: 768px) {
    display: flex;
    flex-direction: column;
    height: ${({ isMobileMenuOpen }) => isMobileMenuOpen && "100%"};
  }
`;
const MoblieLogoIconContainer = styled.div`
  width: 100%;
  height: 60px;
  box-shadow: 0 1px 15px rgba(0, 0, 0, 0.04), 0 1px 6px rgba(0, 0, 0, 0.04);
  display: flex;
  align-items: center;
  justify-content: space-between;
  z-index: 999;
  padding: 1rem 2rem;
`;
const MoblieLogoIconWrap = styled(Link)`
  font-weight: bold;
  color: ${({ theme: { color } }) => color.mainColor};
  font-size: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const MoblieMyprofileContainer = styled.div`
  gap: 1rem;
  display: flex;
  padding: 1rem 2rem;
  width: 100%;
`;

const MoblieMyprofileWrap = styled.div`
  margin-top: 1.5rem;
  display: flex;
  align-items: center;
  gap: 1rem;
`;
const MoblieUserNickname = styled.p`
  font-weight: bold;
  font-size: 18px;
  margin-bottom: 3px;
`;
const MoblieUserUserId = styled.p`
  opacity: 0.5;
`;

const MoblieRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  width: 100%;
  height: 100%;
`;

const MoblieLinkList = styled.ul`
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  margin: 2rem 0;
  padding: 0 2rem;
`;
const MoblieLinkItem = styled.li<{ location?: boolean }>`
  width: 100%;
  font-weight: ${({ location }) => location && "bold"};
  border-bottom: ${({ theme: { color }, location }) =>
    location && `2px solid ${color.mainColor}`};
  background-color: ${({ theme: { color }, location }) =>
    location && color.subColor};
  padding: 2px;
  width: 100%;
  border: none;
`;

const MoblieLinkBtn = styled.button<{ location: boolean }>`
  width: 100%;
  height: 100%;
  padding: 1rem;
  font-weight: ${({ location }) => location && "bold"};
  text-align: left;
`;
const MoblieRowBetwwen = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  background-color: #fff;
  padding-right: 0;
`;

const MobileMenuOpenBtn = styled.button`
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

const MoblieClosBtn = styled.button`
  font-size: 2rem;
`;
