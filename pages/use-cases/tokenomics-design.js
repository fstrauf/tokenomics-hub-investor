import Link from 'next/link';
import Header2 from '../../components/header2';
import { headerStatus } from '../../lib/helper';

export default function TokenomicsDesign() {

  return (
    <div className="bg-white min-h-screen">
      <Header2 mode={headerStatus.design} />

      <main className="p-6">
        <h1 className="text-3xl font-bold text-dao-red mb-4">
          Understanding Tokenomics Design
        </h1>

        <p className="text-lg text-dark-tdao mb-4">
          Tokenomics, a fusion of 'token' and 'economics', refers to the design, distribution, and management of digital tokens. In the world of cryptocurrencies and blockchain, <span className="font-bold text-dao-green">tokenomics design</span> plays a pivotal role in determining the success and sustainability of a project.
        </p>

        <p className="text-lg text-dark-tdao mb-4">
          A well-thought-out tokenomics design ensures that tokens have a purpose, are fairly distributed, and remain valuable and desirable over time. It's not just about creating a token; it's about creating a token that has a clear utility, demand, and a balanced supply.
        </p>

        <h2 className="text-2xl font-semibold text-dao-red mb-4">
          Key Components of Tokenomics Design
        </h2>

        <ul className="list-disc pl-5 mb-4">
          <li className="text-lg text-dark-tdao mb-2">
            <span className="font-bold">Utility:</span> What is the primary use of the token? Does it grant access, represent ownership, or is it a medium of exchange?
          </li>
          <li className="text-lg text-dark-tdao mb-2">
            <span className="font-bold">Distribution:</span> How are the tokens allocated? Consider factors like initial coin offerings (ICOs), rewards, and team allocation.
          </li>
          <li className="text-lg text-dark-tdao mb-2">
            <span className="font-bold">Supply:</span> Is there a cap on the total number of tokens? If so, what is it? Consider the implications of inflation and deflation.
          </li>
        </ul>

        <p className="text-lg text-dark-tdao mb-4">
          Crafting a successful tokenomics design requires a deep understanding of economics, game theory, and market dynamics. It's a multidisciplinary effort that can make or break a project.
        </p>

        <Link href="/tokenomics-design" className="text-dao-green font-bold hover:underline">
            Learn more about our approach to tokenomics design.
        </Link>

        <div className="mt-6">
          <Link href="/tokenomics-design" className="bg-dao-red text-white px-6 py-2 rounded-full hover:bg-opacity-90">
              Back to Landing Page
          </Link>
        </div>
      </main>
    </div>
  );
}
