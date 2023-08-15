import Link from 'next/link'

export default function THUBUseCaseSection() {
  return (
    <div className="prose prose-slate m-auto flex flex-col py-10 text-left text-gray-700 ">
      <h3 className="pr-2 text-xl">Use Cases:</h3>
      <div className="prose mt-4 flex flex-col items-center space-x-4">
        <Link
          href="/use-cases/tokenomics-design"
          className="text-first hover:bg-third rounded px-4 py-1 hover:underline"
        >
          Tokenomics Design
        </Link>

        <Link
          href="/use-cases/token-allocation"
          className="text-first hover:bg-third rounded px-4 py-1 hover:underline"
        >
          Token Allocation
        </Link>

        <Link
          href="/use-cases/initial-token-allocation"
          className="text-first hover:bg-third rounded px-4 py-1 hover:underline"
        >
          Initial Token Allocation for Public Blockchain
        </Link>

        <Link
          href="/use-cases/token-emissions"
          className="text-first hover:bg-third rounded px-4 py-1 hover:underline"
        >
          Token Emissions
        </Link>

        <Link
          href="/use-cases/mechanism-design"
          className="text-first hover:bg-third rounded px-4 py-1 hover:underline"
        >
          Mechanism Design
        </Link>

        <Link
          href="/use-cases/mechanism-design-software"
          className="text-first hover:bg-third rounded px-4 py-1 hover:underline"
        >
          Mechanism Design Software
        </Link>

        <Link
          href="/use-cases/incentive-design"
          className="text-first hover:bg-third rounded px-4 py-1 hover:underline"
        >
          Incentive Design
        </Link>
      </div>
    </div>
  )
}
