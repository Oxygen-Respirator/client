import { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { LogoIcon, MyProfile } from "@/components/Svg";
import Sign from "./Sign";
import { useGetUserInfoMutation } from "./authHook/authMutationHook";
import {
  HeaderContainer,
  LogoIconContainer,
  LogoIconWrap,
  RowBetwwen,
  LinkList,
  LinkItem,
  LinkBtn,
  Row,
  MyprofileContainer,
  MyprofileWrap,
  Button,
  MoblieHeaderContainer,
  MoblieLogoIconContainer,
  MoblieLogoIconWrap,
  MoblieClosBtn,
  MobileMenuOpenBtn,
  MoblieRowBetwwen,
  MoblieRow,
  MoblieMyprofileContainer,
  MoblieMyprofileWrap,
  MoblieUserNickname,
  MoblieUserUserId,
  MoblieLinkList,
  MoblieLinkItem,
  MoblieLinkBtn,
} from "./Nav";

export const Nav = () => {
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

  const [userInfo, setUserInfo] = useState({ userId: "", userNickname: "" });

  const { mutateAsync: getUserInfo } = useGetUserInfoMutation();

  const [isLogin, setIsLogin] = useState(false);

  const onGetUserInfo = useCallback(async () => {
    const {
      data: { data: _userInfo },
    } = await getUserInfo();
    setUserInfo(_userInfo);
    setIsLogin(true);
  }, [getUserInfo]);

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
