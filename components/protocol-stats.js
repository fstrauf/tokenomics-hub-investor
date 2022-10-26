import useSWR from 'swr'
import { NumericFormat } from 'react-number-format';

const fetcher = (...args) => fetch(...args).then((res) => res.json())

export default function ProtocolStats({ protocol }) {

  const { data, error } = useSWR('https://api.coingecko.com/api/v3/coins/' + protocol, fetcher)

  if (error) return <div>Failed to load</div>
  if (!data) return <div>Loading...</div>

  return (
    <>
    <h1 className='text-white section-head'>Stats</h1>
    <div className='border-4 border-dashed grid grid-cols-2 gap-3 rounded-lg'>
      <h1 className='ml-2'>Market Cap (in USD)</h1>
      <NumericFormat className='text-end mr-2' value={data.market_data.market_cap.usd} thousandSeparator="," prefix={'$'} decimalScale={2} displayType="text"/>
      <h1 className='ml-2'>Fully Diluted Valuation</h1>
      <NumericFormat className='text-end mr-2' value={data.market_data.fully_diluted_valuation.usd} thousandSeparator="," prefix={'$'} decimalScale={2} displayType="text"/>
      <h1 className='ml-2'>Max Supply</h1>
      <NumericFormat className='text-end mr-2' value={data.market_data.max_supply} thousandSeparator="," decimalScale={0} displayType="text"/>
      <h1 className='ml-2'>Total Supply</h1>
      <NumericFormat className='text-end mr-2' value={data.market_data.total_supply} thousandSeparator="," decimalScale={-0} displayType="text"/>
      <h1 className='ml-2'>Circulating Supply</h1>
      <NumericFormat className='text-end mr-2' value={data.market_data.circulating_supply} thousandSeparator="," decimalScale={0} displayType="text"/>
    </div>
    </>
  )

}