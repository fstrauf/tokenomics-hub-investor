// pages/token-emissions.js

import Link from 'next/link';
import Header2 from '../../components/header2';
import { headerStatus } from '../../lib/helper';

export default function TokenEmissions() {

  return (
    <div className="bg-white min-h-screen">
      <Header2 mode={headerStatus.design} />

      <main className="p-6">
        <h1 className="text-3xl font-bold text-dao-red mb-4">
          Token Emissions: Fueling the Blockchain Economy
        </h1>

        <p className="text-lg text-dark-tdao mb-4">
          <span className="font-bold text-dao-green">Token emissions</span> refer to the process by which new tokens are introduced into a blockchain ecosystem. This mechanism is crucial for incentivizing network participation, securing the blockchain, and facilitating various economic activities.
        </p>

        <p className="text-lg text-dark-tdao mb-4">
          Whether it's rewarding miners for securing the network or distributing tokens to stakers, token emissions play a pivotal role in the health and growth of a blockchain project.
        </p>

        <h2 className="text-2xl font-semibold text-dao-red mb-4">
          Key Aspects of Token Emissions
        </h2>

        <ul className="list-disc pl-5 mb-4">
          <li className="text-lg text-dark-tdao mb-2">
            <span className="font-bold">Rate:</span> The speed at which new tokens are emitted can influence inflation, token value, and network security.
          </li>
          <li className="text-lg text-dark-tdao mb-2">
            <span className="font-bold">Distribution:</span> How the emitted tokens are allocated among participants can shape network dynamics and stakeholder incentives.
          </li>
          <li className="text-lg text-dark-tdao mb-2">
            <span className="font-bold">Halving Events:</span> Some blockchains implement halving events to reduce the emission rate over time, impacting token scarcity and value.
          </li>
        </ul>

        <p className="text-lg text-dark-tdao mb-4">
          Understanding and strategically planning token emissions is vital for the longevity and success of a blockchain project. It's a delicate balance of economics, game theory, and community engagement.
        </p>

        <Link href="/token-emissions" className="text-dao-green font-bold hover:underline">
            Delve into our insights on token emissions.
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
