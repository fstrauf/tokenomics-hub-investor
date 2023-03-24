import Footer from '../components/footer'
import Meta from '../components/meta'
import Header from './header2'

export default function Layout({ children, mode }) {
  // console.log("🚀 ~ file: layout.js:6 ~ Layout ~ mode:", mode)

  // const Login = dynamic(() => import('../components/login'), { loading: () => <p>Loading</p> })

  return (
    <>
      <Meta />
      {/* <Login message="You are not signed in" /> */}
      {/* check for context when opening header */}
      <Header mode={mode} />

      <div className="m-auto min-h-screen max-w-md pl-2 pr-2 sm:max-w-2xl lg:max-w-screen-2xl">
        <main>{children}</main>
      </div>
      <Footer />
    </>
  )
}
