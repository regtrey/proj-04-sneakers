import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

import { useUser } from '../auth/useUser';
import { useFavourites } from './useFavourites';

import Spinner from '../../ui/Spinner';

const StyledFavItems = styled.div`
  height: max-content;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2.5rem;
  row-gap: 5rem;

  @media screen and (min-width: 1800px) {
    grid-template-columns: repeat(4, 1fr);
  }

  @media screen and (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 2rem;
    row-gap: 3rem;
  }
`;

const Product = styled.div`
  width: 100%;
`;

const ProductImage = styled(LazyLoadImage)`
  width: 100%;
  height: 100%;
  margin-bottom: 1rem;
  display: block;
`;

const ProductDetails = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media screen and (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
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

const Empty = styled.div`
  height: 20rem;
  width: 85vw;
  font-size: 2rem;
  margin-top: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

function FavItems() {
  const { isAuthenticated, userId } = useUser();
  const { favouriteItems, favouriteItemsLoading } = useFavourites(userId);

  return (
    <StyledFavItems>
      {favouriteItemsLoading && (
        <Empty>
          <Spinner />
        </Empty>
      )}
      {(!isAuthenticated && !favouriteItemsLoading) ||
      favouriteItems?.length === 0 ? (
        <Empty>You don't have any favourites</Empty>
      ) : null}
      {favouriteItems?.map((item) => (
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
              <Link to={`/${item.categorySlug}/${item.slug}`}>{item.name}</Link>{' '}
              <span>{item.category}'s shoes</span>
            </Details>
            <ProductPrice>${item.price}</ProductPrice>
          </ProductDetails>
        </Product>
      ))}
    </StyledFavItems>
  );
}

export default FavItems;
