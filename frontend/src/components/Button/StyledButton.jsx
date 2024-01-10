import styled, { css } from "styled-components";

const sizes = {
  small: css`
    font-size: 0.8;
    padding: 0.2rem 0.6rem;
    text-transform: uppercase;
    font-weight: 700;
    text-align: center;
  `,
  medium: css`
    font-size: 1.125rem;
    padding: 0.6rem 1.4rem;
    font-weight: 500;
  `,
  large: css`
    font-size: 1.4rem;
    padding: 1rem 2.2rem;
    font-weight: 500;
  `,
};

const variations = {
  primary: css`
    color: var(--color-brand-50);
    background-color: var(--color-green-600);

    &:hover {
      background-color: var(--color-green-700);
    }
  `,

  primaryBlue: css`
    color: var(--color-brand-50);
    background-color: var(--color-blue-600);

    &:hover {
      background-color: var(--color-blue-700);
    }
  `,

  secondary: css`
    color: var(--color-grey-600);
    background: var(--color-grey-0);
    border: var(--color-grey-200);

    &:hover {
      background-color: var(--color-grey-100);
    }
  `,

  danger: css`
    color: var(--color-red-100);
    background-color: var(--color-red-700);

    &:hover {
      background-color: var(--color-red-600);
      color: var(--color-grey-0);
    }
  `,

  closeTab: css`
    position: absolute;
    right: 1rem;
    top: 1rem;
    border-radius: 0.5rem;
    padding: 0;
  `,
};

const StyledButton = styled.button`
  ${(props) =>
    props.$variations !== "closeTab" &&
    css`
      border: none;
      border-radius: var(--border-radius-sm);
      box-shadow: var(--shadow-sm);
    `}

  ${(props) => sizes[props.$size]}
  ${(props) => variations[props.$variations]}
`;

export default StyledButton;
