import Footer from '../components/footer'
import Meta from '../components/meta'
import Login from '../components/login'

export default function Layout({ children }) {

  return (
    <>
      <Meta />
      <Login message="You are not signed in" />
      <div className="min-h-screen pl-2 pr-2 max-w-md sm:max-w-2xl lg:max-w-screen-xl m-auto">
        <main>{children}</main>
      </div>
      <Footer />
    </>
  )
}
