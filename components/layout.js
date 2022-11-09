import Footer from '../components/footer'
import Meta from '../components/meta'
import Login from '../components/login'

export default function Layout({ preview, children }) {

  return (
    <>
      <Meta />
      <Login message="You are not signed in" />
      <div className="min-h-screen">
        <main>{children}</main>
      </div>
      <Footer />
    </>
  )
}
