import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import { deleteCookie } from "@/utils/cookie";
import { LogoIcon, MyProfile } from "@/components/Svg";
import Sign from "./Sign";

const Nav = () => {
  const params = useParams();
  const [isSignModal, setIsSignModal] = useState<IsSignModal>({
    in: false,
    up: false,
  });
  const links = [
    { to: "/", text: "AI 모의면접" },
    { to: "/rank", text: "랭킹" },
    { to: "/report", text: "학습 리포트" },
  ];
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    const isToken = localStorage.getItem("ptToken");
    if (isToken) {
      setIsLogin(true);
    }
  }, [isSignModal]);

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
              <Button
                type="button"
                onClick={() => {
                  deleteCookie("token");
                  location.href = "/";
                }}
              >
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
                로그인
              </Button>
              <Button
                onClick={() => {
                  setIsSignModal(prev => ({ ...prev, up: true }));
                }}
              >
                회원가입
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
