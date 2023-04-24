import GenericCarousel from '../generic/GenericCarousel'
import Image from 'next/image'

export default function DesignIntro() {
  return (
    <GenericCarousel>
      <div className="flex h-140 flex-col items-center justify-center p-3">
      <div className="flex gap-5">
            <div className="relative">
              <Image
                width={502 / 2}
                height={802 / 2}
                src="/Greatnewtoken.png"
                className="rounded-md shadow-xl"
                alt='Token Editor Flow'
              />
            </div>
            <div className="relative object-scale-down">
              <Image
                width={1248 / 3}
                height={1266 / 3}
                src="/ValueCapture.png"
                className="rounded-md shadow-xl"
                alt='Value Capture Explanation Section'
              />
            </div>
          </div>
        <h1 className=" mt-10 text-3xl font-bold leading-10 md:whitespace-nowrap">
          Design Framework
        </h1>
        <p className="text-center text-xl">
          Designing a token is more than pie charts, vesting schedules and
          spreadsheets
          <br />
          <br />
          Sustainable tokenomics design requires a thorough process that guides
          you from start to finish
        </p>
      </div>
      <div className="flex h-140 flex-col items-center justify-center p-3">
        <Image
          src="/reousrceAndExamples.png"
          width={1108}
          height={311}
          className="rounded-md shadow-xl"
          alt="Examples help to break diwn the complexity of token design"
        />
        <h1 className="mt-10 text-3xl font-bold leading-10 md:whitespace-nowrap">
          Resources & Examples
        </h1>
        <p className="text-center text-xl">
          Use the Resources Section to guide you through the thinking and Task
          at hand per step
          <br />
          <br />
          Use the Examples Section to see how similar projects have solved
          similar problems
        </p>
      </div>
      <div className="flex h-140 flex-col items-center justify-center p-3">
        <Image
          src="/designToReview.png"
          width={381}
          height={245}
          className="rounded-md shadow-xl"
          alt="Examples help to break diwn the complexity of token design"
        />
        <h1 className="mt-10 text-3xl font-bold leading-10 md:whitespace-nowrap">
          Get Expert Help
        </h1>
        <p className="text-center text-xl">
          Want expert help with designing your tokenomics? Request Design
          Services
          <br />
          <br />
          Already have your design and want an expert to check it? Request
          Review
        </p>
      </div>
    </GenericCarousel>
  )
}
