import { useContext, useEffect } from "react"
import { AuthContext } from "../contexts/AuthContext"
import { api } from "../services/api";

export default function DashboardPage() {
  const { user } = useContext(AuthContext);

  async function loadMe() {
    const me = await api.get('/me');
    console.log(me);
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