'use client';

import { useState } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  createColumnHelper,
  flexRender,
  type SortingState,
} from '@tanstack/react-table';
import { StreamData } from '@/app/types';
import { formatDate } from '@/app/lib/utils';

interface StreamsTableProps {
  data: StreamData[];
}

const columnHelper = createColumnHelper<StreamData>();

const columns = [
  columnHelper.accessor('songName', {
    header: 'Song Name',
    cell: info => info.getValue(),
  }),
  columnHelper.accessor('artist', {
    header: 'Artist',
    cell: info => info.getValue(),
  }),
  columnHelper.accessor('dateStreamed', {
    header: 'Date Streamed',
    cell: info => formatDate(info.getValue()),
  }),
  columnHelper.accessor('streamCount', {
    header: 'Stream Count',
    cell: info => info.getValue().toLocaleString(),
  }),
  columnHelper.accessor('userId', {
    header: 'User ID',
    cell: info => info.getValue(),
  }),
];

export const StreamsTable = ({ data }: StreamsTableProps) => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState('');

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      globalFilter,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  return (
    <div className="w-full">
      <div className="mb-4">
        <input
          type="text"
          value={globalFilter ?? ''}
          onChange={e => setGlobalFilter(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800"
          placeholder="Search all columns..."
        />
      </div>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <th
                    key={header.id}
                    onClick={header.column.getToggleSortingHandler()}
                    className="px-4 py-2 text-left text-sm font-medium text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 cursor-pointer"
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                    <span className="ml-2">
                      {{
                        asc: '↑',
                        desc: '↓',
                      }[header.column.getIsSorted() as string] ?? ''}
                    </span>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map(row => (
              <tr
                key={row.id}
                className="hover:bg-gray-50 dark:hover:bg-gray-800"
              >
                {row.getVisibleCells().map(cell => (
                  <td
                    key={cell.id}
                    className="px-4 py-2 text-sm border-b border-gray-200 dark:border-gray-700"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}; 