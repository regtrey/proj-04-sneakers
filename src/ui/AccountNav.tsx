import styled from 'styled-components';
import { useState } from 'react';
import { Link } from 'react-router-dom';

import { useUser } from '../features/auth/useUser';
import { useSignout } from '../features/auth/useSignout';

import LinksModal from './LinksModal';

const StyledAccountNav = styled.div`
  background-color: var(--color-gray-100);
  padding: 1.2rem 4rem;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 1rem;
  position: relative;

  grid-row: 1 / 2;

  @media screen and (max-width: 768px) {
    display: none;
  }
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

function AccountNav() {
  const [show, setShow] = useState(false);

  const { user, isAuthenticated } = useUser();
  const { signout } = useSignout();

  return (
    <StyledAccountNav>
      {!isAuthenticated ? (
        <AccountLink to="/signup">Sign Up</AccountLink>
      ) : (
        <>
          <AccountName onMouseEnter={() => setShow((s) => !s)}>
            Hi, {user?.user_metadata.name.split(' ').at(0)}
          </AccountName>
          <span>|</span>
          <Signout onClick={() => signout()}>Sign out</Signout>
          {show && (
            <LinksModal
              $modalType="accountAuthenticated"
              setShow={setShow}
              links={[
                { field: 'Account', url: '/account' },
                { field: 'Orders', url: '/orders' },
              ]}
            />
          )}
        </>
      )}
    </StyledAccountNav>
  );
}

export default AccountNav;
