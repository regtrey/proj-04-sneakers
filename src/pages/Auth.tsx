import styled from 'styled-components';
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { useLogin } from '../features/auth/useLogin';
import { useSignup } from '../features/auth/useSignup';

import { Logo } from '../ui/Header';
import { Button } from '../ui/Button';
import SpinnerMini from '../ui/SpinnerMini';

const StyledAuth = styled.div`
  padding: 6rem 0;
  display: flex;
  justify-content: center;
`;

const Form = styled.form`
  width: 30vw;

  & p {
    font-size: 1.3rem;
    margin-top: 2rem;

    & a {
      color: blue;
    }
  }
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
  margin: 2rem 0 0.5rem;
  padding: 1.75rem 1.5rem;
  border: 1px solid #000;
  border-radius: var(--border-radius-md);
`;

function Auth() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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
      signup({ name, email, password });
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
        {currentPath === 'signup' && (
          <Input
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        )}
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
        {currentPath === 'signup' && (
          <p>
            Already have an account? <Link to="/signin">Sign in</Link>.
          </p>
        )}
        <Button
          type="submit"
          $variant="primary"
          $size="md"
          $custom="width: 12rem; margin: 2rem 0 0 auto;"
          disabled={loginLoading || signupLoading}
        >
          {/* {currentPath === 'signin' ? 'Sign In' : 'Sign Up'} */}
          {loginLoading || signupLoading ? (
            <SpinnerMini />
          ) : currentPath === 'signin' ? (
            'Sign In'
          ) : (
            'Sign Up'
          )}
        </Button>
      </Form>
    </StyledAuth>
  );
}

export default Auth;
