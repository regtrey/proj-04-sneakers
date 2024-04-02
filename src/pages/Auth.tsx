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

  @media screen and (min-width: 768px) and (max-width: 800px) {
    padding: 8rem 0;
  }

  @media screen and (max-width: 767px) {
    padding: 6rem 0;
  }

  @media screen and (max-width: 350px) {
    padding: 2rem 0;
  }
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

  @media screen and (min-width: 768px) and (max-width: 850px) {
    width: 65vw;

    & p {
      margin-top: 1rem;
    }
  }

  @media screen and (max-width: 767px) {
    width: 75vw;

    & p {
      margin-top: 1rem;
    }
  }
`;

const Label = styled.label`
  font-size: 2.75rem;
  font-weight: 500;
  display: block;
  margin-top: 2rem;
`;

interface InputProps {
  $hasError: boolean;
}

const Input = styled.input<InputProps>`
  width: 100%;
  font-size: 1.5rem;
  margin: 2rem 0 0.5rem;
  padding: 1.75rem 1.5rem;
  border: ${(props) => (props.$hasError ? '1px solid red' : '1px solid #000')};
  border-radius: var(--border-radius-md);
`;

const ErrorMessage = styled.span`
  font-size: 1.3rem;
  color: red;
`;

function Auth() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [hasError, setHasError] = useState(false);

  const location = useLocation();
  const currentPath = location.pathname.replace('/', '');

  const { login, loginLoading, loginError } = useLogin();
  const { signup, signupLoading, signupError } = useSignup();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentPath === 'signup') {
      if (!name || !email || !password || password.length < 6) {
        setHasError(true);
        return;
      }
    }
    if (currentPath === 'signin') {
      if (!email || !password) {
        setHasError(true);
        return;
      }
    }

    setHasError(false);
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
        <Link to="/">
          <Logo>sneakers</Logo>
        </Link>
        <Label>
          Enter your credentials to sign{' '}
          {currentPath === 'signin' ? 'in' : 'up'}.
        </Label>
        {currentPath === 'signup' && (
          <Input
            $hasError={hasError}
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        )}
        <Input
          $hasError={hasError}
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          $hasError={hasError}
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {currentPath === 'signup' && hasError && (
          <ErrorMessage>
            {name && email && password.length < 6
              ? 'Password must be at least 6 characters'
              : 'Please fill up the required fields.'}
          </ErrorMessage>
        )}
        {currentPath === 'signup' && signupError ? (
          <ErrorMessage>
            There was an error while signing up. Please try again.
          </ErrorMessage>
        ) : null}
        {(currentPath === 'signin' && loginError) ||
        (currentPath === 'signin' && hasError) ? (
          <ErrorMessage>Incorrect email or password</ErrorMessage>
        ) : null}
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
