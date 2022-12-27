import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import API from '../framework/api'
import Loading from './Loading'
import Rating from './Rating'
import SortComponent from './sort-component'
import { getProductListUrl, formatDate } from './../util/Utility'
import { addProduct, getCart } from '../util/cart'
import Toast from './Toast'
import CartButton from './cart-button'

interface ProductProps {
  isFilterShow?: boolean
}

const ProductsList = ({ isFilterShow }: ProductProps) => {
  const router = useRouter()
  const { category } = router.query
  const [cartCount, setCartCount] = useState<number>(0)
  const [products, setProducts] = useState<any>([])
  const [isLoading, setLoading] = useState(false)
  const [isCartPopup, setCartPopup] = useState(false)
  const [sort, setSort] = useState<string>('')
  const [limit, setLimit] = useState<string>('')
  const cart = getCart()
  useEffect(() => {
    let productUrl = getProductListUrl(category, limit, sort)
    console.log('productUrl', productUrl)
    setLoading(true)
    API.get(productUrl, {}, undefined, {})
      .then((res) => {
        const newProducts = res.map((val: any, key: number) => {
          const ratingArr = val?.rating?.rate.toString().split('.')
          const ratingProp = {
            yellowStar: parseInt(ratingArr[0]),
            grayStar: 5 - ratingArr[0],
            percentage: ratingArr[1] ? ratingArr[1] * 10 : 0,
            ratingCount: val?.rating?.count,
          }
          return {
            ...val,
            ratingProp,
          }
        })
        setProducts(newProducts)
        setLoading(false)
      })
      .catch((error) => {
        setLoading(false)
      })
  }, [category, limit, sort])

  const setSortValue = (val: string, type: string) => {
    if (type == 'limit') {
      setLimit(val)
    } else {
      setSort(val)
    }
  }

  const addToCart = (product: any, type: string) => {
    const newProduct = {
      id: product.id,
      title: product.title,
      quantity: 1,
      image: product.image,
      price: product.price,
      total: product.price,
    }
    addProduct(newProduct)

    setCartPopup(true)
    setTimeout(() => {
      setCartPopup(false)
    }, 2000)
    if (type == 'buy') {
      router.push('/receipts')
    }
  }

  useEffect(() => {
    if (cart && cart?.products?.length > 0) {
      setCartCount(cart?.products?.length)
    }
  }, [cart])

  return (
    <>
      <Loading isLoading={isLoading} />
      <Toast isShow={isCartPopup} />
      <CartButton cartCount={cartCount} />
      {!isLoading && (
        <div className="bg-white">
          <div className="flex justify-between px-8 py-4">
            <div className="w-2/4">
              <h4>Just for you {category}</h4>
            </div>
            {isFilterShow && (
              <div className="w-2/4">
                <SortComponent
                  sortFn={(val: any, type: any) => setSortValue(val, type)}
                  sortdata={{ limit, sort }}
                />
              </div>
            )}
          </div>
          <div className="mx-auto max-w-2xl py-1 px-4 sm:py-2 sm:px-6 lg:max-w-7xl lg:px-8">
            <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 xl:gap-x-8">
              {products &&
                products.map((val: any, key: any) => (
                  <a
                    href="javascript:void(0)"
                    className="group relative justify-between border"
                    key={key}
                  >
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
                    <p className="min-h-31 min-text-height px-2 text-xs line-clamp-2">
                      {val.title}
                    </p>
                    <p className="mt-1 px-2 text-lg font-medium text-orange-900">
                      RM{val?.price}
                    </p>
                    {val?.ratingProp && <Rating {...val?.ratingProp} />}
                    <div className="flex w-full flex-row  p-2">
                      <button
                        onClick={() => addToCart(val, 'buy')}
                        className="w-2/4 bg-orange-400 py-1 px-1 text-xs font-bold text-white hover:bg-blue-700"
                      >
                        BUY NOW
                      </button>
                      <div>&nbsp;</div>
                      <button
                        onClick={() => addToCart(val, 'cart')}
                        className="w-2/4 bg-orange-600 py-1 px-1 text-xs font-bold text-white hover:bg-blue-700"
                      >
                        ADD TO CART
                      </button>
                    </div>
                  </a>
                ))}
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default ProductsList
