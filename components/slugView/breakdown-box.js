import { CircularProgressbar } from 'react-circular-progressbar';

export default function BreakdownBox({ value, strength, title }) {
// console.log("🚀 ~ file: breakdown-box.js:4 ~ BreakdownBox ~ strength", strength)

  const percentageComplete = strength || 0

  return (
    <div className="m-2">
      <div className="flex flex-row">
        <div className='w-10 h-10 m-auto'>
          <CircularProgressbar value={percentageComplete} text={`${percentageComplete}`} />
        </div>
        <div className="m-auto w-40">
          <h1 className="ml-2 mr-2 font-bold">{title}</h1>
        </div>
        {/* <div className="w-full self-center">{value}</div> */}
        <pre id="message" className="whitespace-pre-line block p-2.5 rounded-lg w-full font-sans bg-slate-50 text-sm text-gray-900">
          {value}
        </pre>
      </div>
    </div>
  )
}