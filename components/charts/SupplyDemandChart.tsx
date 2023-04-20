import React, { useMemo, useCallback } from 'react'
import { scaleTime, scaleLinear, scaleOrdinal } from '@visx/scale'
import { extent, bisector } from 'd3-array'
import { localPoint } from '@visx/event'
import {
  withTooltip,
  Tooltip,
  TooltipWithBounds,
  defaultStyles,
} from '@visx/tooltip'
import { WithTooltipProvidedProps } from '@visx/tooltip/lib/enhancers/withTooltip'
import { Line, Bar } from '@visx/shape'
import { timeFormat } from 'd3-time-format'
import { AxisBottom, AxisLeft } from '@visx/axis'
import { Group } from '@visx/group'
import { LegendOrdinal } from '@visx/legend'
import { shortBigNumber } from '../../lib/helper'
import { Threshold } from '@visx/threshold'
import { curveBasis } from '@visx/curve'
import { LinePath } from '@visx/shape'

export const background = '#FF6666'
const tooltipStyles = {
  ...defaultStyles,
  border: '#555758',
  color: 'black',
}

const formatDate = timeFormat("%b %d, '%y")
// const formatTicks = value => new Intl.NumberFormat('en', {notation: 'compact'}).format(value)

const getDate = (d) => new Date(d.date)

export type StackedAreasProps = {
  width: number
  height: number
  events?: boolean
  margin?: { top: number; right: number; bottom: number; left: number }
  data: object[]
  fields: object[]
  totalSupply: number
}

const supply = (d) => Number(d['demand'])
const demand = (d) => Number(d['supply'])
const date = (d) => new Date(d.date).valueOf()

