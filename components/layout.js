import Footer from '../components/footer'
import Meta from '../components/meta'
// import dynamic from 'next/dynamic'
import Header2 from './header2'

export default function Layout({ children }) {

  // const Login = dynamic(() => import('../components/login'), { loading: () => <p>Loading</p> })

  return (
    <>
      <Meta />
      {/* <Login message="You are not signed in" /> */}
      <Header2 />
      <div className="min-h-screen pl-2 pr-2 max-w-md sm:max-w-2xl lg:max-w-screen-xl m-auto">
        <main>{children}</main>
      </div>
      <Footer />
    </>
  )
}
