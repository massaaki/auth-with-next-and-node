import { useContext, useEffect } from "react"
import { AuthContext } from "../contexts/AuthContext"
import { api } from "../services/api";
import { destroyCookie } from 'nookies';
import Router from "next/router";


export default function DashboardPage() {
  const { user } = useContext(AuthContext);

  async function loadMe() {
    try {
      const me = await api.get('/me');
      if (me) {
        console.log(me);
      }
    } catch {
      destroyCookie(undefined, 'authproject.token');
      destroyCookie(undefined, 'authproject.refreshToken');
      Router.push('/');
    }
  }

  useEffect(() => {
    loadMe();
  }, [])

  return (
    <>
      <h1>Dashboard</h1>
      <p>{user?.email}</p>
    </>
  )
}