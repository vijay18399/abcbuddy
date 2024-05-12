import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import AuthForm from '../components/AuthForm';
import { AuthContext } from '../providers/AuthProvider';
import { toast } from 'react-toastify';

const StyledHero = styled.div`
  margin-top: 20px;
  width: 100%;
  display: flex;
  justify-content: center;
`;

const AuthPage = () => {
  const { createUser, login } = useContext(AuthContext);
  const [errorMessage, setErrorMessage] = useState('');
  const [signUp, setSignUp] = useState(false);

  const handleSignUp = async (email, password) => {
    try {
      const result = await createUser(email, password);
      const user = result.user;
      console.log(user);
      toast.success('Sign up successful!');
    } catch (error) {
      console.error(error);
      let errorMessage = 'An error occurred. Please try again later.';
      if (error.code === 'auth/email-already-in-use') {
        errorMessage = 'Email is already in use. Please use a different email.';
      } else if (error.code === 'auth/weak-password') {
        errorMessage = 'Password is too weak. Please use a stronger password.';
      }
      setErrorMessage(errorMessage);
      toast.error(errorMessage);
    }
  };

  const handleLogin = async (email, password) => {
    try {
      await login(email, password);
    } catch (error) {
      console.error(error);
      let errorMessage = 'An error occurred. Please try again later.';
      if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
        errorMessage = 'Invalid email or password.';
      }
      setErrorMessage(errorMessage);
      toast.error(errorMessage);
    }
  };

  const handleFormSubmit = (email, password) => {
    if (signUp) {
      handleSignUp(email, password);
    } else {
      handleLogin(email, password);
    }
  };

  return (
    <StyledHero>
      <AuthForm
        onSubmit={handleFormSubmit}
        buttonText={signUp ? 'Sign Up' : 'Login'}
        errorMessage={errorMessage}
        setSignUp={setSignUp}
        isSignUp={signUp}
      />
    </StyledHero>
  );
};

export default AuthPage;
