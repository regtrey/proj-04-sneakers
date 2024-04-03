import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { HiOutlineHeart, HiOutlineShoppingBag } from 'react-icons/hi2';

import Search from './Search';

const StyledNav = styled.nav`
  width: 60vw;
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media screen and (min-width: 768px) and (max-width: 850px) {
    display: none;
  }

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const NavLinkList = styled.ul`
  height: 100%;
  width: 50%;
  display: flex;
  justify-content: space-between;
`;

const NavigationLink = styled.li`
  height: 100%;
  font-size: 1.8rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  border-bottom: 2px solid transparent;

  &:hover {
    border-bottom: 2px solid black;
  }
`;

const NavMisc = styled.div`
  width: 35%;
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media screen and (min-width: 1800px) {
    width: 31%;
  }
`;

const NavMiscButton = styled(NavLink)`
  height: 4rem;
  width: 4rem;
  border-radius: var(--border-radius-sm);
  display: flex;
  align-items: center;
  justify-content: center;

  & svg {
    height: 2.5rem;
    width: 2.5rem;
  }

  &:hover {
    background-color: var(--color-gray-100);
  }
`;

interface HeaderLink {
  field: string;
  url: string;
}

const links: HeaderLink[] = [
  { field: 'New & Featured', url: '/new-and-featured' },
  { field: 'Men', url: '/mens' },
  { field: 'Women', url: '/womens' },
  { field: 'Kids', url: '/kids' },
  { field: 'Sports', url: '/sports' },
];

function Nav() {
  return (
    <StyledNav>
      <NavLinkList>
        {links.map((link) => (
          <NavigationLink key={link.field}>
            <NavLink to={link.url}>{link.field}</NavLink>
          </NavigationLink>
        ))}
      </NavLinkList>

      <NavMisc>
        <Search />
        <NavMiscButton to="/favourites">
          <HiOutlineHeart />
        </NavMiscButton>
        <NavMiscButton to="/cart">
          <HiOutlineShoppingBag />
        </NavMiscButton>
      </NavMisc>
    </StyledNav>
  );
}

export default Nav;
