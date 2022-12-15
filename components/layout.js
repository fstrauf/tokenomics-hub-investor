import Footer from '../components/footer'
import Meta from '../components/meta'
import Login from '../components/login'

export default function Layout({ preview, children }) {

  return (
    <>
      <Meta />
      <Login message="You are not signed in" />
      <div className="min-h-screen max-w-xl md:max-w-screen-xl m-auto">
        <main>{children}</main>
      </div>
      <Footer />
    </>
  )
}
