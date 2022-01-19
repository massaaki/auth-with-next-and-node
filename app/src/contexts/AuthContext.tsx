import { createContext, ReactNode, useState } from "react";
import Router from 'next/router'
import { setCookie } from 'nookies';

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

type LoginResponse = {
  token: string;
  refresh_token: string;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User>(null);
  const isAuthenticated = !!user;

  async function signIn({ email, password }: SignInCredentails) {
    try {
      const response = await api.post('login', { email, password });
      const { token, refresh_token } = response.data as LoginResponse

      setCookie(undefined, 'authproject.token', token, {
        maxAge: 60 * 60 * 24 * 30, //30 days
        path: '/', //paths that will have this cookie information
      });
      setCookie(undefined, 'authproject.refreshToken', refresh_token, {
        maxAge: 60 * 60 * 24 * 30, //30 days
        path: '/', //paths that will have this cookie information
      });


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
