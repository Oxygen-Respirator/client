import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { signUpModalOpenAtom } from "@/atom/modal";
import { deleteCookie, getCookie, setCookie } from "@/utils/cookie";

const Nav = () => {
  const setSignUpModalOpen = useSetRecoilState(signUpModalOpenAtom);
  const [isLogin, setIsLogin] = useState(false);
  const token = getCookie("token");
  const expirationTime = new Date();

  useEffect(() => {
    if (token) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  }, [token]);

  return (
    <HeaderContainer>
      <LogoText to="/">ai 멘토 머시기</LogoText>
      <div>
        {isLogin ? (
          <Row>
            <p>아리 님 환영합니다</p>
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
                expirationTime.setHours(expirationTime.getHours() + 24);
                setCookie("token", "token", {
                  path: "/",
                  secure: true,
                  expires: expirationTime,
                });
                location.href = "/";
              }}
            >
              로그인
            </Button>
            <Button
              onClick={() => {
                setSignUpModalOpen(true);
              }}
            >
              회원가입
            </Button>
          </Row>
        )}
      </div>
    </HeaderContainer>
  );
};

export default Nav;

const HeaderContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 60px;
  padding: 1rem 2rem;
  box-shadow: 0 1px 15px rgba(0, 0, 0, 0.04), 0 1px 6px rgba(0, 0, 0, 0.04);
`;

const LogoText = styled(Link)`
  font-weight: bold;
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  color: #474747;
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
