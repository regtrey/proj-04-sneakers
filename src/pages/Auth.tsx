import styled from 'styled-components';
import React, { useState } from 'react';

import { Logo } from '../ui/Header';
import { Button } from '../ui/Button';
import { useLogin } from '../features/auth/useLogin';
import { useSignup } from '../features/auth/useSignup';
import { useLocation } from 'react-router-dom';

const StyledAuth = styled.div`
  padding: 6rem 0;
  display: flex;
  justify-content: center;
`;

const Form = styled.form`
  width: 30vw;
  /* background-color: orange; */
`;

const Label = styled.label`
  font-size: 2.75rem;
  font-weight: 500;
  display: block;
  margin-top: 2rem;
`;

const Input = styled.input`
  width: 100%;
  font-size: 1.5rem;
  margin: 2rem 0 1rem;
  padding: 1.75rem 1.5rem;
  border: 1px solid #000;
  border-radius: var(--border-radius-md);
`;

function Auth() {
  const [email, setEmail] = useState('reg@example.com');
  const [password, setPassword] = useState('123456');

  const location = useLocation();
  const currentPath = location.pathname.replace('/', '');

  const { login, loginLoading } = useLogin();
  const { signup, signupLoading } = useSignup();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;

    if (currentPath === 'signin') {
      login({ email, password });
    }
    if (currentPath === 'signup') {
      signup({ email, password });
    }
  };

  return (
    <StyledAuth>
      <Form onSubmit={handleSubmit}>
        <Logo>sneakers</Logo>
        <Label>
          Enter your credentials to sign{' '}
          {currentPath === 'signin' ? 'in' : 'up'}.
        </Label>
        <Input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          type="submit"
          $variant="primary"
          $size="md"
          $custom="width: 12rem; margin: 4rem 0 0 auto;"
          disabled={loginLoading || signupLoading}
        >
          Continue
        </Button>
      </Form>
    </StyledAuth>
  );
}

export default Auth;
