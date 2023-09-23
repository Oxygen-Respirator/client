import { userInfoAtom } from "@/atom/userInfo";
import { Outlet, useLocation } from "react-router-dom";
import { useRecoilValue } from "recoil";
import styled from "styled-components";

export default function PageLayout() {
  const { pathname } = useLocation();

  const { userNickname } = useRecoilValue(userInfoAtom);

  const PrintPageText = () => {
    let header: string = "";
    let desc1: string = "";
    let desc2: string = "";

    if (pathname === "/rank") {
      header = "채찍 - RANK";
      desc1 = "모의 면접에서의 성적을 평가하고 다른 사용자와 경쟁해보세요.";
      desc2 = "채찍-랭킹은 일주일 간격으로 업데이트 됩니다.";
    } else if (pathname === "/report") {
      header = `${userNickname}님의 학습리포트`;
      desc1 =
        "모의면접을 기록한 리포트를 활용하여 자신의 강점과 개선할 점을 파악하세요. ";
    } else {
      return;
    }
    return (
      <TextBox>
        <PageH2>{header}</PageH2>
        <TextBox>
          <PageP>{desc1}</PageP>
          <PageP>{desc2}</PageP>
        </TextBox>
      </TextBox>
    );
  };
  return (
    <PageWrap>
      {PrintPageText()}
      <Outlet />
    </PageWrap>
  );
}

const PageWrap = styled.main`
  width: 100%;
  height: 100%;
  padding: 3rem;
  position: relative;
  @media screen and (max-width: 768px) {
    padding: 2rem;
  }
  @media screen and (max-width: 400px) {
    padding: 1rem;
  }
`;

const TextBox = styled.div``;

const PageH2 = styled.h2`
  font-weight: bold;
  font-size: 1.5rem;
  margin-bottom: 1rem;
`;

const PageP = styled.p`
  line-height: 1.5;
`;
