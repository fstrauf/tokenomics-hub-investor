// pages/initial-token-allocation.js

import Link from 'next/link';
import Header2 from '../../components/header2';
import { headerStatus } from '../../lib/helper';

export default function InitialTokenAllocation() {

  return (
    <div className="bg-white min-h-screen">
      <Header2 mode={headerStatus.design} />

      <main className="p-6">
        <h1 className="text-3xl font-bold text-dao-red mb-4">
          Initial Token Allocation for Public Blockchains
        </h1>

        <p className="text-lg text-dark-tdao mb-4">
          The <span className="font-bold text-dao-green">initial token allocation</span> for public blockchains is a pivotal moment that can shape the trajectory of the entire project. It sets the stage for how tokens are distributed at the outset, influencing everything from network security to community engagement.
        </p>

        <p className="text-lg text-dark-tdao mb-4">
          This initial distribution often determines the decentralization level, fairness, and inclusivity of the blockchain. It's a delicate balance to strike, ensuring that all stakeholders, from developers to early adopters, are adequately incentivized.
        </p>

        <h2 className="text-2xl font-semibold text-dao-red mb-4">
          Factors to Consider in Initial Token Allocation
        </h2>

        <ul className="list-disc pl-5 mb-4">
          <li className="text-lg text-dark-tdao mb-2">
            <span className="font-bold">Decentralization:</span> Ensuring a broad distribution to prevent centralization and maintain the ethos of a public blockchain.
          </li>
          <li className="text-lg text-dark-tdao mb-2">
            <span className="font-bold">Incentives:</span> Allocating tokens in a way that motivates network participation, development, and growth.
          </li>
          <li className="text-lg text-dark-tdao mb-2">
            <span className="font-bold">Vesting Periods:</span> Implementing time-bound restrictions for certain allocations, especially for the team and advisors, to align long-term interests.
          </li>
        </ul>

        <p className="text-lg text-dark-tdao mb-4">
          Crafting an effective initial token allocation strategy for public blockchains requires foresight, a deep understanding of the project's vision, and a commitment to the principles of decentralization and fairness.
        </p>

        <Link href="/initial-token-allocation" className="text-dao-green font-bold hover:underline">
            Explore our methodologies for initial token allocation.
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
