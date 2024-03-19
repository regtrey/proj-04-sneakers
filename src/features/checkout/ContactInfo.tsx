import styled from 'styled-components';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useUser } from '../auth/useUser';
import { useCart } from '../cart/useCart';
import { useAddCheckoutOrder } from './useAddCheckoutOrder';
import { useDeleteCheckoutOrder } from './useDeleteCheckoutOrder';

import { IOrder } from '../../types/ProductType';
import { Button } from '../../ui/Button';
import SpinnerMini from '../../ui/SpinnerMini';

const StyledContactInfo = styled.div`
  height: 72rem;
  width: 40vw;
`;

const Heading = styled.h1`
  font-size: 4rem;
  font-weight: 500;
  margin-bottom: 2rem;
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

function ContactInfo() {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [address, setAddress] = useState('');
  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');

  const navigate = useNavigate();
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

      setEmail(user?.email || '');
      setFirstName(userName.at(0));

      if (userName.length > 1) setLastName(userName.at(-1));
    }
  }, [isAuthenticated, user, cartItems, navigate]);

  const handleOrder = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

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
      addOrderItem(orderItem);
      deleteOrderItem(userId);
    }
  };

  const handleCancel = () => {
    setEmail('');
    setFirstName('');
    setLastName('');
    setAddress('');
    setCountry('');
    setCity('');
    setPostalCode('');
  };

  return (
    <StyledContactInfo>
      <Heading>Checkout</Heading>
      <Form onSubmit={handleOrder}>
        <Label>Contact information</Label>
        <InfoContainer>
          <Input
            required
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <span>Email</span>
        </InfoContainer>

        <Label>Shipping address</Label>
        <InfoContainer $custom="grid-column: 1 / 3;">
          <Input
            required
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <span>First name</span>
        </InfoContainer>
        <InfoContainer $custom="grid-column: 3 / 5;">
          <Input
            required
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          <span>Last name</span>
        </InfoContainer>
        <InfoContainer>
          <Input
            required
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <span>Address</span>
        </InfoContainer>
        <InfoContainer>
          <Input
            required
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          />
          <span>Country</span>
        </InfoContainer>
        <InfoContainer $custom="grid-column: 1 / 3;">
          <Input
            required
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <span>City</span>
        </InfoContainer>
        <InfoContainer $custom="grid-column: 3 / 5;">
          <Input
            required
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
          />
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
