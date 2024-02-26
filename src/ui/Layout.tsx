import styled from 'styled-components';
import { Outlet } from 'react-router-dom';

import Header from './Header';
import Footer from './Footer';

const StyledLayout = styled.div`
  height: 100dvh;
  display: grid;
  grid-template-rows: auto 1fr 20rem;
`;

const Main = styled.main`
  height: 100%;

  grid-row: 2 / 3;
`;

function Layout() {
  return (
    <StyledLayout>
      <Header />
      <Main>
        <Outlet />
      </Main>
      <Footer />
    </StyledLayout>
  );
}

export default Layout;
