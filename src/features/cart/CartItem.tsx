import styled from 'styled-components';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { HiOutlineHeart, HiOutlineTrash } from 'react-icons/hi2';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

import { useAppDispatch } from '../../store';
import { ICartItems, deleteCartItem, updateItemQuantity } from './cartSlice';
import { useUser } from '../auth/useUser';
import { useUpdateCartItem } from './useUpdateCartItem';
import { useDeleteCartItem } from './useDeleteCartItem';

const StyledCartItem = styled.div`
  height: max-content;
  width: 100%;
  border-bottom: 1px solid var(--color-gray-100);
  padding: 2rem 0;
  display: flex;
  justify-content: space-between;
`;

const ItemImage = styled(LazyLoadImage)`
  height: 16.5rem;
  width: 16.5rem;
  object-position: center;
  object-fit: cover;
  display: block;
  margin-right: 1rem;
  background-color: var(--color-gray-300);
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
  }

  &:first-of-type {
    margin-right: 1.2rem;
  }
`;

interface ICartItemProps {
  item: ICartItems;
}

const quantityNumber = new Array(10).fill('number');

function CartItem({ item }: ICartItemProps) {
  const [size, setSize] = useState(0);
  const [qty, setQty] = useState(0);

  const { userId, isAuthenticated } = useUser();
  const { updateItem } = useUpdateCartItem(userId, item.cart_id);
  const { deleteItem } = useDeleteCartItem(userId);

  const dispatch = useAppDispatch();

  const {
    cart_id,
    shoe_id,
    name,
    category,
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

  useEffect(() => {
    setSize(selectedSize);
    setQty(quantity);
  }, []);

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
        dispatch(
          updateItemQuantity({ id: shoe_id, quantity: Number(target.value) })
        );
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

  const handleDelete = () => {
    if (!isAuthenticated) {
      dispatch(deleteCartItem({ shoe_id }));
    }
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
          <ActionButton>
            <HiOutlineHeart />
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
