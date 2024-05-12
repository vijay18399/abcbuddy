import React from 'react';
import AuthProvider from './AuthProvider';
import { FirestoreProvider } from './FirestoreProvider';
import { AudioProvider } from './AudioProvider';
const AppProviders = ({ children }) => {
  return (
    <AuthProvider>
      <FirestoreProvider>
        <AudioProvider>
           {children}
        </AudioProvider>
      </FirestoreProvider>
    </AuthProvider>
  );
};

export default AppProviders;
