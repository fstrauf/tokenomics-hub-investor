import Footer from '../components/footer'
import Meta from '../components/meta'
import Header from './header2'

export default function Layout({ children }) {

  // const Login = dynamic(() => import('../components/login'), { loading: () => <p>Loading</p> })

  return (
    <>
      <Meta />
      {/* <Login message="You are not signed in" /> */}
      {/* check for context when opening header */}
      <Header />


      <div className="min-h-screen pl-2 pr-2 max-w-md sm:max-w-2xl lg:max-w-screen-2xl m-auto">
        <main>{children}</main>
      </div>
      <Footer />
    </>
  )
}
