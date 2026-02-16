import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 48px;
`;

const Message = styled.p`
  color: #e50914;
  font-size: 16px;
  text-align: center;
`;

interface ErrorMessageProps {
  message: string;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => (
  <Wrapper>
    <Message>{message}</Message>
  </Wrapper>
);