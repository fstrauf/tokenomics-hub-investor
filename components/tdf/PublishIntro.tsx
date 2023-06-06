import GenericCarousel from '../generic/GenericCarousel'
import Image from 'next/image'

export default function PublishIntro() {
  return (
    <GenericCarousel>
      <div className="flex h-140 flex-col items-center justify-center p-3">
        <div className="flex gap-5">
          <div className="relative">
            <Image
              width={2084/3}
              height={1552/3}
              src="/thub-front.png"
              className="rounded-md shadow-xl"
              alt="List your token on the Tokenomics Hub"
              priority={true}
            />
          </div>
        </div>
        <h1 className=" mt-10 text-3xl font-bold leading-10 md:whitespace-nowrap">
          List your Tokenomics
        </h1>
        <p className="text-center text-xl">
          Publish this standardised report as a documentation of your tokenomics.
        </p>
      </div>
      <div className="flex h-140 flex-col items-center justify-center p-3">
        <Image
          src="/thub-report-detail.png"
          className="rounded-md shadow-xl"
          alt="Detail view of a published Tokenomics Hub report"
          width={3024/4}
          height={1814/4}
        />
        <h1 className="mt-10 text-3xl font-bold leading-10 md:whitespace-nowrap">
          Break down the most relevant aspects of your token
        </h1>
        <p className="text-center text-xl">
          Share an easy to read, standardised format with investors and other builders.
        </p>
      </div>
      <div className="flex h-140 flex-col items-center justify-center p-3">
        <Image
          src="/thub-publish-report.png"
          className="rounded-md shadow-xl"
          alt="List your tokenomics on Tokenomics Hub"
          width={1768/2}
          height={1020/2}
        />
        <h1 className="mt-10 text-3xl font-bold leading-10 md:whitespace-nowrap">
          Let us know you want it listed.
        </h1>
        <p className="text-center text-xl">
          We'll ensure everything is in place and get back to you once your Tokenomics have been published.
        </p>
      </div>
    </GenericCarousel>
  )
}
