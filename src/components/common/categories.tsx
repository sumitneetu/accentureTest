import React, { useEffect, useState } from 'react'
import { endpoint } from '../../framework/config'
import API from '../../framework/api'
import { useRouter } from 'next/router'

const Categories = (props: any) => {
  const router = useRouter()
  const [categories, setCategory] = useState([])
  useEffect(() => {
    API.get(endpoint?.CATEGORY_LIST, {}, undefined, {})
      .then((res) => {
        res.push('All Products')
        setCategory(res)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])

  const goToCategoryProducts = (cat: String) => {
    if (cat == 'All Products') {
      router.push('/products/')
    } else {
      router.push('/products/' + cat)
    }
  }

  return (
    <div className="flex items-center p-0">
      <div className="navbar">
        {categories &&
          categories.map((val: any, key: any) => (
            <div className="menu-item">
              <h4 className="flex">
                <a
                  href="javascript:void(0)"
                  onClick={() => goToCategoryProducts(val)}
                >
                  {val}
                </a>
              </h4>
            </div>
          ))}
      </div>
    </div>
  )
}

export default Categories