export default withTooltip<StackedAreasProps, TooltipData>(
  ({
    width,
    height,
    margin = { top: 30, right: 30, bottom: 50, left: 30 },
    showTooltip,
    hideTooltip,
    tooltipData,
    tooltipTop = 0,
    tooltipLeft = 0,
    data,
    // fields,
    totalSupply,
  }: StackedAreasProps & WithTooltipProvidedProps<TooltipData>) => {
    
    if(data===undefined){
      return null
    }

    const timeScale = scaleTime<number>({
      domain: [Math.min(...data?.map(date)), Math.max(...data.map(date))],
    })
    const supplyDemandScale = scaleLinear<number>({
      domain: [
        Math.min(...data.map((d) => Math.min(supply(d), demand(d)))),
        Math.max(...data.map((d) => Math.max(supply(d), demand(d)))),
      ],
      nice: true,
    })
    // console.log("🚀 ~ file: SupplyDemandChart.tsx:74 ~ supplyDemandScale:", supplyDemandScale)

    const xMax = width - margin.left - margin.right
    const yMax = height - margin.top - margin.bottom

    timeScale.range([0, xMax])
    supplyDemandScale.range([yMax, 0])

    // const keys = fields?.map((f) => {
    //   return f.category
    // })

    // const colors = fields?.map((f) => {
    //   return f.color
    // })

    const innerWidth = width - margin.left - margin.right
    const innerHeight = height - margin.top - margin.bottom

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

    const ordinalColorScale = scaleOrdinal({
      domain: ['supply', 'demand'],
      range: ['#be123d', '#15803c'],
    });

    const axisLeftTickLabelProps = {
      fontFamily: 'Arial',
      fontSize: 10,
      background: '#FFF',
      dx: '-0.25em',
      dy: '0.25em',
      textAnchor: 'end',
    }

    const bisectDate = bisector((d) => new Date(d.date)).left

    // tooltip handler
    const handleTooltip = useCallback(
      (
        event:
          | React.TouchEvent<SVGRectElement>
          | React.MouseEvent<SVGRectElement>
      ) => {
        const { x } = localPoint(event) || { x: 0 }
        const x0 = dateScale.invert(x)
        const index = bisectDate(data, x0, 1)
        const d0 = data[index - 1]
        const d1 = data[index]
        let d = d0
        if (d1 && getDate(d1)) {
          d =
            x0.valueOf() - getDate(d0).valueOf() >
            getDate(d1).valueOf() - x0.valueOf()
              ? d1
              : d0
        }
        const coords = localPoint(event.target.ownerSVGElement, event)

        showTooltip({
          tooltipData: d,
          tooltipLeft: coords.x,
          tooltipTop: coords.y,
        })
      },
      [showTooltip, dateScale, data]
    )

    return width < 10 ? null : (
      <div>
        <div className="absolute flex w-full justify-center">
          <LegendOrdinal
            scale={ordinalColorScale}
            direction="row"
            labelMargin="0 10px 0 0"
            className="text-xs"
          />
        </div>
        <svg width={width} height={height}>
          <Group left={margin.left} top={margin.top}>
            <Threshold
              id={`${Math.random()}`}
              data={data}
              x={(d) => timeScale(date(d)) ?? 0}
              y0={(d) => supplyDemandScale(supply(d)) ?? 0}
              y1={(d) => supplyDemandScale(demand(d)) ?? 0}
              clipAboveTo={0}
              clipBelowTo={yMax}
              curve={curveBasis}
              belowAreaProps={{
                fill: '#be123d',
                fillOpacity: 0.2,
              }}
              aboveAreaProps={{
                fill: '#15803c',
                fillOpacity: 0.2,
              }}
            />
            <LinePath
              data={data}
              curve={curveBasis}
              x={(d) => timeScale(date(d)) ?? 0}
              y={(d) => supplyDemandScale(demand(d)) ?? 0}
              stroke="#be123d"
              strokeWidth={1.5}
              strokeOpacity={0.8}
              strokeDasharray="1,2"
            />
            <LinePath
              data={data}
              curve={curveBasis}
              x={(d) => timeScale(date(d)) ?? 0}
              y={(d) => supplyDemandScale(supply(d)) ?? 0}
              stroke="#15803c"
              strokeWidth={1.5}
            />
            <AxisBottom
              top={innerHeight}
              scale={dateScale}
              numTicks={width > 520 ? 10 : 5}
              hideAxisLine={true}
              tickLength={0}
            />
            <AxisLeft
              scale={supplyDemandScale}
              numTicks={5}
              tickFormat={shortBigNumber}
              tickLabelProps={() => axisLeftTickLabelProps}
              tickLength={0}
              hideAxisLine={true}
            />
          </Group>
          <Bar
            x={margin.left}
            y={margin.top}
            width={innerWidth}
            height={innerHeight}
            fill="transparent"
            rx={14}
            onTouchStart={handleTooltip}
            onTouchMove={handleTooltip}
            onMouseMove={handleTooltip}
            onMouseLeave={() => hideTooltip()}
          />

          {tooltipData && (
            <g>
              <Line
                from={{ x: tooltipLeft, y: margin.top }}
                to={{ x: tooltipLeft, y: innerHeight + margin.top }}
                stroke="#555758"
                strokeWidth={2}
                pointerEvents="none"
                strokeDasharray="5,2"
              />
            </g>
          )}
        </svg>

        {tooltipData && (
          <div>
            <TooltipWithBounds
              key={Math.random()}
              top={tooltipTop + 30}
              left={tooltipLeft + 12}
              style={tooltipStyles}
            >
              <div className="rounded-lg">
                <div className="flex justify-end">
                  <p className="mr-2 font-bold text-rose-700">Supply: </p>
                  <p> {shortBigNumber(tooltipData['supply'])}</p>
                </div>
                <div className="flex justify-end">
                  <p className="mr-2 font-bold text-green-700">Demand: </p>
                  <p> {shortBigNumber(tooltipData['demand'])}</p>
                </div>
              </div>
            </TooltipWithBounds>
            <Tooltip
              top={innerHeight + margin.top - 14}
              left={tooltipLeft}
              style={{
                ...defaultStyles,
                minWidth: 72,
                textAlign: 'center',
                transform: 'translateX(-50%)',
              }}
            >
              {formatDate(getDate(tooltipData))}
            </Tooltip>
          </div>
        )}
      </div>
    )
  }
)
