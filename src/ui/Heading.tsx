import styled from 'styled-components';

export const Heading = styled.h1`
  width: 84.5vw;
  font-size: 5rem;
  font-weight: 500;
  letter-spacing: -2px;

  grid-column: 1 / -1;

  & span {
    text-transform: capitalize;
  }

  @media screen and (max-width: 768px) {
    font-size: 3rem;
  }
`;
