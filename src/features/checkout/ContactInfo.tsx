import styled from 'styled-components';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';

import { useUser } from '../auth/useUser';
import { useCart } from '../cart/useCart';
import { useAddCheckoutOrder } from './useAddCheckoutOrder';
import { useDeleteCheckoutOrder } from './useDeleteCheckoutOrder';

import { IOrder } from '../../types/ProductType';
import { Heading } from '../../ui/Heading';
import { Button } from '../../ui/Button';
import SpinnerMini from '../../ui/SpinnerMini';

const StyledContactInfo = styled.div`
  height: 72rem;
  width: 40vw;

  @media screen and (max-width: 850px) {
    height: 100%;
    width: 90vw;
  }
`;

const Form = styled.form`
  height: max-content;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
`;

const Label = styled.label`
  font-size: 1.5rem;
  font-weight: 500;
  display: block;

  grid-column: 1 / -1;
`;

const Input = styled.input`
  width: 100%;
  font-size: 1.5rem;
  padding: 2rem 1.5rem;
  border: 1px solid #000;
  border-radius: var(--border-radius-md);

  @media screen and (max-width: 850px) {
    font-size: 1.75rem;
    padding: 2.25rem 1.5rem 1rem;
  }
`;

interface ICustom {
  $custom?: string;
}

const InfoContainer = styled.div<ICustom>`
  position: relative;

  grid-column: 1 / -1;
  ${(props) => props.$custom}

  & span {
    font-size: 1.2rem;
    position: absolute;
    top: 5px;
    left: 1.5rem;
  }
`;

interface FormValues {
  email: string;
  firstName: string;
  lastName: string;
  address: string;
  country: string;
  city: string;
  postalCode: string;
}

function ContactInfo() {
  const navigate = useNavigate();
  const { register, setValue, handleSubmit, reset } = useForm<FormValues>();

  const { isAuthenticated, userId, user } = useUser();
  const { cartItems } = useCart(userId);
  const { addOrderItem, addOrderItemLoading } = useAddCheckoutOrder();
  const { deleteOrderItem } = useDeleteCheckoutOrder(userId);

  useEffect(() => {
    if (!isAuthenticated || !cartItems) {
      navigate('/');
    }
    if (user) {
      const userName = user.user_metadata.name.split(' ');

      setValue('email', user?.email || '');
      setValue('firstName', userName.at(0));

      if (userName.length > 1) setValue('lastName', userName.at(-1));
    }
  }, [isAuthenticated, user, cartItems, navigate, setValue]);

  const handleOrder: SubmitHandler<FormValues> = ({
    email,
    firstName,
    lastName,
    address,
    country,
    city,
    postalCode,
  }) => {
    if (!userId || !cartItems) return;

    const orderItem: IOrder = {
      email,
      firstName,
      lastName,
      address,
      country,
      city,
      postalCode,
      order: cartItems,
      user_id: userId,
    };

    if (cartItems.length > 0) {
      addOrderItem(orderItem, {
        onSettled: () => reset(),
      });
      deleteOrderItem(userId);
    }
  };

  const handleCancel = () => {
    reset();
  };

  return (
    <StyledContactInfo>
      <Heading>Checkout</Heading>
      <Form onSubmit={handleSubmit(handleOrder)}>
        <Label>Contact information</Label>

        <InfoContainer>
          <Input required type="email" {...register('email')} />
          <span>Email</span>
        </InfoContainer>

        <Label>Shipping address</Label>
        <InfoContainer $custom="grid-column: 1 / 3;">
          <Input required {...register('firstName')} />
          <span>First name</span>
        </InfoContainer>

        <InfoContainer $custom="grid-column: 3 / 5;">
          <Input required {...register('lastName')} />
          <span>Last name</span>
        </InfoContainer>

        <InfoContainer>
          <Input required {...register('address')} />
          <span>Address</span>
        </InfoContainer>

        <InfoContainer>
          <Input required {...register('country')} />
          <span>Country</span>
        </InfoContainer>

        <InfoContainer $custom="grid-column: 1 / 3;">
          <Input required {...register('city')} />
          <span>City</span>
        </InfoContainer>

        <InfoContainer $custom="grid-column: 3 / 5;">
          <Input required {...register('postalCode')} />
          <span>Postal code</span>
        </InfoContainer>

        <Button
          type="reset"
          $variant="secondary"
          $size="md"
          $custom="grid-column: 3 / 4;"
          onClick={handleCancel}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          $variant="primary"
          $size="md"
          $custom="grid-column: 4 / 5;"
        >
          {addOrderItemLoading ? <SpinnerMini /> : 'Checkout'}
        </Button>
      </Form>
    </StyledContactInfo>
  );
}

export default ContactInfo;
