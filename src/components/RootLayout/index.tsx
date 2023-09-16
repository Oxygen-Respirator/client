import styled from 'styled-components';
import { Outlet } from 'react-router-dom';
import Nav from './components/Nav/Nav';
import SideBar from './components/SideBar';

const index = () => {
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

export default index;

const RootContainer = styled.div`
  width: 100vw;
  height: 100vh;
`;
const Row = styled.div`
  width: 100%;
  height: calc(100% - 60px);
  display: flex;
`;
