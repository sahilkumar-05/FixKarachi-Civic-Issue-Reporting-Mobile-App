import React, {
  createContext,
  useContext,
  useState
} from 'react';

interface User {
  name: string;
  email: string;
  password: string;
}

const AuthContext = createContext<any>(null);

export const AuthProvider = ({
  children,
}: any) => {

  const [user, setUser] =
    useState<User | null>(null);

  const register = (
    name: string,
    email: string,
    password: string
  ) => {

    setUser({
      name,
      email,
      password,
    });
  };

  const login = (
    email: string,
    password: string
  ) => {

    if (
      user?.email === email &&
      user?.password === password
    ) {
      return true;
    }

    return false;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        register,
        login,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};