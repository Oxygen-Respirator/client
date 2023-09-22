import styled from "styled-components";
import { Outlet } from "react-router-dom";
import Nav from "./components/Nav/Nav";
import SideBar from "./components/SideBar";

const RootLayout = () => {
  return (
    <RootContainer>
      <Nav />
      <Row>
        <SideBar />
        <Outlet />
      </Row>
    </RootContainer>
  );
};

export default RootLayout;

const RootContainer = styled.div`
  width: 100vw;
  height: 100vh;
  overflow: hidden;
`;
const Row = styled.div`
  width: 100%;
  height: calc(100% - 60px);
  display: flex;
`;
