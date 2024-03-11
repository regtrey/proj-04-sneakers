import styled from 'styled-components';
import { useState } from 'react';

import { Button } from '../ui/Button';

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

  return (
    <StyledContactInfo>
      <Heading>Checkout</Heading>
      <Form>
        <Label>Contact information</Label>
        <InfoContainer>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <span>Email</span>
        </InfoContainer>

        <Label>Shipping address</Label>
        <InfoContainer $custom="grid-column: 1 / 3;">
          <Input
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <span>First name</span>
        </InfoContainer>
        <InfoContainer $custom="grid-column: 3 / 5;">
          <Input
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          <span>Last name</span>
        </InfoContainer>
        <InfoContainer>
          <Input value={address} onChange={(e) => setAddress(e.target.value)} />
          <span>Address</span>
        </InfoContainer>
        <InfoContainer>
          <Input value={country} onChange={(e) => setCountry(e.target.value)} />
          <span>Country</span>
        </InfoContainer>
        <InfoContainer $custom="grid-column: 1 / 3;">
          <Input value={city} onChange={(e) => setCity(e.target.value)} />
          <span>City</span>
        </InfoContainer>
        <InfoContainer $custom="grid-column: 3 / 5;">
          <Input
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
          />
          <span>Postal code</span>
        </InfoContainer>
        <Button
          type="submit"
          $variant="primary"
          $size="md"
          $custom="grid-column: 4 / -1;"
        >
          Checkout
        </Button>
      </Form>
    </StyledContactInfo>
  );
}

export default ContactInfo;
