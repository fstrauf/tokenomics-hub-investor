export default function BreakdownBox({ value, strength, title }) {

  const percentageComplete = strength / 10
  const strokeDashOffsetValue = 100 - (percentageComplete * 100)

  return (
    <div className="m-2">
      <div class="flex">
        {/* <div className="grid grid-cols-1"> */}
        <div className="flex flex-col">
        <h1 className="ml-2 mr-2 font-bold text-center">{title}</h1>
          {/* <div class="flex"> */}
          <div class="justify-center m-2 inline-flex items-center overflow-hidden rounded-full bottom-5 left-5">
            <svg class="w-10 h-10" viewBox="-3 -3 38 38">
              {/* Background */}
              <circle
                class="text-gray-300"
                stroke-width="5"
                stroke="currentColor"
                fill="transparent"
                r="15.9155"
                cx="16"
                cy="16"
              />
              {/* Percentage value */}
              <circle
                class="text-blue-600"
                stroke-width="5"
                stroke-dasharray="100 100"
                stroke-dashoffset={strokeDashOffsetValue}
                stroke-linecap="round"
                stroke="currentColor"
                fill="transparent"
                transition="stroke-dashoffset 1s ease-in-out"
                r="15.9155"
                cx="16"
                cy="16"
              />
            </svg>
            <span class="absolute text-xl text-blue-700">{strength}</span>
          </div>
          
        </div>
        <div className="w-full self-center">{value}</div>
      </div>
    </div>
  )
}


// export default function BreakdownBox({ value, strength, title }) {

//   const percentageComplete = strength / 10
//   const strokeDashOffsetValue = 100 - (percentageComplete * 100)

//   return (
//     <div className="m-2">
//       {/* <div class="grid grid-rows-2 grid-flow-col auto-cols-max">  */}
//       <div class="flex">
//         <div class="justify-center m-2 inline-flex items-center overflow-hidden rounded-full bottom-5 left-5">
//           <svg class="w-10 h-10" viewBox="-1 -1 34 34">
//             {/* Background */}
//             <circle
//               class="text-gray-300"
//               stroke-width="5"
//               stroke="currentColor"
//               fill="transparent"
//               r="15.9155"
//               cx="16"
//               cy="16"
//             />
//             {/* Percentage value */}
//             <circle
//               class="text-blue-600"
//               stroke-width="5"
//               stroke-dasharray="100 100"
//               stroke-dashoffset={strokeDashOffsetValue}
//               stroke-linecap="round"
//               stroke="currentColor"
//               fill="transparent"
//               transition="stroke-dashoffset 1s ease-in-out"
//               r="15.9155"
//               cx="16"
//               cy="16"
//             />
//           </svg>
//           <span class="absolute text-xl text-blue-700">{strength}</span>
//         </div>
//         <label className="ml-2 mr-2 font-bold self-center">{title}</label>
//         <div className="w-full self-center">{value}</div>
//       </div>
//     </div>
//   )
// }
