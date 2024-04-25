import { useRouter } from 'next/router'

export default function HeaderGenericSection({ pathName, title }) {
  const router = useRouter()
  return (
    <a
      href={pathName}
      className={`${
        router.pathname === pathName
          ? 'bg-gradient-to-tr from-dao-red via-dao-red to-dao-green'
          : 'bg-white'
      } rounded-md bg-clip-text py-2 px-4 text-transparent hover:bg-opacity-80 font-sora ${
        router.pathname === pathName
          ? 'hover:from-dao-red hover:via-dao-red hover:to-dao-green'
          : 'hover:bg-dao-red'
      }`}
      target="_blank" // Opens the link in a new tab
      rel="noopener noreferrer" // Security measure for opening links in new tabs
    >
      {title}
    </a>
  )
}