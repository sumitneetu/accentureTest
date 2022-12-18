import React from 'react'

import Categories from '../common/categories'
import Navbar from './../common/nav-bar'
import SearchBar from '../common/search-bar'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import Products from '../common/product-list'
export const Lendingpage = () => {
  return (
    <>
      <Navbar />
      <SearchBar />
      <div className="items-star  flex p-8 py-0">
        <div className="w-1/5 items-start bg-white p-0">
          <h4 className="py-2">Filter By category</h4>
          <Categories />
        </div>
        <div className="w-4/5">
          <Products />
        </div>
      </div>
    </>
  )
}
export default Lendingpage
