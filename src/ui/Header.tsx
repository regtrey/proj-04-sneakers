import styled from 'styled-components';
import { Link } from 'react-router-dom';

import Nav from './Nav';
import { useUser } from '../features/auth/useUser';

const StyledHeader = styled.header`
  padding: 0.5rem 4rem;
  display: flex;
  justify-content: space-between;

  grid-row: 2 / 3;
`;

export const Logo = styled.h1`
  font-size: 4rem;
  font-weight: 700;
  letter-spacing: -3px;
  cursor: pointer;
`;

const AccountNav = styled.div`
  background-color: var(--color-gray-100);
  padding: 1.2rem 4rem;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 1rem;

  grid-row: 1 / 2;
`;

const AccountLink = styled(Link)`
  font-size: 1.25rem;
  font-weight: 500;
`;

function Header() {
  const { user, isAuthenticated } = useUser();

  return (
    <>
      <AccountNav>
        {!isAuthenticated ? (
          <>
            <AccountLink to="/signin">Sign In</AccountLink>
            <span>|</span>
            <AccountLink to="/signup">Sign Up</AccountLink>{' '}
          </>
        ) : (
          `${user?.email}`
        )}
      </AccountNav>
      <StyledHeader>
        <Link to="/">
          <Logo>sneakers</Logo>
        </Link>
        <Nav />
      </StyledHeader>
    </>
  );
}

export default Header;
