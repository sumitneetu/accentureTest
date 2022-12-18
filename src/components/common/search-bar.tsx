import { useRouter } from 'next/router'
import React from 'react'

const SearchBar = (props: any) => {
  const router = useRouter()
  return (
    <div className="flex items-center border border-inherit">
      <div
        className="w-1/6 p-5"
        onClick={() => {
          router.push('/')
        }}
      >
        <img src="/logo.png" />
      </div>
      <div className="w-2/3 p-5">
        {' '}
        <div className="flex items-center border-zinc-200">
          <div className="flex w-full  border border-purple-200">
            <input
              type="text"
              className="block w-full  border bg-white px-4 py-2 text-purple-700 focus:border-purple-400 focus:outline-none focus:ring focus:ring-purple-300 focus:ring-opacity-40"
              placeholder="Search in Lazada"
            />
            <button
              type="submit"
              className="top-0 right-0  border bg-orange-700 p-2.5 text-sm font-medium text-orange-500 text-white hover:bg-orange-800 focus:outline-none focus:ring-4 focus:ring-orange-300 dark:bg-orange-600 dark:hover:bg-orange-700 dark:focus:ring-orange-800"
            >
              <svg
                aria-hidden="true"
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                ></path>
              </svg>
              <span className="sr-only">Search</span>
            </button>
          </div>
        </div>
      </div>
      <div className="w-1/6 p-5">
        <img src="/wallet.png" />
      </div>
    </div>
  )
}

export default SearchBar
