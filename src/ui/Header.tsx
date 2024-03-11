import styled from 'styled-components';
import { Link } from 'react-router-dom';

import Nav from './Nav';
import { useUser } from '../features/auth/useUser';
import { useSignout } from '../features/auth/useSignout';

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

const Signout = styled.button`
  font-size: 1.25rem;
  border: none;
  cursor: pointer;
`;

const AccountLink = styled(Link)`
  font-size: 1.25rem;
  font-weight: 500;
`;

const AccountName = styled.span`
  font-size: 1.25rem;
  font-weight: 500;
  text-transform: capitalize;
`;

function Header() {
  const { user, isAuthenticated } = useUser();
  const { signout } = useSignout();

  return (
    <>
      <AccountNav>
        {!isAuthenticated ? (
          <AccountLink to="/signup">Sign Up</AccountLink>
        ) : (
          <>
            <AccountName>Hi, {user?.user_metadata.name}</AccountName>
            <span>|</span>
            <Signout onClick={() => signout()}>Sign out</Signout>
          </>
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
