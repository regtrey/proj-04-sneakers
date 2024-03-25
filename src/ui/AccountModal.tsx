import styled, { css } from 'styled-components';
import React from 'react';
import { Link } from 'react-router-dom';

import { useSignout } from '../features/auth/useSignout';

const modalType = {
  accountAuthenticated: css`
    width: 15rem;
    bottom: -16rem;
  `,
  accountNotAuthenticated: css`
    width: 15rem;
    bottom: -10.25rem;
  `,
  nav: css`
    width: 100%;
    bottom: -27rem;
  `,
};

interface IModal {
  $modalType?: 'accountAuthenticated' | 'accountNotAuthenticated' | 'nav';
}

const StyledAccountModal = styled.div<IModal>`
  height: max-content;
  width: 15rem;
  font-size: 1.5rem;
  background-color: var(--color-gray-0);
  border: 1px solid var(--color-gray-100);
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  position: absolute;
  bottom: -12rem;
  z-index: 2;

  & span {
    padding: 1.5rem;

    &:hover {
      background-color: var(--color-gray-200);
    }
  }

  @media screen and (max-width: 768px) {
    right: 0;

    ${(props) => props.$modalType && modalType[props.$modalType]}
  }
`;

interface AccountLinks {
  field: string;
  url: string;
}

interface FunctionLink {
  field: string;
  fn: string;
}

interface AccountModalProps {
  $modalType?: 'accountAuthenticated' | 'accountNotAuthenticated' | 'nav';
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  links: AccountLinks[];
  fnLink?: FunctionLink[];
}

function AccountModal({
  $modalType,
  setShow,
  links,
  fnLink,
}: AccountModalProps) {
  const { signout } = useSignout();

  return (
    <StyledAccountModal
      $modalType={$modalType}
      onMouseLeave={() => setShow((show) => !show)}
    >
      {links.map((link) => (
        <span key={link.field}>
          <Link to={link.url}>{link.field}</Link>
        </span>
      ))}
      {fnLink &&
        fnLink.map((link) => (
          <span
            key={link.field}
            onClick={link.fn === 'signout' ? () => signout() : undefined}
          >
            {link.field}
          </span>
        ))}
    </StyledAccountModal>
  );
}

export default AccountModal;
