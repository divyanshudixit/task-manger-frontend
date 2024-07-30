import { useContext } from 'react';
import { AuthContextType, AuthContext } from '../components/jwt/auth-context';


// ----------------------------------------------------------------------

export const useAuthContext = (): AuthContextType => {
  const context = useContext<AuthContextType>(AuthContext);

  if (!context) throw new Error('useAuthContext context must be used inside AuthProvider');

  return context;
};
