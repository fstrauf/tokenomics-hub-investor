import useSWR from 'swr'
import { NumericFormat } from 'react-number-format';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import moment from "moment";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

const fetcher = (...args) => fetch(...args).then((res) => res.json())

export default function ProtocolStats({ protocol }) {
  const statsData = useSWR('https://api.coingecko.com/api/v3/coins/' + protocol, fetcher, { refreshInterval: 30000 })
  const chartData = useSWR(`https://api.coingecko.com/api/v3/coins/${protocol}/market_chart?vs_currency=usd&days=max&interval=weekly`, fetcher, { refreshInterval: 30000 })

  if (statsData.error || chartData.error) return <div>Failed to load</div>
  if (!statsData.data || !chartData.data) return <div>Loading...</div>

  const priceData = chartData.data.prices.map(value => ({ x: value[0], y: value[1].toFixed(2) }));

  const options = {
    responsive: true,
    scales: {
      y: {
          ticks: {
              // Include a dollar sign in the ticks
              callback: function(value) {
                  return '$' + value;
              }
          }
      }
  }
  }

  const mappedChartData = {
    labels: priceData.map(value => moment(value.x).format('MMM DD YYYY')),
    datasets: [
      {
        fill: false,
        label: statsData.data.symbol.toUpperCase() + ' / USD',
        data: priceData.map(val => val.y),
        borderColor: 'black',
        backgroundColor: '#FF6666',
      }
    ]
  }

  return (
    <>
      <h1 className='ftext-xl md:text-2xl lg:text-3xl font-bold mt-10 mb-4 md:mt-20 text-black section-head'>Stats.</h1>
      <div className='border-2 rounded-lg'>
        <div className='grid grid-cols-2 justify-items-start auto-cols-max place-content-start'>
          <h1 className='ml-2 font-bold'>Market Cap (in USD)</h1>
          <NumericFormat className='text-end mr-2' value={statsData.data.market_data.market_cap.usd} thousandSeparator="," prefix={'$'} decimalScale={2} displayType="text" />
          <h1 className='ml-2 font-bold'>Fully Diluted Valuation</h1>
          <NumericFormat className='text-end mr-2' value={statsData.data.market_data.fully_diluted_valuation.usd} thousandSeparator="," prefix={'$'} decimalScale={2} displayType="text" />
          <h1 className='ml-2 font-bold'>Max Supply</h1>
          <NumericFormat className='text-end mr-2' value={statsData.data.market_data.max_supply} thousandSeparator="," decimalScale={0} displayType="text" />
          <h1 className='ml-2 font-bold'>Total Supply</h1>
          <NumericFormat className='text-end mr-2' value={statsData.data.market_data.total_supply} thousandSeparator="," decimalScale={-0} displayType="text" />
          <h1 className='ml-2 font-bold'>Circulating Supply</h1>
          <NumericFormat className='text-end mr-2' value={statsData.data.market_data.circulating_supply} thousandSeparator="," decimalScale={0} displayType="text" />
        </div>        
        <div className='m-2 mt-4'>
          <Line options={options} data={mappedChartData} />
        </div>
      </div>
    </>
  )

}