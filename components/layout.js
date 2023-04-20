import Footer from '../components/footer'
import Meta from '../components/meta'
import Header from './header2'

export default function Layout({ children, mode }) {
  return (
    <>
      <Meta />

      <Header mode={mode} />

      <div className="m-auto min-h-screen max-w-md pl-2 pr-2 sm:max-w-2xl lg:max-w-screen-2xl">
        <main>{children}</main>
      </div>
      <Footer />
    </>
  )
}
