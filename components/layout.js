// import Alert from '../components/alert'
import Footer from '../components/footer'
import Meta from '../components/meta'
// import { useSession } from "next-auth/react"
import Login from '../components/login'

export default function Layout({ preview, children }) {
  // const { data: session, status } = useSession()
  // const loading = status === "loading"

  return (
    <>
      <Meta />
      <Login />
      <div className="min-h-screen">
        <main>{children}</main>
      </div>
      <Footer />
    </>
  )
}
