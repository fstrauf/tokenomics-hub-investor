export default function BreakdownBox({ value, title }) {  
    return (
      <div className="m-2">
        <div className="flex flex-row">
          <div className="m-auto w-40">
            <h1 className="ml-2 mr-2 font-bold">{title}</h1>
          </div>
          <pre id="message" className="whitespace-pre-line block p-2.5 rounded-lg w-full font-sans bg-slate-50 text-sm text-gray-900">
            {value}
          </pre>
        </div>
      </div>
    )
  }