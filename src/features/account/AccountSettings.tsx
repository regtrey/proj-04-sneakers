import styled from 'styled-components';
import { Button } from '../../ui/Button';
import React, { useEffect, useState } from 'react';
import { useUser } from '../auth/useUser';
import { useUpdateUser } from './useUpdateUser';

const StyledAccountSettings = styled.form`
  width: 70vw;
  width: 100%;
  background-color: var(--color-gray-0);
  border: 1px solid var(--color-gray-100);
  border-radius: var(--border-radius-md);
  padding: 2rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
`;

const InputContainer = styled.div`
  width: 85%;
  border-bottom: 1px solid var(--color-gray-100);
  padding: 1.5rem 0;
  padding-right: 40rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Label = styled.label`
  font-size: 1.6rem;
`;

const Input = styled.input`
  height: 4.5rem;
  width: 40rem;
  font-size: 1.6rem;
  border: 1px solid var(--color-gray-200);
  border-radius: var(--border-radius-sm);
  padding: 1.5rem;
`;

const ButtonContainer = styled.div`
  width: 85%;
  margin-top: 1rem;
  display: flex;
  justify-content: flex-end;
  gap: 1.5rem;
`;

function AccountSettings() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const { user } = useUser();
  const { updateUser } = useUpdateUser();

  console.log(user);

  useEffect(() => {
    if (user) {
      setEmail(user.email || '');
      setName(user.user_metadata.name);
    }
  }, [user]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    updateUser({ name, password });
    setName(user?.user_metadata.name);
    setPassword('');
  };

  const handleCancel = () => {
    setName(user?.user_metadata.name);
    setPassword('');
  };

  return (
    <StyledAccountSettings onSubmit={handleSubmit}>
      <InputContainer>
        <Label>Email</Label>
        <Input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={true}
        />
      </InputContainer>
      <InputContainer>
        <Label>Full name</Label>
        <Input value={name} onChange={(e) => setName(e.target.value)} />
      </InputContainer>
      <InputContainer>
        <Label>Password</Label>
        <Input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </InputContainer>

      <ButtonContainer>
        <Button
          type="reset"
          $variant="secondary"
          $size="md"
          $custom="padding: 2rem;"
          onClick={handleCancel}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          $variant="primary"
          $size="md"
          $custom="padding: 2rem;"
        >
          Update account
        </Button>
      </ButtonContainer>
    </StyledAccountSettings>
  );
}

export default AccountSettings;
