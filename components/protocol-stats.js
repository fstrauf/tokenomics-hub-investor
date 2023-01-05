import useSWR from 'swr'
import ParentSize from '@visx/responsive/lib/components/ParentSize'
import dynamic from 'next/dynamic'

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

  const PriceChart = dynamic(() => import('./charts/PriceChart'), {
    ssr: false,
  })

  if (statsData.error || chartData.error) return <div>Failed to load</div>
  if (!statsData.data || !chartData.data) return <div>Loading...</div>

  const priceData = chartData?.data?.prices?.map((value) => ({
    date: value[0],
    close: Number(value[1].toFixed(2)),
  }))

  return (
    <>
      <h1 className="ftext-xl section-head mt-10 mb-4 font-bold text-black md:mt-20 md:text-2xl lg:text-3xl">
        Stats.
      </h1>
      <div className="rounded-lg border-2">
        <div className="grid md:w-1/2 auto-cols-max grid-cols-2 place-content-start justify-items-between mr-2">
          <h1 className="ml-2 font-bold text-sm">Market Cap (in USD)</h1>
          <p className='text-right font-light'>
            {new Intl.NumberFormat('en',{ style: 'currency', currency: 'USD',minimumFractionDigits: 0 }).format(
              statsData?.data?.market_data?.market_cap?.usd
            )}
          </p>
          <h1 className="ml-2 font-bold text-sm">Fully Diluted Valuation</h1>
          <p className='text-right font-light'>
            {new Intl.NumberFormat('en',{ style: 'currency', currency: 'USD',minimumFractionDigits: 0 }).format(
              statsData?.data?.market_data?.fully_diluted_valuation?.usd
            )}
          </p>
          <h1 className="ml-2 font-bold text-sm">Max Supply</h1>
          <p className='text-right font-light'>
            {new Intl.NumberFormat('en',{minimumFractionDigits: 0}).format(
              statsData?.data?.market_data?.max_supply
            )}
          </p>
          <h1 className="ml-2 font-bold text-sm">Total Supply</h1>
          <p className='text-right font-light'>
            {new Intl.NumberFormat('en',{minimumFractionDigits: 0}).format(
              statsData?.data?.market_data?.total_supply
            )}
          </p>
          <h1 className="ml-2 font-bold text-sm">Circulating Supply</h1>
          <p className='text-right font-light'>
            {new Intl.NumberFormat('en',{minimumFractionDigits: 0}).format(
              statsData?.data?.market_data?.circulating_supply
            )}
          </p>
        </div>
        <div className="m-2 mt-4">
          <div className="h-96 w-full">
            <ParentSize>
              {({ width, height }) => (
                <PriceChart width={width} height={height} data={priceData} />
              )}
            </ParentSize>
          </div>
        </div>
      </div>
    </>
  )
}
