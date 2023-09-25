import { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { LogoIcon, MyProfile, Close } from "@/components/Svg";
import Sign from "./Sign";
import { useGetUserInfoMutation } from "./authHook/userAuthMutation";
import { useRecoilState } from "recoil";
import { userInfoAtom } from "@/atom/userInfo";
import { useGetLangListMutation } from "@/queryHook/useLangMutation";
import { useSetRecoilState } from "recoil";
import { langListAtom } from "@/atom/langList";
import * as S from "./style";

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
      <S.HeaderContainer>
        <S.LogoIconContainer>
          <S.LogoIconWrap to="/">
            <LogoIcon />
          </S.LogoIconWrap>
        </S.LogoIconContainer>

        <S.RowBetwwen>
          <S.LinkList>
            {links.map(link => (
              <S.LinkItem key={link.text} $location={!!(location === link.to)}>
                <S.LinkBtn
                  $location={!!(location === link.to)}
                  onClick={() => {
                    navigate(`${link.to}`);
                    setIsMobileMenuOpen(false);
                  }}
                >
                  {link.text}
                </S.LinkBtn>
              </S.LinkItem>
            ))}
          </S.LinkList>
          <S.Row>
            {isLogin && userInfo?.userNickname ? (
              <S.MyprofileContainer>
                <S.MyprofileWrap>
                  <MyProfile />
                  {userInfo?.userNickname} 님 반가워요!
                </S.MyprofileWrap>
                <S.Button type="button" onClick={onClickLoginOutBtn}>
                  로그아웃
                </S.Button>
              </S.MyprofileContainer>
            ) : (
              <S.Button
                onClick={() => {
                  setIsSignModal(prev => ({ ...prev, in: true }));
                }}
              >
                로그인 / 회원가입
              </S.Button>
            )}
          </S.Row>
        </S.RowBetwwen>
        {<Sign isSignModal={isSignModal} setIsSignModal={setIsSignModal} />}
      </S.HeaderContainer>
      <S.MoblieHeaderContainer $isMobileMenuOpen={isMobileMenuOpen}>
        <S.MoblieLogoIconContainer>
          <S.MoblieLogoIconWrap to="/">
            <LogoIcon />
          </S.MoblieLogoIconWrap>
          {isMobileMenuOpen ? (
            <S.MoblieClosBtn
              onClick={() => {
                setIsMobileMenuOpen(false);
              }}
            >
              <Close />
            </S.MoblieClosBtn>
          ) : (
            <S.MobileMenuOpenBtn
              onClick={() => {
                setIsMobileMenuOpen(true);
              }}
            >
              <ul>
                <li></li>
                <li></li>
                <li></li>
              </ul>
            </S.MobileMenuOpenBtn>
          )}
        </S.MoblieLogoIconContainer>

        {isMobileMenuOpen && (
          <S.MoblieRowBetwwen>
            <S.MoblieRow>
              {isLogin && userInfo?.userNickname && (
                <S.MoblieMyprofileContainer>
                  <S.MoblieMyprofileWrap>
                    <MyProfile />
                    <div>
                      <S.MoblieUserNickname>
                        {userInfo?.userNickname} 님 반가워요!
                      </S.MoblieUserNickname>
                      <S.MoblieUserUserId>
                        {userInfo?.userId}
                      </S.MoblieUserUserId>{" "}
                    </div>
                  </S.MoblieMyprofileWrap>
                </S.MoblieMyprofileContainer>
              )}
            </S.MoblieRow>
            <S.MoblieLinkList>
              {links.map(link => (
                <S.MoblieLinkItem
                  key={link.text}
                  $location={!!(location === link.to)}
                >
                  <S.MoblieLinkBtn
                    $location={!!(location === link.to)}
                    onClick={() => {
                      navigate(`${link.to}`);
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    {link.text}
                  </S.MoblieLinkBtn>
                </S.MoblieLinkItem>
              ))}
            </S.MoblieLinkList>
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
          </S.MoblieRowBetwwen>
        )}
        {<Sign isSignModal={isSignModal} setIsSignModal={setIsSignModal} />}
      </S.MoblieHeaderContainer>
    </>
  );
};

export default Nav;
