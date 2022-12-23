import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import API from '../../framework/api'
import Loading from './Loading'
import Rating from './Rating'
import SortComponent from './sort-component'
import { getProductListUrl, formatDate } from './../../util/Utility'
import { addProduct } from '../../util/cart'
import { endpoint } from 'framework/config'
import Toast from './Toast'

interface ProductProps {
  isFilterShow?: boolean
}

const ProductsList = ({ isFilterShow }: ProductProps) => {
  const router = useRouter()
  const { category } = router.query
  const [products, setProducts] = useState<any>([])
  const [isLoading, setLoading] = useState(false)
  const [isCartPopup, setCartPopup] = useState(false)
  const [sort, setSort] = useState<String>('')
  const [limit, setLimit] = useState<String>('')
  const userId = 2
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

  const setSortValue = (val: String, type: String) => {
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
      router.push('/cart')
    }
  }

  return (
    <>
      <Loading isLoading={isLoading} />
      <div class="relative">
        <button
          type="button"
          class="mr-2 mb-2 inline-flex items-center rounded-lg bg-[#FF9119] px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-[#FF9119]/80 focus:outline-none focus:ring-4 focus:ring-[#FF9119]/50 dark:hover:bg-[#FF9119]/80 dark:focus:ring-[#FF9119]/40"
        >
          <svg
            class="mr-2 -ml-1 h-4 w-4"
            aria-hidden="true"
            focusable="false"
            data-prefix="fab"
            data-icon="bitcoin"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <path
              fill="currentColor"
              d="M504 256c0 136.1-111 248-248 248S8 392.1 8 256 119 8 256 8s248 111 248 248zm-141.7-35.33c4.937-32.1-20.19-50.74-54.55-62.57l11.15-44.7-27.21-6.781-10.85 43.52c-7.154-1.783-14.5-3.464-21.8-5.13l10.93-43.81-27.2-6.781-11.15 44.69c-5.922-1.349-11.73-2.682-17.38-4.084l.031-.14-37.53-9.37-7.239 29.06s20.19 4.627 19.76 4.913c11.02 2.751 13.01 10.04 12.68 15.82l-12.7 50.92c.76 .194 1.744 .473 2.829 .907-.907-.225-1.876-.473-2.876-.713l-17.8 71.34c-1.349 3.348-4.767 8.37-12.47 6.464 .271 .395-19.78-4.937-19.78-4.937l-13.51 31.15 35.41 8.827c6.588 1.651 13.05 3.379 19.4 5.006l-11.26 45.21 27.18 6.781 11.15-44.73a1038 1038 0 0 0 21.69 5.627l-11.11 44.52 27.21 6.781 11.26-45.13c46.4 8.781 81.3 5.239 95.99-36.73 11.84-33.79-.589-53.28-25-65.99 17.78-4.098 31.17-15.79 34.75-39.95zm-62.18 87.18c-8.41 33.79-65.31 15.52-83.75 10.94l14.94-59.9c18.45 4.603 77.6 13.72 68.81 48.96zm8.417-87.67c-7.673 30.74-55.03 15.12-70.39 11.29l13.55-54.33c15.36 3.828 64.84 10.97 56.85 43.03z"
            ></path>
          </svg>
          Pay with Bitcoin
        </button>
      </div>
      <Toast isShow={isCartPopup} />
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
                    <p className="min-h-31 px-2 text-xs line-clamp-2">
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
