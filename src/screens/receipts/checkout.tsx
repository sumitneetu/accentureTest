import React, { useState, useEffect } from 'react'
import Navbar from '../../components/nav-bar'
import SearchBar from '../../components/search-bar'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import { getCart } from '../../util/cart'
import { jsPDF } from 'jspdf'
import GeneratePdf from 'components/generate-pdf'

export const Checkout = () => {
  const [cart, setCart] = useState<any>(null)
  const c = typeof window !== 'undefined' && window.localStorage.getItem('cart')
  useEffect(() => {
    const cartData = getCart()
    setCart(cartData)
  }, [c])
  const generatePdf = () => {
    var doc = new jsPDF('l', 'px', [1200, 1210])
    var pdfjs: any = document.querySelector('#temp-target')
    doc.html(pdfjs, {
      callback: function (doc) {
        doc.save(`lazada_${cart?.orderid}.pdf`)
      },
      x: 10,
      y: 10,
    })
  }

  return (
    <>
      <Navbar />
      <SearchBar />
      {cart && (
        <GeneratePdf cartData={cart} generatePdfFn={generatePdf} pdfBtn />
      )}
    </>
  )
}
export default Checkout
