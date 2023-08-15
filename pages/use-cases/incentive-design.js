// pages/incentive-design.js

import Link from 'next/link';
import Header2 from '../../components/header2';
import { headerStatus } from '../../lib/helper';

export default function IncentiveDesign() {

  return (
    <div className="bg-white min-h-screen">
      <Header2 mode={headerStatus.design} />

      <main className="p-6">
        <h1 className="text-3xl font-bold text-dao-red mb-4">
          Crafting Effective Incentive Design
        </h1>

        <p className="text-lg text-dark-tdao mb-4">
          In the world of blockchain and decentralized systems, <span className="font-bold text-dao-green">incentive design</span> is the backbone that drives participation, collaboration, and growth. It's the art and science of aligning individual motivations with collective goals.
        </p>

        <p className="text-lg text-dark-tdao mb-4">
          Proper incentive design ensures that all participants, from miners to validators to end-users, are motivated to act in ways that benefit the entire ecosystem.
        </p>

        <h2 className="text-2xl font-semibold text-dao-red mb-4">
          Key Elements of Effective Incentive Design
        </h2>

        <ul className="list-disc pl-5 mb-4">
          <li className="text-lg text-dark-tdao mb-2">
            <span className="font-bold">Alignment of Interests:</span> Ensure that individual rewards are tied to actions that benefit the collective.
          </li>
          <li className="text-lg text-dark-tdao mb-2">
            <span className="font-bold">Transparency:</span> Participants should clearly understand the incentives and how they are determined.
          </li>
          <li className="text-lg text-dark-tdao mb-2">
            <span className="font-bold">Adaptability:</span> As the ecosystem evolves, incentives should be flexible enough to adapt and remain relevant.
          </li>
        </ul>

        <p className="text-lg text-dark-tdao mb-4">
          Effective incentive design is a dynamic process that requires continuous iteration and feedback. It's about creating a harmonious system where everyone feels valued and motivated to contribute.
        </p>

        <Link href="/incentive-design" className="text-dao-green font-bold hover:underline">
            Dive deeper into our strategies for incentive design.
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
