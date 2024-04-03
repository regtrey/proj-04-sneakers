import styled from 'styled-components';
import { Outlet } from 'react-router-dom';

import Header from './Header';

const StyledLayout = styled.div`
  height: 100dvh;
  display: grid;
  grid-template-rows: auto auto 1fr;
`;

const Main = styled.main`
  height: 100%;
  overflow-x: hidden;

  grid-row: 3 / 4;
`;

function Layout() {
  return (
    <StyledLayout>
      <Header />
      <Main>
        <Outlet />
      </Main>
    </StyledLayout>
  );
}

export default Layout;
