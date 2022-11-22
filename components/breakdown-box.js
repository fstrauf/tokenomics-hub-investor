import { CircularProgressbar } from 'react-circular-progressbar';

export default function BreakdownBox({ value, strength, title }) {

  const percentageComplete = strength

  return (
    <div className="m-2">
      <div class="flex flex-row">
        <div className='w-10 h-10 m-auto'>
          <CircularProgressbar value={percentageComplete} text={`${percentageComplete}`} />
        </div>
        <div className="m-auto w-40">
          <h1 className="ml-2 mr-2 font-bold">{title}</h1>
        </div>
        <div className="w-full self-center">{value}</div>
      </div>
    </div>
  )
}