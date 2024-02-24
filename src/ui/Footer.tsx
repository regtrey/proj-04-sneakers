import styled from 'styled-components';

const StyledFooter = styled.footer`
  padding: 2rem 4rem;
  background-color: #111111;

  grid-row: 3 / 4;
`;

function Footer() {
  return <StyledFooter>Footer</StyledFooter>;
}

export default Footer;
