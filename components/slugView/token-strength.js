import BreakdownBox from './breakdown-box'
import { RatingDialog } from './ratingDialog'

export default function TokenStrength({ post, contributor }) {
  return (
    <>
      <div className="mb-4 mt-10 flex justify-between md:mt-20">
        <h1 className="text-xl font-bold text-black md:text-2xl lg:text-3xl">
          Token Strength.
        </h1>
        {contributor && <RatingDialog post={post} />}
      </div>

      <div className="grid rounded-lg border-2">
        <BreakdownBox
          value={post?.tokenUtility}
          strength={post?._avg?.tokenUtilityStrength}
          title="Token Utility:"
        />
        <BreakdownBox
          value={post?.demandDrivers}
          strength={post?._avg?.demandDriversStrength}
          title="Demand Driver:"
        />
        <BreakdownBox
          value={post?.valueCreation}
          strength={post?._avg?.valueCreationStrength}
          title="Value Creation:"
        />
        <BreakdownBox
          value={post?.valueCapture}
          strength={post?._avg?.valueCaptureStrength}
          title="Value Capture:"
        />
        <BreakdownBox
          value={post?.businessModel}
          strength={post?._avg?.businessModelStrength}
          title="Business Model:"
        />
      </div>
    </>
  )
}
