import React, { useEffect, useState } from 'react'
import { endpoint } from '../framework/config'
import API from '../framework/api'
import { useRouter } from 'next/router'

interface CartItemProps {
  key: number
  title: string
  id: number
  image: string
  removeProductFrpmCart: Function
  customizeQuantity: Function
  price: string
  total: number
  quantity: number
}
const CartItem = (props: CartItemProps) => {
  const {
    key,
    id,
    image,
    title,
    removeProductFrpmCart,
    customizeQuantity,
    price,
    total,
    quantity,
  } = props
  return (
    <div
      key={key}
      className="-mx-8 flex items-center px-6 py-5 hover:bg-gray-100"
    >
      <div className="flex w-2/5">
        <div className="w-20">
          <img className="h-24" src={image} alt="" />
        </div>
        <div className="ml-4 flex flex-grow flex-col justify-between">
          <span className="w-4/5 text-sm font-bold line-clamp-3">{title}</span>

          <a
            href="javascript:void(0)"
            onClick={() => removeProductFrpmCart(id, total)}
            className="text-xs font-semibold text-gray-500 hover:text-red-500"
          >
            Remove
          </a>
        </div>
      </div>

      <div className="flex w-1/5 justify-center">
        <svg
          className="w-3 fill-current text-gray-600"
          viewBox="0 0 448 512"
          onClick={() => customizeQuantity(id, 'decre')}
        >
          <path d="M416 208H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
        </svg>
        <input
          className="mx-2 w-8 border text-center"
          type="text"
          value={quantity}
        />

        <svg
          className="w-3 fill-current text-gray-600"
          viewBox="0 0 448 512"
          onClick={() => customizeQuantity(id, 'incre')}
        >
          <path d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
        </svg>
      </div>
      <span className="w-1/5 text-center text-sm font-semibold">${price}</span>
      <span className="w-1/5 text-center text-sm font-semibold">
        ${total.toFixed(2)}
      </span>
    </div>
  )
}

export default CartItem
