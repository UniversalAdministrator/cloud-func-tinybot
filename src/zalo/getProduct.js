import { OA_ENDPOINT, computeMac, tiAxios as axios, extractData } from "./common"

export const PRODUCT_LIST_URI = "store/product/getproductofoa"
export const PRODUCT_INFO_URI = "store/product/getproduct"

const _ = console.log

export const getProductList = async ({ oaid, secret, offset = 0, count: _count = 10 }) => {
  const gt10 = _count > 10
  if (gt10) _("[WARN] Zalo dont allow count > 10")

  const count = gt10 ? 10 : _count
  const data = JSON.stringify({ offset, count })
  const timestamp = new Date().getTime()
  const mac = computeMac({ oaid, data, timestamp, secret })
  const params = {
    oaid,
    data,
    timestamp,
    mac
  }

  const res = await axios.get(`${OA_ENDPOINT}/${PRODUCT_LIST_URI}`, { params })
  const { data: { products: productList } = {}, err } = extractData(res)
  return { productList, err }
}

export const getProductInfo = async ({ oaid, secret, productid }) => {
  const data = JSON.stringify({ productid })
  const timestamp = new Date().getTime()
  const mac = computeMac({ oaid, data, timestamp, secret })
  const params = {
    oaid,
    data,
    timestamp,
    mac
  }

  const res = await axios.get(`${OA_ENDPOINT}/${PRODUCT_INFO_URI}`, { params })
  const { data: productInfo, err } = extractData(res)
  return { productInfo, err }
}
