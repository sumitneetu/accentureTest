import { endpoint } from 'framework/config'
export const getProductListUrl = (
  category: any,
  limit: String,
  sort: String
) => {
  let mainurl = endpoint?.PRODUCT_LIST
  if (category) {
    mainurl = `${endpoint?.CATEGORY_PRODUCT_LIST}/${category}`
  }
  let url = ''
  if (limit != '' && sort != '') {
    url = `${mainurl}?limit=${limit}&sort=${sort}`
  } else if (limit != '') {
    url = `${mainurl}?limit=${limit}`
  } else if (sort != '') {
    alert('dd')
    url = `${mainurl}?sort=${sort}`
  } else {
    url = mainurl
  }
  return url
}

export const formatDate = (jsonDate: string) => {
  var shortDate = null
  if (jsonDate) {
    var dt = new Date(jsonDate)
    var month = dt.getMonth() + 1
    var monthString = month > 9 ? month : '0' + month
    var day = dt.getDate()
    var dayString = day > 9 ? day : '0' + day
    var year = dt.getFullYear()
    shortDate = monthString + '-' + dayString + '-' + year
  }
  return shortDate
}

export const uniqueID = () => {
  return Math.floor(Math.random() * Date.now())
}
