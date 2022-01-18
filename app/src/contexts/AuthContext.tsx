import { createContext, ReactNode, useState } from "react";
import Router from 'next/router'
import { api } from "../services/api";


type User = {
  email: string;
}

type SignInCredentails = {
  email: string;
  password: string;
}

type AuthContextData = {
  signIn(credentails: SignInCredentails): Promise<void>;
  user: User;
  isAuthenticated: boolean;
}

type AuthProviderProps = {
  children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextData);



export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User>(null);
  const isAuthenticated = !!user;

  async function signIn({ email, password }: SignInCredentails) {
    try {
      const response = await api.post('login', { email, password });
      console.log('response..:', response);

      setUser({
        email
      })

      Router.push('/dashboard');

    } catch (error) {
      console.log(error);
    }
  }

  return (
    <AuthContext.Provider value={{ signIn, user, isAuthenticated }} >
      {children}
    </AuthContext.Provider>
  )
}
