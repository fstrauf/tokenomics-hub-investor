// pages/tokenomics-calculator.js

import Link from 'next/link';
import Header2 from '../../components/header2';
import { headerStatus } from '../../lib/helper';

export default function TokenomicsCalculator() {

  return (
    <div className="bg-white min-h-screen">
      <Header2 mode={headerStatus.design} />

      <main className="p-6">
        <h1 className="text-3xl font-bold text-dao-red mb-4">
          Tokenomics Calculator: Quantifying Blockchain Economics
        </h1>

        <p className="text-lg text-dark-tdao mb-4">
          The <span className="font-bold text-dao-green">tokenomics calculator</span> is an essential tool for blockchain projects, investors, and enthusiasts alike. It provides a quantitative approach to understanding the economic dynamics of a token ecosystem.
        </p>

        <p className="text-lg text-dark-tdao mb-4">
          From projecting token valuations to estimating emission rates, a tokenomics calculator can offer invaluable insights into the potential growth and sustainability of a blockchain project.
        </p>

        <h2 className="text-2xl font-semibold text-dao-red mb-4">
          Benefits of a Tokenomics Calculator
        </h2>

        <ul className="list-disc pl-5 mb-4">
          <li className="text-lg text-dark-tdao mb-2">
            <span className="font-bold">Informed Decision Making:</span> Gain a clearer understanding of token distribution, allocation, and potential returns.
          </li>
          <li className="text-lg text-dark-tdao mb-2">
            <span className="font-bold">Strategic Planning:</span> Use data-driven insights to shape the economic model of a blockchain project.
          </li>
          <li className="text-lg text-dark-tdao mb-2">
            <span className="font-bold">Risk Assessment:</span> Evaluate potential risks and rewards based on various tokenomics scenarios.
          </li>
        </ul>

        <p className="text-lg text-dark-tdao mb-4">
          A tokenomics calculator is more than just a tool; it's a compass that guides projects through the complex landscape of blockchain economics, ensuring that decisions are grounded in data and analysis.
        </p>

        <Link href="/tokenomics-calculator" className="text-dao-green font-bold hover:underline">
            Discover our advanced tokenomics calculator.
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
