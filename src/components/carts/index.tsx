import React, { useState, useEffect, useRef } from 'react'
import Navbar from '../common/nav-bar'
import SearchBar from '../common/search-bar'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import { useRouter } from 'next/router'
import { removeProduct, getCart, incressQuantity } from '../../util/cart'
import Chart from 'chart.js/auto'

export const Cart = () => {
  const canvas = useRef()
  const router = useRouter()
  const [cart, setCart] = useState<any>(null)
  const c = typeof window !== 'undefined' && window.localStorage.getItem('cart')
  const userId = 2
  useEffect(() => {
    console.log('change')
    const cartData = getCart()
    setCart(cartData)
  }, [c])

  useEffect(() => {
    if (cart && cart?.products?.length > 0) {
      console.log('cominggg ')
      const ctx = canvas.current
      let chartStatus = Chart.getChart('myChart')
      if (chartStatus !== undefined) {
        chartStatus.destroy()
      }
      const titleArr = cart?.products.map((val: any) => {
        return val?.title
      })
      const priceArr = cart?.products.map((val: any) => {
        return val?.total
      })

      console.log('coming...', titleArr, priceArr)
      new Chart(ctx, {
        type: 'pie',
        data: {
          labels: titleArr,
          datasets: [
            {
              label: 'Dataset 1',
              data: priceArr,
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
              ],
              borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
              ],
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              display: false,
              labels: {
                display: false,
                color: 'rgb(255, 99, 132)',
              },
            },
          },
        },
      })
    }
  }, [cart])

  const removeProductFromcart = (product: any) => {
    const products = cart.products.filter((val: any) => {
      return val?.id != product.id
    })
    const cartTotal = cart?.cartTotal - product?.total
    setCart({ ...cart, products, cartTotal })
    removeProduct(product)
  }
  const customizeQuantity = (product: any, type: string) => {
    const newCart = incressQuantity(product, type)
    setCart(newCart)
  }

  useEffect(() => {
    console.log('dddd')
  }, [cart])

  return (
    <>
      <Navbar />
      <SearchBar />
      <div className="flex w-full justify-center">
        <div className="container w-full">
          {cart && cart?.products.length > 0 && (
            <div className="my-1 flex w-full">
              <div className="w-2/3 bg-white px-5 py-10">
                <div className="flex justify-between border-b pb-8">
                  <h1 className="text-2xl font-semibold">Shopping Cart</h1>
                  <h2 className="text-2xl font-semibold">
                    {cart?.products?.length} Items
                  </h2>
                </div>
                <div className="mt-10 mb-5 flex">
                  <h3 className="w-2/5 text-xs font-semibold uppercase text-gray-600">
                    Product Details
                  </h3>
                  <h3 className="w-1/5 text-center text-center text-xs font-semibold uppercase text-gray-600">
                    Quantity
                  </h3>
                  <h3 className="w-1/5 text-center text-center text-xs font-semibold uppercase text-gray-600">
                    Price
                  </h3>
                  <h3 className="w-1/5 text-center text-center text-xs font-semibold uppercase text-gray-600">
                    Total
                  </h3>
                </div>
                {cart &&
                  cart.products.map((val: any, key: any) => (
                    <div
                      key={key}
                      className="-mx-8 flex items-center px-6 py-5 hover:bg-gray-100"
                    >
                      <div className="flex w-2/5">
                        <div className="w-20">
                          <img className="h-24" src={val?.image} alt="" />
                        </div>
                        <div className="ml-4 flex flex-grow flex-col justify-between">
                          <span className="w-4/5 text-sm font-bold line-clamp-3">
                            {val?.title}
                          </span>

                          <a
                            href="javascript:void(0)"
                            onClick={() => removeProductFromcart(val)}
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
                          onClick={() => customizeQuantity(val, 'decre')}
                        >
                          <path d="M416 208H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
                        </svg>
                        <input
                          className="mx-2 w-8 border text-center"
                          type="text"
                          value={val?.quantity}
                        />

                        <svg
                          className="w-3 fill-current text-gray-600"
                          viewBox="0 0 448 512"
                          onClick={() => customizeQuantity(val, 'incre')}
                        >
                          <path d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
                        </svg>
                      </div>
                      <span className="w-1/5 text-center text-sm font-semibold">
                        ${val?.price}
                      </span>
                      <span className="w-1/5 text-center text-sm font-semibold">
                        ${val?.total.toFixed(2)}
                      </span>
                    </div>
                  ))}

                <a
                  href="#"
                  className="mt-10 flex text-sm font-semibold text-indigo-600"
                  onClick={() => router.push('/')}
                >
                  <svg
                    className="mr-2 w-4 fill-current text-indigo-600"
                    viewBox="0 0 448 512"
                  >
                    <path d="M134.059 296H436c6.627 0 12-5.373 12-12v-56c0-6.627-5.373-12-12-12H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373 9.373-9.373 24.569 0 33.941l86.059 86.059c15.119 15.119 40.971 4.411 40.971-16.971V296z" />
                  </svg>
                  Continue Shopping
                </a>
              </div>

              <div id="summary" className="w-1/3 justify-center py-10">
                <h1 className="border-b pb-8 text-2xl font-semibold">
                  Order Summary
                </h1>
                <p className="w-full text-center ">Price Price Chart</p>
                <div className="flex w-4/5 flex-row items-center justify-center py-4 px-4">
                  <canvas id="myChart" ref={canvas}></canvas>
                </div>
                <div className="mt-10 mb-5 flex justify-between ">
                  <span className="text-sm font-semibold uppercase">
                    Items {cart?.products?.length}
                  </span>
                  <span className="text-sm font-semibold">
                    {cart?.cartTotal.toFixed(2)}$
                  </span>
                </div>
                <div className="mt-8 border-t">
                  <div className="flex justify-between py-6 text-sm font-semibold uppercase">
                    <span>Total cost</span>
                    <span>${cart?.cartTotal.toFixed(2)}</span>
                  </div>

                  <button className="w-full bg-indigo-500 py-3 text-sm font-semibold uppercase text-white hover:bg-indigo-600">
                    Checkout
                  </button>
                </div>
              </div>
            </div>
          )}

          {!cart ||
            (cart?.products?.length == 0 && (
              <div className="flex w-full flex-col justify-center py-10">
                <p className="text-center">
                  Your cart is empty please add some products!
                </p>
                <div className="flex w-full justify-center text-center">
                  <a
                    href="#"
                    className="flex text-center text-sm font-semibold text-indigo-600"
                    onClick={() => router.push('/')}
                  >
                    <svg
                      className="mr-2 w-4 fill-current text-indigo-600"
                      viewBox="0 0 448 512"
                    >
                      <path d="M134.059 296H436c6.627 0 12-5.373 12-12v-56c0-6.627-5.373-12-12-12H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373 9.373-9.373 24.569 0 33.941l86.059 86.059c15.119 15.119 40.971 4.411 40.971-16.971V296z" />
                    </svg>
                    Continue Shopping
                  </a>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  )
}
export default Cart
