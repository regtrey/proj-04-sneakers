import styled from 'styled-components';
import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import {
  HiOutlineUser,
  HiOutlineShoppingBag,
  HiOutlineBars3,
} from 'react-icons/hi2';

import { useUser } from '../features/auth/useUser';

import Nav from './Nav';
import AccountNav from './AccountNav';
import LinksModal from './LinksModal';

const StyledHeader = styled.header`
  padding: 0.5rem 4rem;
  display: flex;
  justify-content: space-between;

  grid-row: 2 / 3;

  @media screen and (min-width: 768px) and (max-width: 850px) {
    width: 100vw;
    padding: 1rem;
    align-items: center;
    position: relative;
  }

  @media screen and (max-width: 767px) {
    width: 100vw;
    padding: 0.5rem 1rem;
    align-items: center;
    position: relative;
  }
`;

export const Logo = styled.h1`
  font-size: 4rem;
  font-weight: 700;
  letter-spacing: -3px;
`;

const MobileNav = styled.div`
  display: none;

  & svg {
    height: 2.5rem;
    width: 2.5rem;
    display: none;
    cursor: pointer;

    @media screen and (max-width: 850px) {
      display: block;
    }
  }

  @media screen and (max-width: 850px) {
    width: 10rem;
    display: flex;
    justify-content: space-between;
  }
`;

const NavIcon = styled(HiOutlineBars3)`
  height: 2.75rem;
  width: 2.75rem;
  display: none;
  cursor: pointer;

  @media screen and (max-width: 850px) {
    display: block;
  }
`;

function Header() {
  const [show, setShow] = useState(false);
  const [showNav, setShowNav] = useState(false);

  const { isAuthenticated } = useUser();

  return (
    <>
      <AccountNav />
      <StyledHeader>
        <Link to="/">
          <Logo>sneakers</Logo>
        </Link>
        <Nav />

        {/* Mobile Navigation */}
        <MobileNav>
          <HiOutlineUser
            onClick={() => {
              setShow((show) => !show);
              setShowNav(false);
            }}
          />
          <NavLink to="/cart">
            <HiOutlineShoppingBag />
          </NavLink>
          {!isAuthenticated && show && (
            <LinksModal
              $modalType="accountNotAuthenticated"
              setShow={setShow}
              links={[
                { field: 'Favourites', url: '/favourites' },
                { field: 'Sign up', url: '/signup' },
                { field: 'Sign in', url: '/signin' },
              ]}
            />
          )}
          {isAuthenticated && show && (
            <LinksModal
              $modalType="accountAuthenticated"
              setShow={setShow}
              links={[
                { field: 'Account', url: '/account' },
                { field: 'Orders', url: '/orders' },
                { field: 'Favourites', url: '/favourites' },
              ]}
              fnLink={[{ field: 'Sign out', fn: 'signout' }]}
            />
          )}

          <NavIcon
            onClick={() => {
              setShow(false);
              setShowNav((showNav) => !showNav);
            }}
          />
          {showNav && (
            <LinksModal
              $modalType="nav"
              setShow={setShowNav}
              links={[
                { field: 'New & Featured', url: '/new-and-featured' },
                { field: 'Men', url: '/mens' },
                { field: 'Women', url: '/womens' },
                { field: 'Kids', url: '/kids' },
                { field: 'Sports', url: '/sports' },
              ]}
            />
          )}
        </MobileNav>
      </StyledHeader>
    </>
  );
}

export default Header;
