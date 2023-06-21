import useSWR from 'swr'
import ParentSize from '@visx/responsive/lib/components/ParentSize'
import dynamic from 'next/dynamic'

const fetcher = async (...args) => {
  const res = await fetch(...args)
  if (!res.ok) {
    const error = new Error('An error occurred while fetching the data.')
    // Attach extra info to the error object.
    error.info = await res.json()
    error.status = res.status
    throw error
  }

  return res.json()
}

export default function ProtocolStats({ protocol }) {
  if (protocol === '')
    return (
      <div>
        {' '}
        <h1 className="ftext-xl section-head mt-10 mb-4 font-bold text-black md:mt-20 md:text-2xl lg:text-3xl">
          Stats.
        </h1>
      </div>
    )

  const { data: statsData, error: statsError } = useSWR(
    `https://api.coingecko.com/api/v3/coins/${protocol}`,
    fetcher,
    {
      refreshInterval: 30000,
      onErrorRetry: (error, key, config, revalidate, { retryCount }) => {
        // Never retry on 404.
        if (error.status === 404) return

        // Never retry for a specific key.
        if (key === '/api/user') return

        // Only retry up to 10 times.
        if (retryCount >= 10) return

        // Retry after 5 seconds.
        setTimeout(() => revalidate({ retryCount }), 5000)
      },
    }
  )

  const { data: chartData, error: chartError } = useSWR(
    `https://api.coingecko.com/api/v3/coins/${protocol}/market_chart?vs_currency=usd&days=max&interval=weekly`,
    fetcher,
    {
      refreshInterval: 30000,
      onErrorRetry: (error, key, config, revalidate, { retryCount }) => {
        // Never retry on 404.
        if (error.status === 404) return

        // Never retry for a specific key.
        if (key === '/api/user') return

        // Only retry up to 10 times.
        if (retryCount >= 10) return

        // Retry after 5 seconds.
        setTimeout(() => revalidate({ retryCount }), 5000)
      },
    }
  )

  if (statsError || chartError || statsData === null || chartData === null) {
    return (
      <div>
        <h1 className="ftext-xl section-head mt-10 mb-4 font-bold text-black md:mt-20 md:text-2xl lg:text-3xl">
          Stats.
        </h1>
      </div>
    )
  }

  if (statsData?.error || chartData?.error)
    return (
      <div>
        {' '}
        <h1 className="ftext-xl section-head mt-10 mb-4 font-bold text-black md:mt-20 md:text-2xl lg:text-3xl">
          Stats.
        </h1>
      </div>
    )

  const PriceChart = dynamic(() => import('../charts/PriceChart'), {
    ssr: false,
  })

  if (!statsData || !chartData) return <div>Loading...</div>

  const priceData = chartData?.prices?.map((value) => ({
    date: value[0],
    close: Number(value[1].toFixed(2)),
  }))

  return (
    <>
      <h1 className="ftext-xl section-head mt-10 mb-4 font-bold text-black md:mt-20 md:text-2xl lg:text-3xl">
        Stats.
      </h1>
      <div className="rounded-lg border-2">
        <div className="justify-items-between mr-2 grid auto-cols-max grid-cols-2 place-content-start md:w-1/2">
          <h1 className="ml-2 text-sm font-bold">Market Cap (in USD)</h1>
          <p className="text-right font-light">
            {new Intl.NumberFormat('en', {
              style: 'currency',
              currency: 'USD',
              minimumFractionDigits: 0,
            }).format(statsData?.market_data?.market_cap?.usd)}
          </p>
          <h1 className="ml-2 text-sm font-bold">Fully Diluted Valuation</h1>
          <p className="text-right font-light">
            {new Intl.NumberFormat('en', {
              style: 'currency',
              currency: 'USD',
              minimumFractionDigits: 0,
            }).format(statsData?.market_data?.fully_diluted_valuation?.usd)}
          </p>
          <h1 className="ml-2 text-sm font-bold">Max Supply</h1>
          <p className="text-right font-light">
            {new Intl.NumberFormat('en', { minimumFractionDigits: 0 }).format(
              statsData?.market_data?.max_supply
            )}
          </p>
          <h1 className="ml-2 text-sm font-bold">Total Supply</h1>
          <p className="text-right font-light">
            {new Intl.NumberFormat('en', { minimumFractionDigits: 0 }).format(
              statsData?.market_data?.total_supply
            )}
          </p>
          <h1 className="ml-2 text-sm font-bold">Circulating Supply</h1>
          <p className="text-right font-light">
            {new Intl.NumberFormat('en', { minimumFractionDigits: 0 }).format(
              statsData?.market_data?.circulating_supply
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
