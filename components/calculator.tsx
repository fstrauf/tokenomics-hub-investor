import React, { useState } from 'react';
import { Pie, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from 'chart.js';

ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

// const fetcher = (...args) => fetch(...args).then((res) => res.json())

export default function Calculator() {
 
  const structure = {
    totalSupply: 100,
    months: 60,
    breakdown: [
      {
        category: 'Treasury',
        lockedMonths: 5,
        vestedMonths: 12,
        allocationP: 30,
        color: '#FF6666'
      },
      {
        category: 'Team',
        lockedMonths: 0,
        vestedMonths: 12,
        allocationP: 15,
        color: '#028090'
      },
      {
        category: 'Investors',
        lockedMonths: 0,
        vestedMonths: 12,
        allocationP: 15,
        color: '#66FFB3'
      },
      {
        category: 'Advisors',
        lockedMonths: 0,
        vestedMonths: 12,
        allocationP: 10,
        color: '#996EFF'
      },
      {
        category: 'Airdrops',
        lockedMonths: 0,
        vestedMonths: 12,
        allocationP: 30,
        color: '#333C45'
      },
    ],
  }

  console.log('LOADING')

  const [inputFields, setInputFields] = useState(structure.breakdown)
  const [totalSupply, setTotalSupply] = useState(structure.totalSupply)
  const [months, setMonths] = useState(structure.months)
  const [pieData, setPieData] = useState(generatePieData)
  const [areaData, setAreaData] = useState(generateAreaData)

  function generatePieData() {
    var categories: string[] = []
    var colors: string[] = []
    var allocations: number[] = []
    inputFields.forEach(bd => {
      categories.push(bd.category)
      allocations.push(bd.allocationP)
      colors.push(bd.color)
    })

    const data = {
      labels: categories,
      datasets: [
        {
          label: 'category allocation %',
          data: allocations,
          backgroundColor: colors,
        },
      ],
    };
    return data
  }

  function generateAreaData() {
    const structureMonthlyEmissions = inputFields.map(bd => {

      var tokenAllocation = totalSupply * bd.allocationP / 100

      var monthlyEmissions: number[] = []
      var cumulativeEmissions: number[] = []

      for (let i = 0; i < months; i++) {
        var monthlyEmission = 0
        if (i < bd.lockedMonths) {
          monthlyEmission = 0          
        } else {
          if (i < (Number(bd.vestedMonths) + Number(bd.lockedMonths))) {
            console.log("i " + i + " " + bd.vestedMonths + " " + bd.lockedMonths)
            monthlyEmission = tokenAllocation / bd.vestedMonths
          } else {
            monthlyEmission = 0
          }
        }

        monthlyEmissions.push(monthlyEmission)
        if (i === 0) {
          cumulativeEmissions.push(monthlyEmission)
        } else {
          cumulativeEmissions.push(monthlyEmission + cumulativeEmissions[i - 1])
        }
      }

      return {
        ...bd,
        allocationT: tokenAllocation,
        cumulativeEmissions: cumulativeEmissions,
        monthlyEmissions: monthlyEmissions
      }
    })

    var labels: string[] = []
    for (let i = 1; i <= months; i++) {
      labels.push(String(i))
    }

    const data = structureMonthlyEmissions.map(bd => {
      return {
        fill: 'stack',
        label: bd.category,
        data: bd.cumulativeEmissions,
        backgroundColor: bd.color,
      }
    })

    const labeledData = {
      labels,
      datasets: data,
    };

    return labeledData
  }

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Chart.js Line Chart',
      },
    },
    scales: {
      y: {
        stacked: true,
      },
    },
  };

  const handleFormChange = (index: any, event: any) => {
    let data = [...inputFields];
    data[index][event.target.name] = event.target.value;
    setInputFields(data);
  }

  const generateCharts = (e) => {
    e.preventDefault()
    setPieData(generatePieData)
    setAreaData(generateAreaData)
  }

  const addFields = (e) => {
    e.preventDefault()
    let newfield = {
      category: 'Treasury',
      lockedMonths: 5,
      vestedMonths: 12,
      allocationP: 10,
      color: '#823'
    }

    setInputFields([...inputFields, newfield])
  }

  const removeFields = (e, index: any) => {
    e.preventDefault()
    let data = [...inputFields];
    data.splice(index, 1)
    setInputFields(data)
  }

  // console.log("areaData " + JSON.strareaData)

  return (
    <>
        <h1 className="text-3xl font-bold">
          Welcome to the Tokenomics DAO Calculation Template
        </h1>
        <div className='mt-5'>
          <form>
            <div className='flex flex-col w-36 mb-5'>
              <label className="block mb-2 text-sm font-medium text-gray-900">Total Supply</label>
              <input
                name='totalSupply'
                placeholder='Total Supply'
                value={totalSupply}
                onChange={e => setTotalSupply(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                type='number'
              />
              <label className="block mb-2 text-sm font-medium text-gray-900">Months</label>
              <input
                name='months'
                placeholder='Months'
                value={months}
                onChange={e => setMonths(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                type='number'
              />
            </div>
            <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-1.5 mr-2 mb-2"
              onClick={addFields}>Add More..</button>
            <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-1.5 mr-2 mb-2"
              onClick={generateCharts}>Generate Charts</button>
            <div className="overflow-x-auto">
              <table className="text-sm text-left text-gray-500 mb-5">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                  <tr>
                    <th scope="col" className="py-3 px-6">
                      Category
                    </th>
                    <th scope="col" className="py-3 px-6 w-1/6">
                      Lockup Period
                    </th>
                    <th scope="col" className="py-3 px-6 w-1/6">
                      Vesting Period
                    </th>
                    <th scope="col" className="py-3 px-6">
                      Percentage Allocation
                    </th>
                    <th scope="col" className="py-3 px-6 w-1/6">
                      Token Allocation
                    </th>
                    <th scope="col" className="py-3 px-6">
                      Color
                    </th>
                    <th scope="col" className="py-3 px-6">

                    </th>
                  </tr>
                </thead>
                <tbody>
                  {inputFields.map((input, index) => {
                    return (
                      <tr key={index} className="bg-white border-b ">
                        <th scope="row" className="py-2 px-3 font-medium text-gray-900 whitespace-nowrap ">
                          <input
                            name='category'
                            placeholder='Category'
                            value={input.category}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-1.5"
                            onChange={event => handleFormChange(index, event)}
                          />
                        </th>
                        <td className="py-2 px-3">
                          <input
                            name='lockedMonths'
                            placeholder='Months locked'
                            value={input.lockedMonths}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-1.5"
                            onChange={event => handleFormChange(index, event)}
                          />
                        </td>
                        <td className="py-2 px-3">
                          <input
                            name='vestedMonths'
                            placeholder='Months Vested'
                            value={input.vestedMonths}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-1.5"
                            onChange={event => handleFormChange(index, event)}
                          />
                        </td>
                        <td className="py-2 px-3">
                          <input
                            name='allocationP'
                            placeholder='Allocation Percentage'
                            value={input.allocationP}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-1.5"
                            onChange={event => handleFormChange(index, event)}
                          />
                        </td>
                        <td className="py-2 px-3">
                          <p>{input.allocationP/100*totalSupply}</p>
                        </td>
                        <td className="py-2 px-3">
                          <input
                            name='color'
                            placeholder='Color'
                            value={input.color}
                            type='color'
                            className=''
                            onChange={event => handleFormChange(index, event)}
                          />
                        </td>
                        <td className="py-2 px-3">
                          <button type="button" className="text-white bg-red-500 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-800 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center mr-2"
                            onClick={e => removeFields(e, index)} >
                            <svg
                              fill="white"
                              viewBox="0 0 16 16"
                              height="1em"
                              width="1em"
                            // {...props}
                            >
                              <path d="M4 8a.5.5 0 01.5-.5h7a.5.5 0 010 1h-7A.5.5 0 014 8z" />
                            </svg>
                          </button>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </form>
          <div className='w-full'>
            <Line options={options} data={areaData} />
          </div>
          <div className='flex flex-col m-auto place-items-center w-full'>
            <div className='w-80'>
              <Pie data={pieData} />
            </div>
          </div>
        </div>
    </>
  )

}