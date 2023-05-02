import React, { useMemo, useState } from 'react'
import { Pie } from '@visx/shape'
import { Group } from '@visx/group'
import { scaleOrdinal } from '@visx/scale'
import { LegendOrdinal } from '@visx/legend'
import { Tooltip, defaultStyles } from '@visx/tooltip'
const frequency = (d) => d.percentageAllocation
const defaultMargin = { top: 20, right: 20, bottom: 20, left: 20 }

export type PieProps = {
  width: number
  height: number
  margin?: typeof defaultMargin
  animate?: boolean
  fields: object[]
  hideLegend: boolean
}

export default function AllocationChart({
  width,
  height,
  margin = defaultMargin,
  fields,
  hideLegend = false,
}: PieProps) {
  const innerWidth = width - margin.left - margin.right
  const innerHeight = height - margin.top - margin.bottom
  const radius = Math.min(innerWidth, innerHeight) / 2
  const centerY = innerHeight / 2
  const centerX = innerWidth / 2
  const top = centerY + margin.top
  const left = centerX + margin.left
  const pieSortValues = (a, b) => b - a
  const [activeLabel, setActiveLabel] = useState(null)
  const [tooltipData, setTooltipData] = useState(null)
  const [tooltipLeft, setTooltipLeft] = useState(null)
  const [tooltipTop, setTooltipTop] = useState(null)
  const handleMouseOver = (event, fields) => {
    setActiveLabel(fields.category)
    setTooltipData(fields)
  }

  const tooltipStyles = {
    ...defaultStyles,
    backgroundColor: 'white',
    color: 'black',
    padding: '4px',
    borderRadius: '4px',
    fontSize: '12px',
  }

  const showTooltip = ({ event, data }) => {
    setTooltipData(data)
    setTooltipLeft(event.clientX)
    setTooltipTop(event.clientY)
  }

  const hideTooltip = () => {
    setTooltipData(null)
  }

  const handleMouseLeave = () => {
    setTooltipData(null)
  }

  const colors = fields?.map((fc) => {
    return fc.color
  })

  const keys = fields?.map((f) => {
    return f.name + ` (${f.percentageAllocation}%)` || f.category + `(${f.percentageAllocation})`
  })

  const pieColorScale = useMemo(
    () =>
      scaleOrdinal({
        domain: keys,
        range: colors,
      }),
    [keys, colors]
  )

  return (
    <>
      {hideLegend ? (
        <></>
      ) : (
        <LegendOrdinal
          className="flex flex-wrap text-xs px-10 gap-2"
          scale={pieColorScale}
          direction="row"
          labelMargin="0 10px 0 0"
          shapeMargin="2px 3px"
        />
      )}

      <svg width={width} height={height}>
        <Group top={top} left={left}>
          <Pie
            data={fields}
            pieValue={frequency}
            pieSortValues={pieSortValues}
            outerRadius={radius}
            cornerRadius={5}
            padAngle={0.02}
            colorScale={pieColorScale}
            onMouseOver={handleMouseOver}
            onMouseLeave={handleMouseLeave}
          >
            {(pie) => {
              return (
                <g>
                  {pie.arcs.map((arc, index) => (
                    <g key={`arc-${index}`}>
                      <path
                        d={pie.path(arc)}
                        fill={pieColorScale(arc.data.category)}
                        onMouseOver={(event) => {
                          showTooltip({ event, data: arc.data })
                        }}
                        onMouseLeave={() => {
                          hideTooltip()
                        }}
                      />
                    </g>
                  ))}
                </g>
              )
            }}
          </Pie>
        </Group>
      </svg>
      {tooltipData && (
        <Tooltip top={tooltipTop} left={tooltipLeft} style={tooltipStyles}>
          <p>{tooltipData.name || tooltipData.category}</p>
          <p>{`${tooltipData.percentageAllocation}%`}</p>
        </Tooltip>
      )}
    </>
  )
}
