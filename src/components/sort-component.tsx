import React from 'react'

interface SortProps {
  sortFn: Function
  sortdata: {
    limit: string
    sort: string
  }
}

const SortComponent = ({ sortFn, sortdata }: SortProps) => {
  return (
    <div className="flex w-full flex-row">
      <select
        id="sort_product"
        className="mr-4 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 px-2 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
        onChange={(e) => sortFn(e.target.value, 'limit')}
        value={sortdata?.limit}
      >
        <option value="">Limit By</option>
        <option value="5">5</option>
        <option value="10">10</option>
        <option value="20">20</option>
        <option value="30">30</option>
        <option value="40">40</option>
      </select>
      <select
        id="sort_product"
        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 px-2 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
        onChange={(e) => sortFn(e.target.value, 'sort')}
        value={sortdata?.sort}
      >
        <option value="">Sort By</option>
        <option value="asc">ASC</option>
        <option value="desc">DESC</option>
      </select>
    </div>
  )
}

export default SortComponent
