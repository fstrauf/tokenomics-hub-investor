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
}

type Props = []

const columnHelper = createColumnHelper<Protocol>()

const columns = [
  columnHelper.accessor(row => row.mainImageUrl, {
    // columnHelper.accessor(row => row.coverImage, {
    id: ' ',
    cell: info => <ProtocolImage value={info.getValue()} slug={info.row.original.slug} />,
    enableSorting: false,
  }),
  columnHelper.accessor(row => row.title, {
    id: 'Title',
    cell: info => <HeaderLink value={info.getValue()} slug={info.row.original.slug} />,
  }),
  columnHelper.accessor(row => row.tokenStrength, {
    // columnHelper.accessor(row => row.tokenStrength.tokenStrength, {
    id: 'Token Strength',
    cell: info => <TokenStrength value={info.getValue()} />
  }),
  columnHelper.accessor(row => row.categories[0]?.title, {
    id: 'Category',
    cell: info => <StatusPill value={info.getValue()} />
  }),

]

const Table: React.FC<{ prop: Props }> = ({ prop }) => {
  const [data, setData] = React.useState(() => [...prop])
  const [sorting, setSorting] = React.useState<SortingState>([{ id: 'Token Strength', desc: true }])

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
    <div className="max-w-5xl mt-2 flex flex-col mb-10 m-auto">
      <div className="-my-2 overflow-x-auto -mx-4 sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200 text-center">
              <thead className="bg-gray-50 h-10">
                {table.getHeaderGroups().map(headerGroup => (
                  <tr key={headerGroup.id}>
                    {headerGroup.headers.map(header => {
                      return (
                        <th key={header.id}
                          scope='col'
                          className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                          {header.isPlaceholder ? null : (
                            <div
                              {...{
                                className: header.column.getCanSort()
                                  ? 'cursor-pointer select-none'
                                  : '',
                                onClick: header.column.getToggleSortingHandler(),
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
                    }
                    )}
                  </tr>
                ))}
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {table.getRowModel().rows.map(row => (
                  <tr key={row.id} className='hover:bg-gray-100'>
                    {/* row.original.slug */}
                    {row.getVisibleCells().map(cell => (
                      <td key={cell.id} className="text-center px-2 py-2">
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
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
};

export default Table;


export function StatusPill({ value }) {
// console.log(value)
  return (
    <span
      className="px-3 py-1 uppercase leading-wide font-bold text-xs rounded-full shadow-sm bg-gray-100 text-gray-700"
    >
      {value}
    </span>
  );
}

function HeaderLink({ value, slug }) {
  const url = 'posts/' + slug

  return (
    <div className='ml-2'>
      <Link href={url} className="font-bold"  >
        {value}
      </Link>
    </div>
  )
}

function TokenStrength({ value }) {
  const strength = value
  return (
    <div className='w-10 h-10 m-auto'>
      <CircularProgressbar value={strength} text={`${strength}`} />
    </div>
  )
}

function ProtocolImage({ value, slug }) {
  // console.log(value)
  return (
    <div className='w-4 ml-4 sm:w-16'>
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