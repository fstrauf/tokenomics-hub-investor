import { CircularProgressbar } from 'react-circular-progressbar';

export default function BreakdownBox({ value, strength, title }) {

  const percentageComplete = strength * 10

  return (
    <div className="m-2">
      <div class="flex">
        {/* <div className="grid grid-cols-1"> */}
        <div className="flex flex-col">
          <h1 className="ml-2 mr-2 font-bold text-center">{title}</h1>
          <div className='w-10 h-10'>
            <CircularProgressbar value={percentageComplete} text={`${percentageComplete}`} />
          </div>
          {/* <div class="flex"> */}
          {/* <div class="justify-center m-2 inline-flex items-center overflow-hidden rounded-full bottom-5 left-5"> */}
        </div>
        <div className="w-full self-center">{value}</div>
      </div>
    </div>
  )
}