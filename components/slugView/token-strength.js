import BreakdownBox from './breakdown-box'
import { RatingDialog } from './ratingDialog'

export default function TokenStrength({ post, contributor }) {
  console.log("🚀 ~ file: token-strength.js:5 ~ TokenStrength ~ post", post)
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
          strength={Number(post?._avg?.tokenUtilityStrength.toFixed(1))}
          title="Token Utility:"
        />
        <BreakdownBox
          value={post?.demandDrivers}
          strength={Number(post?._avg?.demandDriversStrength.toFixed(1))}
          title="Demand Driver:"
        />
        <BreakdownBox
          value={post?.valueCreation}
          strength={Number(post?._avg?.valueCreationStrength.toFixed(1))}
          title="Value Creation:"
        />
        <BreakdownBox
          value={post?.valueCapture}
          strength={Number(post?._avg?.valueCaptureStrength.toFixed(1))}
          title="Value Capture:"
        />
        <BreakdownBox
          value={post?.businessModel}
          strength={Number(post?._avg?.businessModelStrength.toFixed(1))}
          title="Business Model:"
        />
      </div>
    </>
  )
}
