import React from "react";
import { Pie } from "@visx/shape";
import { Group } from "@visx/group";
// import { scaleOrdinal } from "@visx/scale";
// import { letterFrequency } from "@visx/mock-data";

// const letters = letterFrequency.slice(0, 4);
const frequency = (d) => d.allocationP;
const defaultMargin = { top: 20, right: 20, bottom: 20, left: 20 };

export type PieProps = {
  width: number;
  height: number;
  margin?: typeof defaultMargin;
  animate?: boolean;
  fields: object[]
};


export default function AllocationChart({
  width,
  height,
  margin = defaultMargin,
//   data,
  fields,
//   animate = true,
}: PieProps) {

const innerWidth = width - margin.left - margin.right;
const innerHeight = height - margin.top - margin.bottom;
const radius = Math.min(innerWidth, innerHeight) / 2;
const centerY = innerHeight / 2;
const centerX = innerWidth / 2;
const top = centerY + margin.top;
const left = centerX + margin.left;
const pieSortValues = (a, b) => b - a;

return (
  <svg width={width} height={height}>
    <Group top={top} left={left}>
      <Pie
        data={fields}
        pieValue={frequency}
        pieSortValues={pieSortValues}
        outerRadius={radius}
        cornerRadius={5}
        padAngle={0.020}
      >
        {(pie) => {
          return pie.arcs.map((arc, index) => {
            const { letter } = arc.data;
            const [centroidX, centroidY] = pie.path.centroid(arc);
            const hasSpaceForLabel = arc.endAngle - arc.startAngle >= 0.1;
            const arcPath = pie.path(arc);
            return (
              <g key={`arc-${letter}-${index}`}>
                <path d={arcPath} fill={arc.data.color} opacity={0.9} />
                {hasSpaceForLabel && (
                  <text
                    x={centroidX}
                    y={centroidY}
                    dy=".33em"
                    // fill="#ffffff"
                    fontSize={14}
                    textAnchor="middle"
                    pointerEvents="none"
                  >
                    {arc.data.category} ({arc.data.allocationP}%)
                  </text>
                  
                )}
              </g>
            );
          });
        }}
      </Pie>
    </Group>
  </svg>
);
}