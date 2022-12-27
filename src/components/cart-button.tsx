import { useRouter } from 'next/router'
import React from 'react'

export const CartButton = ({ cartCount = 0 }: any) => {
  const router = useRouter()

  return (
    <div className="top-300 fixed right-0 z-50">
      <button
        onClick={() => router.push('/receipts')}
        type="button"
        className="mr-2 mb-2 inline-flex items-center rounded-lg bg-[#FF9119] px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-[#FF9119]/80 focus:outline-none focus:ring-4 focus:ring-[#FF9119]/50 dark:hover:bg-[#FF9119]/80 dark:focus:ring-[#FF9119]/40"
      >
        <li className="mt-4 block align-middle font-sans text-black hover:text-gray-700 lg:mt-0  lg:inline-block">
          <a href="#" role="button" className="relative flex">
            <svg className="h-8 w-8 flex-1 fill-current">
              <path d="M17,18C15.89,18 15,18.89 15,20A2,2 0 0,0 17,22A2,2 0 0,0 19,20C19,18.89 18.1,18 17,18M1,2V4H3L6.6,11.59L5.24,14.04C5.09,14.32 5,14.65 5,15A2,2 0 0,0 7,17H19V15H7.42A0.25,0.25 0 0,1 7.17,14.75C7.17,14.7 7.18,14.66 7.2,14.63L8.1,13H15.55C16.3,13 16.96,12.58 17.3,11.97L20.88,5.5C20.95,5.34 21,5.17 21,5A1,1 0 0,0 20,4H5.21L4.27,2M7,18C5.89,18 5,18.89 5,20A2,2 0 0,0 7,22A2,2 0 0,0 9,20C9,18.89 8.1,18 7,18Z" />
            </svg>
            <span className="top right absolute right-0 top-0 m-0 h-4 w-4 rounded-full bg-red-600 p-0 text-center font-mono text-sm  leading-tight text-white">
              {cartCount}
            </span>
          </a>
        </li>
        Go To Cart
      </button>
    </div>
  )
}

export default CartButton
