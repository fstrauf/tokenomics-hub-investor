import React from 'react'
import { useState } from 'react'

export default function Tooltip({ children }) {
  const [tooltipStatus, setTooltipStatus] = useState(0)
  return (
    <div className="flex flex-col items-center md:flex-row md:justify-center">
      {/*Code Block for white tooltip starts*/}
      <div
        className="relative mt-20 md:mt-0"
        onMouseEnter={() => setTooltipStatus(1)}
        onMouseLeave={() => setTooltipStatus(0)}
      >
        <div className="mr-2 cursor-pointer">
          <svg
            aria-haspopup="true"
            xmlns="http://www.w3.org/2000/svg"
            className="icon icon-tabler icon-tabler-info-circle"
            width={25}
            height={25}
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="#A0AEC0"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" />
            <circle cx={12} cy={12} r={9} />
            <line x1={12} y1={8} x2="12.01" y2={8} />
            <polyline points="11 12 12 12 12 16 13 16" />
          </svg>
        </div>
        {tooltipStatus == 1 && (
          <div
            role="tooltip"
            className="absolute right-0 z-20 ml-8 w-64 rounded bg-white p-4 shadow-lg transition duration-150 ease-in-out"
          >
            <p className="pb-1 text-sm font-bold text-gray-800">How to rate</p>
            {children}
          </div>
        )}{' '}
      </div>
    </div>
  )
}
