import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

import { useAppSelector } from '../store';

const StyledFavourites = styled.div`
  padding: 6rem 4rem;
  display: flex;
  flex-direction: column;
  gap: 4rem;
`;

const Heading = styled.h1`
  font-size: 3rem;
  font-weight: 500;
`;

const FavouritesContainer = styled.div`
  height: max-content;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2.5rem;
  row-gap: 5rem;
`;

const Product = styled.div`
  width: 100%;
`;

const ProductImage = styled(LazyLoadImage)`
  height: 100%;
  width: 100%;
  margin-bottom: 1rem;
  display: block;
`;

const ProductDetails = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Details = styled.h2`
  font-size: 1.5rem;
  font-weight: 500;
  line-height: 1.55;

  & span {
    font-weight: 400;
    color: var(--color-gray-400);
    text-transform: capitalize;
    display: block;
  }

  & a {
    cursor: pointer;
  }
`;

const ProductPrice = styled.span`
  font-size: 1.5rem;
  font-weight: 500;
`;

function Favourites() {
  const favouriteItems = useAppSelector((state) => state.cart.favouriteItems);

  return (
    <StyledFavourites>
      <Heading>Favourites</Heading>
      <FavouritesContainer>
        {favouriteItems.map((item) => (
          <Product key={item.shoe_id}>
            <Link to={`/${item.categorySlug}/${item.slug}`}>
              <ProductImage
                src={item.image}
                alt={item.alt}
                placeholderSrc={item.placeholder[0]}
                effect="blur"
              />
            </Link>
            <ProductDetails>
              <Details>
                <Link to={`/${item.categorySlug}/${item.slug}`}>
                  {item.name}
                </Link>{' '}
                <span>{item.category}'s shoes</span>
              </Details>
              <ProductPrice>${item.price}</ProductPrice>
            </ProductDetails>
          </Product>
        ))}
      </FavouritesContainer>
    </StyledFavourites>
  );
}

export default Favourites;
