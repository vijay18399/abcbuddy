import React from 'react';
import styled, { css } from 'styled-components';

const messageStyles = {
  success: css`
    background-color: #d4edda;
    color: #155724;
    border: 1px solid #c3e6cb;
  `,
  error: css`
    background-color: #f8d7da;
    color: #721c24;
    border: 1px solid #f5c6cb;
  `,
  warning: css`
    background-color: #fff3cd;
    color: #856404;
    border: 1px solid #ffeeba;
  `,
};

const StyledMessage = styled.div`
  padding: 1rem;
  margin: 1rem 0;
  border-radius: 4px;
  ${({ type }) => messageStyles[type] || messageStyles.error}
`;

const AlertMessage = ({ type = 'error', message }) => {
  return <StyledMessage type={type}>{message}</StyledMessage>;
};

export default AlertMessage;
