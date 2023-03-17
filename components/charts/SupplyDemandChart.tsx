import React, { useMemo, useCallback } from 'react'
// import { AreaStack } from '@visx/shape'
// import { LinearGradient } from '@visx/gradient'
import { scaleTime, scaleLinear, scaleOrdinal } from '@visx/scale'
// import { extent, bisector } from 'd3-array'
// import tinycolor from 'tinycolor2'
// import { localPoint } from '@visx/event'
import {
  // withTooltip,
  // Tooltip,
  // TooltipWithBounds,
  defaultStyles,
} from '@visx/tooltip'
import { extent, bisector } from 'd3-array'
// import { WithTooltipProvidedProps } from '@visx/tooltip/lib/enhancers/withTooltip'
// import { Line, Bar } from '@visx/shape'
import { timeFormat } from 'd3-time-format'
import { AxisBottom, AxisLeft } from '@visx/axis'
import { Group } from '@visx/group'
// import { LegendOrdinal } from '@visx/legend'
// import { shortBigNumber } from '../../lib/helper'
import { curveBasis } from '@visx/curve'
import { LinePath } from '@visx/shape'
import { Threshold } from '@visx/threshold'
import { GridRows, GridColumns } from '@visx/grid'
import { shortBigNumber } from '../../lib/helper'
// import cityTemperature, { CityTemperature } from '@visx/mock-data/lib/mocks/cityTemperature';

export const background = '#FFF'
// const tooltipStyles = {
//   ...defaultStyles,
//   border: '#555758',
//   color: 'black',
// }

export interface CityTemperature {
  date: string
  'Supply': string
  'Demand': string
  Austin: string
}

const cityTemperature: CityTemperature[] = [
  {
    date: '2011-10-01',
    'New York': '63.4',
    'San Francisco': '62.7',
    Austin: '72.2',
  },
  {
    date: '2011-10-02',
    'New York': '58.0',
    'San Francisco': '59.9',
    Austin: '67.7',
  },
  {
    date: '2011-10-03',
    'New York': '53.3',
    'San Francisco': '59.1',
    Austin: '69.4',
  },
  {
    date: '2011-10-04',
    'New York': '55.7',
    'San Francisco': '58.8',
    Austin: '68.0',
  },
  {
    date: '2011-10-05',
    'New York': '64.2',
    'San Francisco': '58.7',
    Austin: '72.4',
  },
  {
    date: '2011-10-06',
    'New York': '58.8',
    'San Francisco': '57.0',
    Austin: '77.0',
  },
  {
    date: '2011-10-07',
    'New York': '57.9',
    'San Francisco': '56.7',
    Austin: '82.3',
  },
  {
    date: '2011-10-08',
    'New York': '61.8',
    'San Francisco': '56.8',
    Austin: '78.9',
  },
  {
    date: '2011-10-09',
    'New York': '69.3',
    'San Francisco': '56.7',
    Austin: '68.8',
  },
]

// const date = (d: CityTemperature) => new Date(d.date).valueOf()
// const ny = (d: CityTemperature) => Number(d['New York'])
// const sf = (d: CityTemperature) => Number(d['San Francisco'])

// const timeScale = scaleTime<number>({
//   domain: [
//     Math.min(...cityTemperature.map(date)),
//     Math.max(...cityTemperature.map(date)),
//   ],
// })
// const temperatureScale = scaleLinear<number>({
//   domain: [
//     Math.min(...cityTemperature.map((d) => Math.min(ny(d), sf(d)))),
//     Math.max(...cityTemperature.map((d) => Math.max(ny(d), sf(d)))),
//   ],
//   nice: true,
// })

const formatDate = timeFormat("%b %d, '%y")
// const formatTicks = value => new Intl.NumberFormat('en', {notation: 'compact'}).format(value)

const getDate = (d) => new Date(d.date)

export type ThresholdProps = {
  width: number
  height: number
  events?: boolean
  margin?: { top: number; right: number; bottom: number; left: number }
  data: object[]
  fields: object[]
  totalSupply: number
}

// export type ThresholdProps = {
//   width: number;
//   height: number;
//   margin?: { top: number; right: number; bottom: number; left: number };
//   data: object[]
//   fields: object[]
//   totalSupply: number

// };

const defaultMargin = { top: 40, right: 30, bottom: 50, left: 40 }

