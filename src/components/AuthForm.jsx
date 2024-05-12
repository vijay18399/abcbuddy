import React, { useState } from 'react';
import styled from 'styled-components';
import ActionButton from './Button';

const StyledCard = styled.div`
  min-width: 400px;
  padding: 14px;
  border-radius: 10px;
  border: 1px solid #e5e5e5;
  box-shadow: 0 4px rgba(191, 222, 218, 0.75);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 24px;
  margin-bottom: 24px;
  color: #333;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  width: 85%;
`;

const Label = styled.label`
  font-size: 16px;
  margin-bottom: 8px;
  color: #666;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  :focus {
    border: 2px solid #82bc4d;
  }
`;

const ErrorMessage = styled.span`
  color: red;
  margin-top: 8px;
  font-size: 14px;
`;

const Info = styled.p`
  margin-top: 16px;
  font-size: 14px;
  color: #666;
  span {
    color: red;
    margin-top: 8px;
    font-size: 14px;
    cursor: pointer;
  }
`;

const AuthForm = ({ onSubmit, buttonText, errorMessage, setSignUp, isSignUp }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!email || !password) {
      alert('Please fill in all fields');
      return;
    }
    onSubmit(email, password);
  };

  return (
    <StyledCard>
      <Title>{buttonText}</Title>
      <Form onSubmit={handleSubmit}>
        <InputGroup>
          <Label>Email</Label>
          <Input
            type='email'
            name='email'
            placeholder='Enter Your Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </InputGroup>
        <InputGroup>
          <Label>Password</Label>
          <Input
            type='password'
            name='password'
            placeholder='Enter Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </InputGroup>

        <ActionButton type='submit'>{buttonText}</ActionButton>
        {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
      </Form>
      <Info>
        {isSignUp ? 'Already have an account?' : 'New to ABC Buddy?'}{' '}
        <span onClick={() => setSignUp(!isSignUp)}>{isSignUp ? 'Login' : 'Signup'}</span>
      </Info>
    </StyledCard>
  );
};

export default AuthForm;
