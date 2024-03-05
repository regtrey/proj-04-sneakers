import styled from 'styled-components';
import React, { useState } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { HiOutlineHeart, HiHeart } from 'react-icons/hi2';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

import { useAppDispatch } from '../store';
import {
  ICartItems,
  addCartItem,
  addFavouriteItem,
  deleteFavouriteItem,
} from '../features/cart/cartSlice';
import { useUser } from '../features/auth/useUser';
import { useShoe } from '../features/useShoe';
import { useAddCartItem } from '../features/cart/useAddCartItem';

import { Button } from '../ui/Button';

const StyledProductDetails = styled.div`
  padding: 6rem 0;
  display: flex;
  justify-content: center;
  gap: 4rem;
  position: relative;
`;

const ProductImageContainer = styled.div`
  height: 65rem;
  width: 55rem;
  position: relative;
`;

const ProductImage = styled(LazyLoadImage)`
  height: 100%;
  width: 100%;
  border-radius: var(--border-radius-md);
  display: block;
`;

const Details = styled.div`
  width: 70rem;
  width: max-content;
  padding: 2rem;
`;

const ProductName = styled.h1`
  font-size: 2.5rem;
  font-weight: 500;
`;

const ProductCategory = styled.h2`
  font-size: 2rem;
  font-weight: 500;
  margin: 0.75rem 0 1.5rem;
  text-transform: capitalize;
`;

const ProductPrice = styled.span`
  font-size: 2rem;
  font-weight: 500;
`;

const Container = styled.div`
  width: 38rem;
  margin: 3rem 0;
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  position: relative;

  & input {
    height: 100%;
    width: 100%;
    opacity: 0;
    position: absolute;
    cursor: pointer;
    z-index: 2;
  }
`;

interface IVariantsBox {
  $isSelected: boolean;
}

const ProductVariantsBox = styled.div<IVariantsBox>`
  height: 6.8rem;
  width: 6.8rem;
  border-radius: var(--border-radius-sm);
  outline: ${(props) =>
    props.$isSelected ? '1px solid #000' : '1px solid transparent'};
  position: relative;

  &:hover {
    outline: 1px solid #000;
  }
`;

const ProductVariantsImage = styled(LazyLoadImage)`
  height: 6.8rem;
  width: 6.8rem;
  border-radius: var(--border-radius-sm);
  object-position: center;
  object-fit: cover;
  display: block;
  cursor: pointer;
`;

const SizeHeading = styled.h2`
  font-size: 2rem;
  font-weight: 500;
`;

const SizeContainer = styled.div`
  height: max-content;
  width: 38rem;
  margin: 1rem 0 2rem;
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
`;

interface ISizeProps {
  $isSelected: boolean;
}

const Size = styled.div<ISizeProps>`
  height: 5rem;
  width: 12rem;
  font-size: 1.5rem;
  border: ${(props) =>
    props.$isSelected ? '1px solid #000' : '1px solid var(--color-gray-100)'};
  border-radius: var(--border-radius-sm);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;

  &:hover {
    border: 1px solid #000;
  }

  & input {
    height: 100%;
    width: 100%;
    opacity: 0;
    position: absolute;
    cursor: pointer;
    z-index: 2;
  }
`;

const ButtonContainer = styled.div`
  height: max-content;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  & svg {
    margin-left: 0.5rem;
  }
`;

function ProductDetails() {
  const [isFav, setIsFav] = useState(false);

  const location = useLocation();
  const currentPath = location.pathname.replace('/', '').split('/');

  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { isLoading, shoe, error } = useShoe(currentPath);

  const dispatch = useAppDispatch();

  const { userId, isAuthenticated } = useUser();
  const { addItem } = useAddCartItem();

  const currentSelectedStyle = Number(searchParams.get('style')) || 1;
  const currentSelectedSize = Number(searchParams.get('size'));

  if (isLoading) return 'Loading...';
  if (!shoe || error) return 'Error...';

  const {
    shoe_id,
    name,
    brand,
    category,
    tag,
    colors,
    sizes,
    price,
    image,
    alt,
    placeholder,
    slug,
    categorySlug,
  } = shoe;

  const handleSelect = (
    e: React.MouseEvent<HTMLInputElement>,
    field: string
  ) => {
    const target = e.target as HTMLInputElement;
    searchParams.set(field, target.value);
    setSearchParams(searchParams);
  };

  const handleAddItem = (field: string) => {
    if (!currentSelectedSize) return;

    const cartItems: ICartItems = {
      shoe_id,
      name,
      brand,
      category,
      tag,
      slug,
      categorySlug,
      color: colors[currentSelectedStyle - 1],
      sizes,
      selectedSize: currentSelectedSize,
      image: image[currentSelectedStyle - 1],
      alt,
      placeholder: image[currentSelectedStyle - 1],
      price,
      total: price,
      quantity: 1,
      isFavourite: isFav,
      user_id: userId,
    };

    if (!isAuthenticated) {
      if (field === 'cart') {
        dispatch(addCartItem(cartItems));
        navigate('/cart');
      }
      if (field === 'favourite' && !isFav) {
        dispatch(addFavouriteItem(cartItems));
        setIsFav(true);
      }
      if (field === 'favourite' && isFav) {
        dispatch(deleteFavouriteItem({ shoe_id }));
        setIsFav(false);
      }
    }

    if (isAuthenticated) {
      addItem(cartItems);
    }
  };

  return (
    <StyledProductDetails>
      <ProductImageContainer>
        <ProductImage
          src={image[currentSelectedStyle - 1]}
          alt={alt}
          placeholderSrc={placeholder[currentSelectedStyle - 1]}
          effect="blur"
        />
      </ProductImageContainer>
      <Details>
        <ProductName>{name}</ProductName>
        <ProductCategory>{category}'s Shoes</ProductCategory>
        <ProductPrice>${price}</ProductPrice>

        <Container>
          {image.map((variant, i) => (
            <ProductVariantsBox
              key={i}
              $isSelected={currentSelectedStyle === i + 1}
            >
              <input
                type="radio"
                value={i + 1}
                onClick={(e) => handleSelect(e, 'style')}
              />
              <ProductVariantsImage
                src={variant}
                alt={`${alt}-0${i}`}
                placeholderSrc={placeholder[i]}
                effect="blur"
              />
            </ProductVariantsBox>
          ))}
        </Container>

        <SizeHeading>Select Size</SizeHeading>
        <SizeContainer>
          {sizes.map((size, index) => {
            const curSize = size.split(' ')[1];
            return (
              <Size
                key={index}
                $isSelected={currentSelectedSize === Number(curSize)}
              >
                <input
                  id={curSize}
                  type="radio"
                  value={curSize}
                  onClick={(e) => handleSelect(e, 'size')}
                />
                {size}
              </Size>
            );
          })}
        </SizeContainer>

        <ButtonContainer>
          <Button
            $variant="primary"
            $size="lg"
            onClick={() => handleAddItem('cart')}
          >
            Add to Bag
          </Button>
          <Button
            $variant="secondary"
            $size="lg"
            onClick={() => handleAddItem('favourite')}
          >
            Favourite {isFav ? <HiHeart /> : <HiOutlineHeart />}
          </Button>
        </ButtonContainer>
      </Details>
    </StyledProductDetails>
  );
}

export default ProductDetails;
