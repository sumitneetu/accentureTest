interface Product {
  id: number
  title: string
  quantity: number
  image: string
  price: number
  total: number
}

export const addProduct = (product: Product) => {
  let cart
  if (typeof window !== 'undefined') {
    const c = window.localStorage.getItem('cart')
    cart = c != null && JSON.parse(c || '')
    if (
      cart &&
      typeof cart !== 'undefined' &&
      cart != '' &&
      cart?.products.filter((val: Product) => val?.id == product.id).length > 0
    ) {
      let updatedProduct = cart?.products.map((val: Product) => {
        let quantity = val?.quantity
        let total = val.total
        if (val?.id == product.id) {
          quantity += 1
          total += product.price
        }
        return {
          ...val,
          quantity,
          total,
        }
      })
      cart['products'] = updatedProduct
    } else {
      if (cart?.products?.length > 0) {
        cart.products.push(product)
      } else {
        cart = {
          products: [product],
          cartTotal: product?.price,
        }
      }
    }
    const cartTotal = cart.products.reduce((acc: number, val: any) => {
      return acc + val.total
    }, 0)
    cart['cartTotal'] = cartTotal
    window.localStorage.setItem('cart', JSON.stringify(cart))
  }

  return cart
}

export const removeProduct = (productId: Number, total: number) => {
  const cartData = JSON.parse(window.localStorage.getItem('cart') || '')
  const products = cartData.products.filter((val: any) => {
    return val.id !== productId
  })
  const cartTotal = cartData?.cartTotal - total
  cartData['products'] = products
  cartData['cartTotal'] = cartTotal
  window.localStorage.setItem('cart', JSON.stringify(cartData))
}
export const getCart = () => {
  const cartData =
    (typeof window !== 'undefined' && window.localStorage.getItem('cart')) || ''
  return cartData && JSON.parse(cartData)
}

export const manageQuantity = (productId: Number, type: string) => {
  let removeProductFlag = false
  let cartData =
    typeof window !== 'undefined' &&
    JSON.parse(window.localStorage.getItem('cart') || '')
  let products = cartData?.products?.map((val: Product) => {
    let quantity = val?.quantity
    let total = val?.total
    if (val?.id == productId) {
      if (quantity == 1 && type == 'decre') {
        removeProductFlag = true
      } else {
        quantity = type == 'incre' ? quantity + 1 : quantity - 1
        total = type == 'incre' ? total + val?.price : total - val?.price
      }
    }
    return {
      ...val,
      quantity,
      total,
    }
  })
  products = removeProductFlag
    ? products.filter((val: any) => val.id != productId)
    : products
  const cartTotal = products.reduce((acc: number, val: any) => {
    return acc + val.total
  }, 0)
  cartData['cartTotal'] = products.length == 0 ? 0 : cartTotal
  cartData['products'] = products
  window.localStorage.setItem('cart', JSON.stringify(cartData))
  return cartData
}

export const setOrderId = (id: number) => {
  const cartData =
    (typeof window !== 'undefined' &&
      JSON.parse(window.localStorage.getItem('cart') || '')) ||
    null
  cartData['orderid'] = id
  window.localStorage.setItem('cart', JSON.stringify(cartData))
  return cartData
}
