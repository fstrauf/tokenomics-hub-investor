import useSWR from 'swr'

const fetcher = (...args) => fetch(...args).then((res) => res.json())

export default function ProtocolStats({ protocol }) {

  const { data, error } = useSWR('https://api.coingecko.com/api/v3/coins/' + protocol, fetcher)

  if (error) return <div>Failed to load</div>
  if (!data) return <div>Loading...</div>

  return (
    <div>
      <h1>Market Cap</h1>
      <p>{data.market_data.market_cap.usd}</p>
      <h1>Fully Diluted Valuation</h1>
      <p>{data.market_data.fully_diluted_valuation.usd}</p>
      <h1>Max Supply</h1>
      <p>{data.market_data.max_supply}</p>
      <h1>Total Supply</h1>
      <p>{data.market_data.total_supply}</p>
      <h1>Circulating Supply</h1>
      <p>{data.market_data.circulating_supply}</p>
    </div>
  )

}



//   const [data, setData] = useState(null)
//   const [isLoading, setLoading] = useState(false)

//   useEffect(() => {
//     setLoading(true)
//     fetch('https://api.coingecko.com/api/v3/coins/' + protocol)
//       .then((res) => res.json())
//       .then((data) => {
//         setData(data)
//         setLoading(false)
//       })
//   }, [])

//   if (isLoading) return <p>Loading...</p>
//   if (!data) return <p>No profile data</p>

//   return (
//     <div>
//       <h1>{data.market_data.fully_diluted_valuation.usd}</h1>
//       <p>{data.market_data.fully_diluted_valuation.usd}</p>
//     </div>
//   )
// }





// function Profile() {
//   const { data, error } = useSWR('/api/profile-data', fetcher)

//   if (error) return <div>Failed to load</div>
//   if (!data) return <div>Loading...</div>

//   return (
//     <div>
//       <h1>{data.name}</h1>
//       <p>{data.bio}</p>
//     </div>
//   )
// }


// // query for all the records in a view
// let table = base.getTable("Table 1");
// let view = table.getView("Grid view");
// let queryResult = await view.selectRecordsAsync({fields: ["Ticker"]});
// // print ID & "Name" from each record:
// for (let record of queryResult.records) {
//     let response = await fetch('https://api.coingecko.com/api/v3/coins/' + record.getCellValueAsString("Ticker"));
//     let o = await response.json();
//     // console.log(o.market_data.fully_diluted_valuation.usd);
//     await table.updateRecordAsync(record.id, {
//         "Fully Diluted Market Cap": o.market_data.fully_diluted_valuation.usd,
//     })
// }