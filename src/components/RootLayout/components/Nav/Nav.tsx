import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { LogoIcon, MyProfile } from "@/components/Svg";
import Sign from "./Sign";
import { LogoIcon } from "@/components/Svg";
import { useGetUserInfoMutation } from "./authHook/authMutationHook";

const Nav = () => {
  const [isSignModal, setIsSignModal] = useState<IsSignModal>({
    in: false,
    up: false,
  });
  const links = [
    { to: "/", text: "AI 모의면접" },
    { to: "/rank", text: "랭킹" },
    { to: "/report", text: "학습 리포트" },
  ];

  const [userInfo, setUserInfo] = useState();

  const { mutateAsync: getUserInfo } = useGetUserInfoMutation();

  const [isLogin, setIsLogin] = useState(false);

  const onGetUserInfo = useCallback(async () => {
    await getUserInfo();
  }, [getUserInfo]);

  useEffect(() => {
    const isToken = localStorage.getItem("ptToken");
    if (isToken) {
      onGetUserInfo();
      setIsLogin(true);
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
    <HeaderContainer>
      <LogoIconWrap to="/">
        <LogoIcon />
      </LogoIconWrap>
      <RowBetwwen>
        <LinkList>
          {links.map((link, index) => (
            <LinkItem key={index}>
              <Link to={link.to}>{link.text}</Link>
            </LinkItem>
          ))}
        </LinkList>
        <div>
          {isLogin ? (
            <Row>
              <MyprofileWrap>
                <MyProfile />
                아리(Ari) 님 반가워요!
              </MyprofileWrap>
              <Button type="button" onClick={onClickLoginOutBtn}>
                로그아웃
              </Button>
            </Row>
          ) : (
            <Row>
              <Button
                onClick={() => {
                  setIsSignModal(prev => ({ ...prev, in: true }));
                }}
              >
                로그인 / 회원가입
              </Button>
            </Row>
          )}
        </div>
      </RowBetwwen>

      {<Sign isSignModal={isSignModal} setIsSignModal={setIsSignModal} />}
    </HeaderContainer>
  );
};

export default Nav;

const HeaderContainer = styled.div`
  width: 100%;
  display: flex;
  height: 60px;
  padding: 1rem 0;
  box-shadow: 0 1px 15px rgba(0, 0, 0, 0.04), 0 1px 6px rgba(0, 0, 0, 0.04);
`;

const LogoIconWrap = styled(Link)`
  font-weight: bold;
  color: ${({ theme: { color } }) => color.mainColor};
  font-size: 18px;
  width: 15%;
  min-width: 220px;
  padding: 0 2rem;
  display: block;
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
`;

const LinkList = styled.ul`
  display: flex;
  align-items: center;
  gap: 1rem;
`;
const LinkItem = styled.li`
  display: block;
  width: 130px;
  text-align: center;
  a {
    width: 100%;
    height: 100%;
    display: block;
    padding: 1rem;
  }
`;

const RowBetwwen = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-right: 2rem;
`;
