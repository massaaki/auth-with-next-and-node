import { createContext, ReactNode, useEffect, useState } from "react";
import Router from 'next/router'
import { setCookie, parseCookies } from 'nookies';
import { decode } from 'jsonwebtoken';


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

  useEffect(() => {
    const { 'authproject.token': token } = parseCookies();
    if (token) {
      const { email, exp } = decode(token) as any;
      const expDate = new Date((exp as number) * 1000);
      const currentDate = new Date();
      const expired = expDate.getTime() - currentDate.getTime() < 0 ? true : false;

      if (!expired) {
        setUser({
          email: email as string
        });
      } else {
        setUser(null);
        Router.push('/');
      }
    }

  }, [])


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

      //updating token in header
      api.defaults.headers['Authorization'] = `Bearer ${token}`;

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
