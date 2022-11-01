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
  const statsData = useSWR('https://api.coingecko.com/api/v3/coins/' + protocol, fetcher)
  const chartData = useSWR(`https://api.coingecko.com/api/v3/coins/${protocol}/market_chart?vs_currency=usd&days=max&interval=daily`, fetcher)

  if (statsData.error || chartData.error) return <div>Failed to load</div>
  if (!statsData.data || !chartData.data) return <div>Loading...</div>

  const priceData = chartData.data.prices.map(value => ({ x: value[0], y: value[1].toFixed(2) }));

  const options = {
    responsive: true
  }

  const mappedChartData = {
    labels: priceData.map(value => moment(value.x).format('MMM DD YYYY')),
    datasets: [
      {
        fill: true,
        label: protocol,
        data: priceData.map(val => val.y),
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      }
    ]
  }

  return (
    <>
      <h1 className='section-head'>Stats</h1>
      <div className='border-4 border-dashed rounded-lg'>
        <div className='grid grid-cols-2 gap-3'>
          <h1 className='ml-2'>Market Cap (in USD)</h1>
          <NumericFormat className='text-end mr-2' value={statsData.data.market_data.market_cap.usd} thousandSeparator="," prefix={'$'} decimalScale={2} displayType="text" />
          <h1 className='ml-2'>Fully Diluted Valuation</h1>
          <NumericFormat className='text-end mr-2' value={statsData.data.market_data.fully_diluted_valuation.usd} thousandSeparator="," prefix={'$'} decimalScale={2} displayType="text" />
          <h1 className='ml-2'>Max Supply</h1>
          <NumericFormat className='text-end mr-2' value={statsData.data.market_data.max_supply} thousandSeparator="," decimalScale={0} displayType="text" />
          <h1 className='ml-2'>Total Supply</h1>
          <NumericFormat className='text-end mr-2' value={statsData.data.market_data.total_supply} thousandSeparator="," decimalScale={-0} displayType="text" />
          <h1 className='ml-2'>Circulating Supply</h1>
          <NumericFormat className='text-end mr-2' value={statsData.data.market_data.circulating_supply} thousandSeparator="," decimalScale={0} displayType="text" />
        </div>        
        <div className='m-2'>
          <Line options={options} data={mappedChartData} />
        </div>
      </div>
    </>
  )

}