// pages/mechanism-design.js

import Link from 'next/link';
import Header2 from '../../components/header2';
import { headerStatus } from '../../lib/helper';

export default function MechanismDesign() {

  return (
    <div className="bg-white min-h-screen">
      <Header2 mode={headerStatus.design} />

      <main className="p-6">
        <h1 className="text-3xl font-bold text-dao-red mb-4">
          Mechanism Design: Crafting Incentive Systems
        </h1>

        <p className="text-lg text-dark-tdao mb-4">
          At the intersection of economics and game theory lies <span className="font-bold text-dao-green">mechanism design</span>. Unlike traditional game theory, where the game's rules are given and players strategize within those rules, mechanism design is about creating the rules themselves to achieve a desired outcome.
        </p>

        <p className="text-lg text-dark-tdao mb-4">
          In the context of blockchain and cryptocurrencies, mechanism design is pivotal. It's about crafting protocols and incentives that ensure network participants act in ways that benefit the entire ecosystem.
        </p>

        <h2 className="text-2xl font-semibold text-dao-red mb-4">
          Principles of Effective Mechanism Design
        </h2>

        <ul className="list-disc pl-5 mb-4">
          <li className="text-lg text-dark-tdao mb-2">
            <span className="font-bold">Incentive Compatibility:</span> Design mechanisms where it's in every participant's best interest to act truthfully.
          </li>
          <li className="text-lg text-dark-tdao mb-2">
            <span className="font-bold">Budget Balance:</span> Ensure that the total payments made by participants match the total transfers, avoiding deficits.
          </li>
          <li className="text-lg text-dark-tdao mb-2">
            <span className="font-bold">Individual Rationality:</span> Participants should be better off participating in the mechanism than not participating at all.
          </li>
        </ul>

        <p className="text-lg text-dark-tdao mb-4">
          Mechanism design is both an art and a science. It requires a deep understanding of human behavior, economics, and the specific goals of a project to create systems that drive desired actions and outcomes.
        </p>

        <Link href="/mechanism-design" className="text-dao-green font-bold hover:underline">
            Dive deeper into our approach to mechanism design.
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
