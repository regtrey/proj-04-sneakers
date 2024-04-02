import styled, { css } from 'styled-components';
import React from 'react';
import { Link } from 'react-router-dom';

import { useSignout } from '../features/auth/useSignout';
import Search from './Search';

const modalType = {
  accountAuthenticated: css`
    width: 15rem;
    bottom: -23rem;
  `,
  accountNotAuthenticated: css`
    width: 15rem;
    bottom: -17.5rem;
  `,
  nav: css`
    width: 100%;
    bottom: -33.2rem;
  `,
};

interface IModal {
  $modalType?: 'accountAuthenticated' | 'accountNotAuthenticated' | 'nav';
}

const StyledLinksModal = styled.div<IModal>`
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

  @media screen and (max-width: 850px) {
    right: 0;

    ${(props) => props.$modalType && modalType[props.$modalType]}
  }
`;

const ModalLink = styled(Link)`
  padding: 1.5rem;

  &:hover {
    background-color: var(--color-gray-200);
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

interface LinksModalProps {
  $modalType?: 'accountAuthenticated' | 'accountNotAuthenticated' | 'nav';
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  links: AccountLinks[];
  fnLink?: FunctionLink[];
}

function LinksModal({ $modalType, setShow, links, fnLink }: LinksModalProps) {
  const { signout } = useSignout();

  return (
    <StyledLinksModal
      $modalType={$modalType}
      onMouseLeave={() => setShow((show) => !show)}
    >
      {$modalType === 'nav' && <Search />}
      {links.map((link) => (
        <ModalLink key={link.field} to={link.url}>
          {link.field}
        </ModalLink>
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
    </StyledLinksModal>
  );
}

export default LinksModal;
