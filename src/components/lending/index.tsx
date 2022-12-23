import React from 'react'

import Categories from '../common/categories'
import Navbar from './../common/nav-bar'
import SearchBar from '../common/search-bar'
import Banner from '../common/Banner'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import ProductsList from '../common/product-list'
export const Lendingpage = () => {
  return (
    <>
      <Navbar />
      <SearchBar />
      <div className="flex  items-start bg-red-700 p-8 py-0">
        <div className="w-1/5 items-start bg-white p-0">
          <Categories />
        </div>
        <div className="w-4/5">
          <Banner />
        </div>
      </div>
      <ProductsList />
    </>
  )
}
export default Lendingpage
