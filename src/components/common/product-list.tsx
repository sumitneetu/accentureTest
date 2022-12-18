import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import API from '../../framework/api'
import { endpoint } from '../../framework/config'
import Loading from './Loading'
import Rating from './Rating'

const Products = (props: any) => {
  const router = useRouter()
  const { category } = router.query
  const [products, setProducts] = useState<any>([])
  const [isLoading, setLoading] = useState(false)

  useEffect(() => {
    let productUrl = endpoint?.PRODUCT_LIST
    if (category) {
      productUrl = `${endpoint?.PRODUCT_LIST}/category/${category}`
    }
    setLoading(true)
    API.get(productUrl, {}, undefined, {})
      .then((res) => {
        const newProducts = res.map((val: any, key: number) => {
          const ratingArr = val?.rating?.rate.toString().split('.')
          const ratingProp = {
            yellowStar: parseInt(ratingArr[0]),
            grayStar: 5 - ratingArr[0],
            percentage: ratingArr[1] * 10,
            ratingCount: val?.rating?.count,
          }
          return {
            ...val,
            ratingProp,
          }
        })
        console.log('newProducts', newProducts)
        setProducts(newProducts)
        setLoading(false)
      })
      .catch((error) => {
        setLoading(false)
      })
  }, [category])
  return (
    <>
      <Loading isLoading={isLoading} />

      {!isLoading && (
        <div className="bg-white">
          <div className="px-8 py-4">
            <h4>Just for you {category}</h4>
          </div>
          <div className="mx-auto max-w-2xl py-1 px-4 sm:py-2 sm:px-6 lg:max-w-7xl lg:px-8">
            <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 xl:gap-x-8">
              {products &&
                products.map((val: any, key: any) => (
                  <a href="#" className="group border" key={key}>
                    <div className="aspect-w-1 aspect-h-1 xl:aspect-w-7 xl:aspect-h-8 w-full overflow-hidden rounded-lg  bg-gray-200">
                      <img
                        src={val?.image}
                        alt="Tall slender porcelain bottle with natural clay textured body and cork stopper."
                        className="h-48 w-96 object-contain object-center group-hover:opacity-75"
                      />
                    </div>
                    <div className="w-full p-2">
                      <img
                        src="/tag1.png"
                        alt="Lazmall"
                        className="object-cover object-center group-hover:opacity-75"
                      />
                    </div>
                    <p className="px-2 text-xs line-clamp-2">{val.title}</p>
                    <p className="mt-1 px-2 text-lg font-medium text-orange-900">
                      RM{val?.price}
                    </p>
                    {val?.ratingProp && <Rating {...val?.ratingProp} />}
                  </a>
                ))}
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Products
