import React from 'react'
import Link from 'next/link'
import { CircularProgressbar } from 'react-circular-progressbar'
import CoverImage from './cover-image'
// import { urlForImage } from '../lib/sanity'

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  SortingState,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'

type Protocol = {
  title: string
  // catTitle: object
  // tokenStrength: object
  tokenStrength: any
  coverImage: object
  mainImageUrl: string
  slug: string
  categories: any
  ticker: string
}

type Props = []

const columnHelper = createColumnHelper<Protocol>()

const columns = [
  columnHelper.accessor((row) => row.mainImageUrl, {
    // columnHelper.accessor(row => row.coverImage, {
    id: ' ',
    cell: (info) => (
      <ProtocolImage value={info.getValue()} slug={info.row.original.slug} />
    ),
    enableSorting: false,
  }),
  columnHelper.accessor((row) => row.title, {
    id: 'Title',
    cell: (info) => (
      <HeaderLink
        value={info.getValue()}
        slug={info.row.original.slug}
        ticker={info.row.original.ticker}
      />
    ),
  }),
  columnHelper.accessor((row) => row.tokenStrength, {
    // columnHelper.accessor(row => row.tokenStrength.tokenStrength, {
    id: 'Token Strength',
    cell: (info) => <TokenStrength value={info.getValue()} />,
  }),
  columnHelper.accessor((row) => row.categories[0]?.label, {
    id: 'Category',
    cell: (info) => <StatusPill value={info.getValue()} />,
  }),
]

const Table: React.FC<{ prop: Props }> = ({ prop }) => {
  // console.log("🚀 ~ file: table.tsx:55 ~ prop", prop)
  // const [data, setData] = React.useState(() => [...prop])
  // const [data, setData] = React.useState(prop)
  // console.log("🚀 ~ file: table.tsx:57 ~ data", data)
  const data = prop
  const [sorting, setSorting] = React.useState<SortingState>([
    { id: 'Token Strength', desc: true },
  ])

  // console.log(data[0].categories)
  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
    },
    // initialState: {
    //   sorting: {

    //   }
    // },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  })

  return (
    <div className="m-auto mt-2 mb-10 flex max-w-5xl flex-col">
      <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
          <div className="overflow-hidden border-b border-gray-200 shadow sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200 text-center">
              <thead className="h-10 bg-gray-50">
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr key={headerGroup.id}>
                    {headerGroup.headers.map((header) => {
                      return (
                        <th
                          key={header.id}
                          scope="col"
                          className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider text-gray-500"
                        >
                          {header.isPlaceholder ? null : (
                            <div
                              {...{
                                className: header.column.getCanSort()
                                  ? 'cursor-pointer select-none'
                                  : '',
                                onClick:
                                  header.column.getToggleSortingHandler(),
                              }}
                            >
                              {flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                              {{
                                asc: ' ▼',
                                desc: '  ▲',
                              }[header.column.getIsSorted() as string] ?? null}
                            </div>
                          )}
                        </th>
                      )
                    })}
                  </tr>
                ))}
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {table.getRowModel().rows.map((row) => (
                  <tr key={row.id} className="hover:bg-gray-100">
                    {/* row.original.slug */}
                    {row.getVisibleCells().map((cell) => (
                      <td key={cell.id} className="px-2 py-2 text-center">
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Table

export function StatusPill({ value }) {
  // console.log(value)
  return (
    <span className="leading-wide rounded-full bg-gray-100 px-3 py-1 text-xs font-bold uppercase text-gray-700 shadow-sm">
      {value}
    </span>
  )
}

function HeaderLink({ value, slug, ticker }) {
  const url = 'posts/' + slug

  return (
    <div className="ml-2">
      <Link href={url}>
        <div className="leading-5 text-left">
          <span className="align-bottom font-bold mr-2">{value}</span>
          <span className="align-bottom text-xs font-extralight">{ticker}</span>
        </div>
      </Link>
    </div>
  )
}

function TokenStrength({ value }) {
  const strength = value
  return (
    <div className="m-auto h-10 w-10">
      <CircularProgressbar value={strength} text={`${strength}`} />
    </div>
  )
}

function ProtocolImage({ value, slug }) {
  // console.log(value)
  return (
    <div className="ml-4 w-4 sm:w-16">
      <CoverImage
        slug={slug}
        title={slug}
        imageObject={value}
        // url={urlForImage(value).url()}
        url={value}
      />
    </div>
  )
}
