import styled from 'styled-components';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { HiHeart, HiOutlineHeart, HiOutlineTrash } from 'react-icons/hi2';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

import { useUser } from '../auth/useUser';
import { useUpdateCartItem } from './useUpdateCartItem';
import { useDeleteCartItem } from './useDeleteCartItem';
import { useAddFavourite } from '../favourites/useAddFavourite';
import { useDeleteFavourite } from '../favourites/useDeleteFavourite';
import { useFavourite } from '../favourites/useFavourite';

import { ICart } from '../../types/ProductType';

const StyledCartItem = styled.div`
  height: max-content;
  width: 100%;
  border-bottom: 1px solid var(--color-gray-100);
  padding: 2rem 0;
  display: flex;
  justify-content: space-between;
`;

const ItemImage = styled(LazyLoadImage)`
  width: 16.5rem;
  height: 16.5rem;
  object-position: center;
  object-fit: cover;
  display: block;
  margin-right: 1rem;
  background-color: var(--color-gray-300);

  @media screen and (max-width: 360px) {
    width: 12.25rem;
    height: 12.25rem;
  }
`;

const ItemDetailsContainer = styled.div`
  width: 60%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const DetailsContainer = styled.div`
  line-height: 1.6;
`;

const ItemName = styled.h2`
  font-size: 1.6rem;
  font-weight: 500;
`;

const Details = styled.span`
  font-size: 1.6rem;
  color: var(--color-gray-500);
  display: block;
  text-transform: capitalize;
`;

const SelectLabel = styled.label`
  font-size: 1.6rem;
  color: var(--color-gray-500);
`;

const Select = styled.select`
  border: none;
  font-size: 1.5rem;
  color: var(--color-gray-500);
  margin: 0 1rem;
  padding: 0 0.5rem;

  &:first-of-type {
    margin: 0.5rem 0 0.25rem;
  }
`;

export const ItemPrice = styled.span`
  font-size: 1.6rem;
  font-weight: 500;
`;

const ActionContainer = styled.div`
  height: 5rem;
  width: max-content;
  display: flex;
  align-items: flex-end;
`;

const ActionButton = styled.button`
  background-color: transparent;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  & svg {
    height: 2.4rem;
    width: 2.4rem;
    color: #000;
  }

  &:first-of-type {
    margin-right: 1.2rem;
  }
`;

interface ICartItemProps {
  item: ICart;
}

const quantityNumber = new Array(10).fill('number');

function CartItem({ item }: ICartItemProps) {
  const [size, setSize] = useState(0);
  const [qty, setQty] = useState(0);
  const [isFav, setIsFav] = useState(false);

  const {
    shoe_id,
    cart_id,
    name,
    brand,
    category,
    tag,
    slug,
    categorySlug,
    color,
    sizes,
    selectedSize,
    image,
    alt,
    placeholder,
    quantity,
    price,
    total,
  } = item;

  const { userId, isAuthenticated } = useUser();
  const { updateItem } = useUpdateCartItem(userId, item.cart_id);
  const { deleteItem } = useDeleteCartItem(userId);

  const { favItem } = useFavourite(userId, shoe_id);
  const { addFavItem } = useAddFavourite();
  const { deleteFavItem } = useDeleteFavourite(userId, shoe_id);

  const curFavItem = favItem && favItem[0];

  useEffect(() => {
    setSize(selectedSize);
    setQty(quantity);

    if (curFavItem) {
      setIsFav(curFavItem?.isFavourite);
    }
    if (!curFavItem) {
      setIsFav(false);
    }
  }, [curFavItem, curFavItem?.isFavourite]);

  const handleSelect = (
    e: React.ChangeEvent<HTMLSelectElement>,
    field: string
  ) => {
    const target = e.target as HTMLSelectElement;

    if (!isAuthenticated) {
      if (field === 'size') {
        setSize(Number(target.value));
      }
      if (field === 'qty') {
        setQty(Number(target.value));
      }
    }

    let updatedItem;
    if (isAuthenticated) {
      if (field === 'size') {
        updatedItem = {
          selectedSize: Number(target.value),
        };

        setSize(Number(target.value));
        updateItem(updatedItem);
      }
      if (field === 'qty') {
        updatedItem = {
          quantity: Number(target.value),
          total: price * Number(target.value),
        };

        setQty(Number(target.value));
        updateItem(updatedItem);
      }
    }
  };

  const handleAddFav = () => {
    const cartItems: ICart = {
      shoe_id,
      name,
      brand,
      category,
      tag,
      slug,
      categorySlug,
      color,
      sizes,
      selectedSize,
      image,
      alt,
      placeholder,
      price,
      total: price,
      quantity: 1,
      isFavourite: true,
      user_id: userId,
    };

    if (isAuthenticated) {
      if (!isFav) {
        addFavItem(cartItems);
        setIsFav(true);
      }
      if (isFav) {
        deleteFavItem();
        setIsFav(false);
      }
    }
  };

  const handleDelete = () => {
    if (isAuthenticated) {
      deleteItem(cart_id);
    }
  };

  return (
    <StyledCartItem>
      <Link to={`/${categorySlug}/${slug}`}>
        <ItemImage
          src={image}
          alt={alt}
          placeholderSrc={placeholder}
          effect="blur"
        />
      </Link>

      <ItemDetailsContainer>
        <DetailsContainer>
          <ItemName>{name}</ItemName>
          <Details>
            {category}
            {category === 'kids' ? "'" : "'s"} Shoes
          </Details>
          <Details>{color}</Details>

          <SelectLabel>Size</SelectLabel>
          <Select value={size} onChange={(e) => handleSelect(e, 'size')}>
            {sizes.map((size, i) => {
              const sizeNum = size.split(' ')[1];
              return (
                <option key={i} value={sizeNum}>
                  {sizeNum}
                </option>
              );
            })}
          </Select>

          <SelectLabel>Quantity</SelectLabel>
          <Select value={qty} onChange={(e) => handleSelect(e, 'qty')}>
            {quantityNumber.map((_, i) => (
              <option key={i} value={i + 1}>
                {i + 1}
              </option>
            ))}
          </Select>
        </DetailsContainer>

        <ActionContainer>
          <ActionButton onClick={handleAddFav}>
            {isFav ? <HiHeart /> : <HiOutlineHeart />}
          </ActionButton>

          <ActionButton onClick={handleDelete}>
            <HiOutlineTrash />
          </ActionButton>
        </ActionContainer>
      </ItemDetailsContainer>

      <ItemPrice>${total}.00</ItemPrice>
    </StyledCartItem>
  );
}

export default CartItem;
