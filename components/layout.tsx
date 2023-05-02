import Footer from './footer'
import Meta from './meta'
import Header from './header2'

interface LayoutProps {
  children: React.ReactNode;
  mode: string;
}

export default function Layout({ children, mode }: LayoutProps) {
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
