import useSWR from 'swr'
import { NumericFormat } from 'react-number-format'
import ParentSize from '@visx/responsive/lib/components/ParentSize'
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Filler,
//   Legend,
// } from 'chart.js'
// import { Line } from 'react-chartjs-2'
import dynamic from 'next/dynamic'

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Filler,
//   Legend
// )

const fetcher = (...args) => fetch(...args).then((res) => res.json())

export default function ProtocolStats({ protocol }) {  
  const statsData = useSWR(
    'https://api.coingecko.com/api/v3/coins/' + protocol,
    fetcher,
    { refreshInterval: 30000 }
  )
  const chartData = useSWR(
    `https://api.coingecko.com/api/v3/coins/${protocol}/market_chart?vs_currency=usd&days=max&interval=weekly`,
    fetcher,
    { refreshInterval: 30000 }
  )

  const Example = dynamic(() => import('./charts/PriceChart'), {
    ssr: false,
  })

  if (statsData.error || chartData.error) return <div>Failed to load</div>
  if (!statsData.data || !chartData.data) return <div>Loading...</div>
  
  const priceData = chartData?.data?.prices?.map((value) => ({
    date: value[0],
    close: Number(value[1].toFixed(2)),
  }))

  

  // const options = {
  //   responsive: true,
  //   scales: {
  //     y: {
  //       ticks: {
  //         // Include a dollar sign in the ticks
  //         callback: function (value) {
  //           return '$' + value
  //         },
  //       },
  //     },
  //   },
  // }

  // const mappedChartData = {
  //   labels: priceData?.map((value) =>
  //     new Date(value.x).toISOString().slice(0, 10)
  //   ),
  //   datasets: [
  //     {
  //       fill: false,
  //       label: statsData?.data?.symbol?.toUpperCase() + ' / USD',
  //       data: priceData?.map((val) => val.y),
  //       borderColor: 'black',
  //       backgroundColor: '#FF6666',
  //     },
  //   ],
  // }

  return (
    <>
      <h1 className="ftext-xl section-head mt-10 mb-4 font-bold text-black md:mt-20 md:text-2xl lg:text-3xl">
        Stats.
      </h1>
      <div className="rounded-lg border-2">
        <div className="grid auto-cols-max grid-cols-2 place-content-start justify-items-start">
          <h1 className="ml-2 font-bold">Market Cap (in USD)</h1>
          <NumericFormat
            className="mr-2 text-right"
            value={statsData?.data?.market_data?.market_cap?.usd}
            thousandSeparator=","
            prefix={'$'}
            decimalScale={2}
            displayType="text"
          />
          <h1 className="ml-2 font-bold">Fully Diluted Valuation</h1>
          <NumericFormat
            className="mr-2 text-end"
            value={statsData?.data?.market_data?.fully_diluted_valuation?.usd}
            thousandSeparator=","
            prefix={'$'}
            decimalScale={2}
            displayType="text"
          />
          <h1 className="ml-2 font-bold">Max Supply</h1>
          <NumericFormat
            className="mr-2 text-end"
            value={statsData?.data?.market_data?.max_supply}
            thousandSeparator=","
            decimalScale={0}
            displayType="text"
          />
          <h1 className="ml-2 font-bold">Total Supply</h1>
          <NumericFormat
            className="mr-2 text-end"
            value={statsData?.data?.market_data?.total_supply}
            thousandSeparator=","
            decimalScale={-0}
            displayType="text"
          />
          <h1 className="ml-2 font-bold">Circulating Supply</h1>
          <NumericFormat
            className="mr-2 text-right"
            value={statsData?.data?.market_data?.circulating_supply}
            thousandSeparator=","
            decimalScale={0}
            displayType="text"
          />
        </div>
        <div className="m-2 mt-4">
          {/* <Line options={options} data={mappedChartData} />          */}
          <div className="w-full h-96">
            <ParentSize>
              {({ width, height }) => <Example width={width} height={height} data={priceData} />}
            </ParentSize>
          </div>
        </div>
      </div>
    </>
  )
}
