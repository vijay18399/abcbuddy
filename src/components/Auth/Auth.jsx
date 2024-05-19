import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import AuthForm from './AuthForm';
import { AlertMessage } from '../Common';
import { AuthContext } from '../../providers/AuthProvider';
import { toast } from 'react-toastify';

const StyledHero = styled.div`
  margin-top: 20px;
  width: 400px;
  display: flex;
  justify-content: center;
  flex-direction: column;
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
      console.log(error);
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
      console.log(error);
      let errorMessage = 'An error occurred. Please try again later.';
      if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password' || error.code ==="auth/invalid-credential") {
         errorMessage = 'Invalid email or password.';
      }      
      setErrorMessage(errorMessage);
      toast.error(errorMessage);
    }
  };

  const handleFormSubmit = (email, password) => {
    setErrorMessage(''); 
    if (signUp) {
      handleSignUp(email, password);
    } else {
      handleLogin(email, password);
    }
  };

  return (
    <StyledHero>
      {errorMessage && <AlertMessage message={errorMessage} />}
      <AuthForm
        onSubmit={handleFormSubmit}
        buttonText={signUp ? 'Sign Up' : 'Login'}
        setSignUp={setSignUp}
        isSignUp={signUp}
      />
    </StyledHero>
  );
};

export default AuthPage;
