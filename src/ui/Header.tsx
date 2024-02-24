import styled from 'styled-components';
import Nav from './Nav';
import { Link } from 'react-router-dom';

const StyledHeader = styled.header`
  padding: 0.5rem 4rem;
  display: flex;
  justify-content: space-between;

  grid-row: 1 / 2;
`;

const Logo = styled.h1`
  font-size: 4rem;
  font-weight: 700;
  letter-spacing: -3px;
  cursor: pointer;
`;

function Header() {
  return (
    <StyledHeader>
      <Link to="/">
        <Logo>sneakers</Logo>
      </Link>
      <Nav />
    </StyledHeader>
  );
}

export default Header;
