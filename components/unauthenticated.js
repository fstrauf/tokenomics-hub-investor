import { SignInButton } from '@clerk/nextjs'

export default function UnAuthenticated() {
  return (
    <>
        <div className="m-auto flex flex-col justify-center items-center mt-10">
          <h1 className='text-xl mb-10'>Please sign-in to see this page</h1>
          <SignInButton className=" w-32 rounded-md bg-dao-red px-4 py-2 text-base font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 disabled:opacity-40"></SignInButton>
        </div>
    </>
  )
}
