import GenericCarousel from '../generic/GenericCarousel'
import Image from 'next/image'

export default function DemandIntro() {
  return (
    <GenericCarousel>
      <div className="flex h-140 flex-col items-center justify-center p-3">
        <div className="flex gap-5">
          <div className="relative">
            <Image
              width={1758 / 2}
              height={870 / 2}
              src="/demand_builder_mechanism_utility.png"
              className="rounded-md shadow-xl"
              alt="Demand Builder Mechanism Utility"
              priority={true}
            />
          </div>
          {/* <div className="relative object-scale-down">
            <Image
              width={1248 / 3}
              height={1266 / 3}
              src="/demand_calculation_template.png"
              className="rounded-md shadow-xl"
              alt="Demand Calculation Template"
              priority={true}
            />
          </div> */}
        </div>
        <h1 className=" mt-10 text-3xl font-bold leading-10 md:whitespace-nowrap">
          Who will buy your token?
        </h1>
        <p className="text-center text-xl">
          Demand can come from Utility or Mechanisms.
          <br />
          <br />
          Use our templates or think about how your project creates demand for
          its token.
        </p>
      </div>
      <div className="flex h-140 flex-col items-center justify-center p-3">
        <Image
          src="/demand_calculation_template.png"
          className="rounded-md shadow-xl"
          alt="Demand Calculation Template"
          width={2488/3}
          height={1326 /3}
        />
        <h1 className="mt-10 text-3xl font-bold leading-10 md:whitespace-nowrap">
          Quantify your demand
        </h1>
        <p className="text-center text-xl">
          We don't claim to have the perfect answer, but a good guess is better
          than nothing.
          <br />
          <br />
          Use our range of calculation templates to estimate how much demand
          could exist for your token.
        </p>
      </div>
      <div className="flex h-140 flex-col items-center justify-center p-3">
        <Image
          src="/supply_vs_demand.png"
          width={2508/2}
          height={732/2}
          className="rounded-md shadow-xl"
          alt="Supply versus Demand Overview"
        />
        <h1 className="mt-10 text-3xl font-bold leading-10 md:whitespace-nowrap">
          Bringing it all together
        </h1>
        <p className="text-center text-xl">
          Quantifying demand will allow you to better plan your issuance.
          <br />
          <br />
          Compare your supply and demand to achieve a stable token price.
        </p>
      </div>
    </GenericCarousel>
  )
}
