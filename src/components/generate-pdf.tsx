import React, { useEffect, useState } from 'react'
import CartItem from './cart-item'
interface CheckOutData {
  cartData: any
  generatePdfFn: Function
  pdfBtn: boolean
}

export const GeneratePdf = ({
  cartData,
  generatePdfFn,
  pdfBtn,
}: CheckOutData) => {
  const [cart, setcart] = useState(cartData)
  const [pdfShowBtn, setPdfShowBtn] = useState<boolean>(pdfBtn)
  useEffect(() => {
    setcart(cartData)
  }, [cartData])

  return (
    <div className={`relative overflow-x-auto`} id="temp-target">
      <div className="container flex flex-col px-10">
        <div className="">
          <img src="/logo.png" />
        </div>
        <h3>
          <b>Name:</b> Sumit Kumar
        </h3>
        <div>
          <b>Address:</b> : SYM CONDO, Vibhavadi Rangsit Road , 10900
        </div>
        <div>
          <b>Order Number:</b> : #{cart?.orderid}
        </div>
      </div>
      {cart && cart?.products.length > 0 && (
        <div className="container my-1 flex w-full justify-center">
          <div className="w-2/3 bg-white px-10 py-1">
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
                <CartItem key={key} {...val} pdfTemp={false} />
              ))}
          </div>

          <div className="w-1/3 justify-center py-1 px-5">
            <div className="mt-10 mb-5 flex justify-between ">
              <span className="text-sm font-semibold uppercase">
                <b>Items {cart?.products?.length}</b>
              </span>
              <span className="text-sm font-semibold">
                {cart?.cartTotal.toFixed(2)}$
              </span>
            </div>
            <div className="mb-8 border-t">
              <div className="flex justify-between py-6 text-sm font-semibold uppercase">
                <span>
                  <b>Total cost</b>
                </span>
                <span>${cart?.cartTotal.toFixed(2)}</span>
              </div>
            </div>
            {pdfShowBtn && (
              <button
                onClick={() => {
                  setPdfShowBtn(false)
                  generatePdfFn()
                  setTimeout(() => {
                    setPdfShowBtn(true)
                  }, 0)
                }}
                className="mt-2 w-full bg-orange-500 py-3 text-sm font-semibold uppercase text-white hover:bg-orange-600"
              >
                Generate Pdf
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default GeneratePdf
