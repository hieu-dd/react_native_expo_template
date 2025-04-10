import React from 'react';
import { useAuth } from './hooks/useAuth';

const AuthProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  useAuth();
  return <>{children}</>;
};
export default AuthProvider;
