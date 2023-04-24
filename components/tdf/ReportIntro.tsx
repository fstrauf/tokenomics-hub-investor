import GenericCarousel from '../generic/GenericCarousel'
import Image from 'next/image'

export default function ReportIntro() {
  return (
    <GenericCarousel>
      <div className="flex flex-col items-center p-3 h-140">
        <Image
          src="/tokensListed.png"
          width={971 / 1.5}
          height={535 / 1.5}
          className="rounded-md shadow-xl"
          alt="Examples help to break diwn the complexity of token design"
        />
        <h1 className=" mt-10 text-3xl font-bold leading-10 md:whitespace-nowrap">
          Tokenomics Hub Reports
        </h1>
        <p className="text-center text-xl">
          Tokenomics Hub revolves around Reports. These reports contain the
          objective need-to-know tokenomic information in an understandable and
          condensed format
          <br />
          <br />
          They’re the quickest way to understand how a token is being used
          within the project and what this means for users, investors and
          builders
        </p>
      </div>
      <div className="flex flex-col items-center p-3 h-140">
        <Image
          src="/reportToReview.png"
          width={381}
          height={245}
          className="rounded-md shadow-xl"
          alt="Examples help to break diwn the complexity of token design"
        />
        <h1 className="mt-10 text-3xl font-bold leading-10 md:whitespace-nowrap">
          Send to Review
        </h1>
        <p className="text-center text-xl">
          Once you’ve filled out a Report and wish for it to be published, you
          send it to review and our team will vet that the information is
          accurate.
          <br />
          <br />
          If there are any changes that need to be made to your Report you will
          receive an update via email
        </p>
      </div>
      <div className="flex flex-col items-center p-3 h-140">

          <Image
            src="/tokensListedZoom.png"
            width={965 / 1.5}
            height={530 / 1.5}
            className="rounded-md shadow-xl"
            alt="Examples help to break diwn the complexity of token design"
          />
          <h1 className="mt-10 text-3xl font-bold leading-10 md:whitespace-nowrap">
            Publishing
          </h1>
          <p className="text-center text-xl">
            Once your Report gets approved by the Review process it will be
            published on Tokenomics Hub 🥳
          </p>
      </div>
    </GenericCarousel>
  )
}
