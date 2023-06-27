import { SignInButton } from '@clerk/nextjs'
import Layout from './layout'

export default function UnAuthenticated() {
  return (
    <>
      <Layout>
        {/* <Header /> */}
        <div className="m-auto flex flex-col justify-center items-center mt-20">
          <h1>Please sign-in to see this page</h1>
          <SignInButton className=" w-20 rounded-md bg-dao-red px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 disabled:opacity-40"></SignInButton>
        </div>
      </Layout>
    </>
  )
}
