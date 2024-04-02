import styled from 'styled-components';

import { Heading } from '../ui/Heading';
import FavItems from '../ui/FavItems';

const StyledFavourites = styled.div`
  padding: 6rem 8rem;
  display: flex;
  flex-direction: column;
  gap: 4rem;

  @media screen and (max-width: 850px) {
    padding: 2rem;
    gap: 2rem;
  }
`;

function Favourites() {
  return (
    <StyledFavourites>
      <Heading>Favourites</Heading>
      <FavItems />
    </StyledFavourites>
  );
}

export default Favourites;
