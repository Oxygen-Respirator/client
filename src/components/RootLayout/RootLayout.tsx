import { Outlet } from "react-router-dom";
import Nav from "./components/Nav";
import SideBar from "./components/SideBar";
import * as S from "./style";

const RootLayout = () => {
  return (
    <S.RootContainer>
      <Nav />
      <S.Row>
        <SideBar />
        <Outlet />
      </S.Row>
    </S.RootContainer>
  );
};

export default RootLayout;