export default function Theshold({
  width,
  height,
  margin = { top: 30, right: 30, bottom: 50, left: 30 },
  // showTooltip,
  // hideTooltip,
  // tooltipData,
  // tooltipTop = 0,
  // tooltipLeft = 0,
  data,
  fields,
  totalSupply,
}: ThresholdProps) {
  // }
  // export default function Theshold<ThresholdProps>(
  //   ({
  //     width,
  //     height,
  //     margin = { top: 30, right: 30, bottom: 50, left: 30 },
  //     // showTooltip,
  //     // hideTooltip,
  //     // tooltipData,
  //     // tooltipTop = 0,
  //     // tooltipLeft = 0,
  //     data,
  //     fields,
  //     totalSupply,
  //   }: ThresholdProps) => {

  if (width < 10) return null

  // bounds
  const xMax = width - margin.left - margin.right
  const yMax = height - margin.top - margin.bottom

  const innerWidth = width - margin.left - margin.right
  const innerHeight = height - margin.top - margin.bottom

  // timeScale.range([0, xMax])
  // temperatureScale.range([yMax, 0])

  const dateScale = useMemo(
    () =>
      scaleTime({
        range: [0, innerWidth],
        // range: [margin.left, innerWidth],
        domain: extent(data, getDate) as [Date, Date],
      }),
    [innerWidth, data]
  )

  const valueScale = useMemo(
    () =>
      scaleLinear({
        range: [innerHeight, 0],
        domain: [0, totalSupply],
      }),
    [innerHeight, totalSupply, margin.top]
  )

  const axisLeftTickLabelProps = {
    fontFamily: 'Arial',
    fontSize: 10,
    background: '#FFF',
    dx: '-0.25em',
    dy: '0.25em',
    textAnchor: 'end',
  }

  // // console.log("🚀 ~ file: VestingChart.tsx:58 ~ data", data)
  // const keys = fields?.map((f) => {
  //   return f.category
  // })

  // const colors = fields?.map((f) => {

  //   return f.color
  // })

  // const innerWidth = width - margin.left - margin.right
  // const innerHeight = height - margin.top - margin.bottom

  // const dateScale = useMemo(
  //   () =>
  //     scaleTime({
  //       range: [0, innerWidth],
  //       // range: [margin.left, innerWidth],
  //       domain: extent(data, getDate) as [Date, Date],
  //     }),
  //   [innerWidth, data]
  // )

  // const valueScale = useMemo(
  //   () =>
  //     scaleLinear({
  //       range: [innerHeight, 0],
  //       domain: [0, totalSupply],
  //     }),
  //   [innerHeight, totalSupply, margin.top]
  // )

  // const colorScale = useMemo(
  //   () =>
  //     scaleOrdinal({
  //       domain: keys,
  //       range: colors,
  //     }),
  //   [keys, colors]
  // )

  // const axisLeftTickLabelProps = {
  //   fontFamily: 'Arial',
  //   fontSize: 10,
  //   background: '#FFF',
  //   dx: '-0.25em',
  //   dy: '0.25em',
  //   textAnchor: 'end',
  // }

  // const bisectDate = bisector((d) => new Date(d.date)).left

  // // tooltip handler
  // const handleTooltip = useCallback(
  //   (
  //     event:
  //       | React.TouchEvent<SVGRectElement>
  //       | React.MouseEvent<SVGRectElement>
  //   ) => {
  //     const { x } = localPoint(event) || { x: 0 }
  //     const x0 = dateScale.invert(x)
  //     const index = bisectDate(data, x0, 1)
  //     const d0 = data[index - 1]
  //     const d1 = data[index]
  //     let d = d0
  //     if (d1 && getDate(d1)) {
  //       d =
  //         x0.valueOf() - getDate(d0).valueOf() >
  //         getDate(d1).valueOf() - x0.valueOf()
  //           ? d1
  //           : d0
  //     }
  //     const coords = localPoint(event.target.ownerSVGElement, event)

  //     showTooltip({
  //       tooltipData: d,
  //       tooltipLeft: coords.x,
  //       tooltipTop: coords.y,
  //     })
  //   },
  //   [showTooltip, valueScale, dateScale, data]
  // )

  return (
    <div>
      <svg width={width} height={height}>
        <rect
          x={0}
          y={0}
          width={width}
          height={height}
          fill={background}
          rx={14}
        />
        <Group left={margin.left} top={margin.top}>
          <GridRows
            scale={temperatureScale}
            width={xMax}
            height={yMax}
            stroke="#e0e0e0"
          />
          <GridColumns
            scale={timeScale}
            width={xMax}
            height={yMax}
            stroke="#e0e0e0"
          />
          <line x1={xMax} x2={xMax} y1={0} y2={yMax} stroke="#e0e0e0" />
          <AxisBottom
            top={innerHeight}
            scale={dateScale}
            numTicks={width > 520 ? 10 : 5}
          />
          {/* <AxisLeft scale={temperatureScale} /> */}
          <AxisLeft
              scale={valueScale}
              numTicks={5}
              tickFormat={shortBigNumber}                    
              tickLabelProps={() => axisLeftTickLabelProps}
              tickLength={0}
              hideAxisLine={true}
            />
          <text x="-70" y="15" transform="rotate(-90)" fontSize={10}>
            Temperature (°F)
          </text>
          <Threshold
            id={`${Math.random()}`}
            data={data}
            x={(d) => dateScale(getDate(d.data)) ?? 0}
            // y0={(d) => temperatureScale(ny(d)) ?? 0}
            // y1={(d) => temperatureScale(sf(d)) ?? 0}
            y0={(d) => valueScale(d[0])}
            y1={d => valueScale(d[1])}
            clipAboveTo={0}
            clipBelowTo={yMax}
            curve={curveBasis}
            belowAreaProps={{
              fill: 'violet',
              fillOpacity: 0.4,
            }}
            aboveAreaProps={{
              fill: 'green',
              fillOpacity: 0.4,
            }}
          />
          <LinePath
            data={data}
            curve={curveBasis}
            // x={(d) => timeScale(date(d)) ?? 0}
            x={(d) => dateScale(getDate(d.data)) ?? 0}
            y={(d) => valueScale(d[0]) ?? 0}
            // y0={(d) => valueScale(d[0])}
            stroke="#222"
            strokeWidth={1.5}
            strokeOpacity={0.8}
            strokeDasharray="1,2"
          />
          <LinePath
            data={data}
            curve={curveBasis}
            // x={(d) => timeScale(date(d)) ?? 0}
            x={(d) => dateScale(getDate(d.data)) ?? 0}
            // y={(d) => temperatureScale(ny(d)) ?? 0}
            y={(d) => valueScale(d[0]) ?? 0}
            stroke="#222"
            strokeWidth={1.5}
          />
        </Group>
      </svg>
    </div>
  )

  // return width < 10 ? null : (
  //   <div>
  //     <div className="absolute flex w-full justify-center">
  //       <LegendOrdinal
  //         scale={colorScale}
  //         direction='row'
  //         labelMargin="0 10px 0 0"
  //         className='text-xs'
  //         // style={{ 'font-size': '5px 0' }}
  //         // font-size: 10px;
  //       />
  //     </div>
  //     <svg width={width} height={height}>
  //       <Group left={margin.left} top={margin.top}>
  //         <AreaStack
  //           top={margin.top}
  //           left={margin.left}
  //           keys={keys}
  //           data={data}
  //           width={innerWidth}
  //           height={innerHeight}
  //           stroke='white'
  //           strokeWidth={1}
  //           x={(d) => dateScale(getDate(d.data)) ?? 0}
  //           y0={(d) => valueScale(d[0])}
  //           y1={d => valueScale(d[1])}
  //           color={d => colorScale(d)}
  //         />
  //         <AxisBottom
  //           top={innerHeight}
  //           scale={dateScale}
  //           numTicks={width > 520 ? 10 : 5}
  //           hideAxisLine={true}
  //           tickLength={0}
  //         />
  //         <AxisLeft
  //           scale={valueScale}
  //           numTicks={5}
  //           tickFormat={shortBigNumber}
  //           tickLabelProps={() => axisLeftTickLabelProps}
  //           tickLength={0}
  //           hideAxisLine={true}
  //         />
  //       </Group>
  //       <Bar
  //         x={margin.left}
  //         y={margin.top}
  //         width={innerWidth}
  //         height={innerHeight}
  //         fill="transparent"
  //         rx={14}
  //         onTouchStart={handleTooltip}
  //         onTouchMove={handleTooltip}
  //         onMouseMove={handleTooltip}
  //         onMouseLeave={() => hideTooltip()}
  //       />

  //       {tooltipData && (
  //         <g>
  //           <Line
  //             from={{ x: tooltipLeft, y: margin.top }}
  //             to={{ x: tooltipLeft, y: innerHeight + margin.top }}
  //             stroke='#555758'
  //             strokeWidth={2}
  //             pointerEvents="none"
  //             strokeDasharray="5,2"
  //           />
  //         </g>
  //       )}
  //     </svg>

  //     {tooltipData && (
  //       <div>
  //         <TooltipWithBounds
  //           key={Math.random()}
  //           top={tooltipTop + 30}
  //           left={tooltipLeft + 12}
  //           style={tooltipStyles}
  //         >
  //           <div className='rounded-lg'>
  //             {fields.map((k) => (
  //               <div key={k.category} className='flex justify-end'>
  //                 <p style={{color: k.color}} className='mr-2 font-bold'>{k.category}: </p>
  //                 <p> {shortBigNumber(tooltipData[k.category])}</p>
  //               </div>
  //             ))}
  //           </div>
  //         </TooltipWithBounds>
  //         <Tooltip
  //           top={innerHeight + margin.top - 14}
  //           left={tooltipLeft}
  //           style={{
  //             ...defaultStyles,
  //             minWidth: 72,
  //             textAlign: 'center',
  //             transform: 'translateX(-50%)',
  //           }}
  //         >
  //           {formatDate(getDate(tooltipData))}
  //         </Tooltip>
  //       </div>
  //     )}

  //   </div>
  // )
}
