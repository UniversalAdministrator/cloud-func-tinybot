import fetch from "axios"
import dotenv from "dotenv"
import crypto from "crypto"

export const OA_ENDPOINT = "https://openapi.zaloapp.com/oa/v1"
export const PRODUCT_LIST_URI = "store/product/getproductofoa"
export const PRODUCT_INFO_URI = "store/product/getproduct"
export const ORDER_LIST_URI = "store/order/getorderofoa"
export const ORDER_INFO_URI = "store/order/getorder"

const _ = console.log
fetch.defaults.timeout = 5000

export const computeMac = ({ oaid, data, timestamp, secret }) => {
  const mac = crypto
    .createHash("sha256")
    .update(`${oaid}${data}${timestamp}${secret}`)
    .digest("hex")
    .toString()
  _("[mac]", mac)
  return mac
}

export const extractData = res => {
  const { data: resData } = res
  const { errorCode, data } = resData
  if (errorCode !== 1) {
    _(resData)
    return { err: resData }
  }

  return { data }
}

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

  const res = await fetch.get(`${OA_ENDPOINT}/${PRODUCT_LIST_URI}`, { params })
  const { data: { products: productList }, err } = extractData(res)
  return { productList, err }
}

export const getOrderList = async ({ oaid, secret, offset = 0, count: _count = 10, filter = 5 }) => {
  const gt10 = _count > 10
  if (gt10) _("[WARN] Zalo dont allow count > 10")

  const count = gt10 ? 10 : _count
  const data = JSON.stringify({ offset, count, filter })
  const timestamp = new Date().getTime()
  const mac = computeMac({ oaid, data, timestamp, secret })
  const params = {
    oaid,
    data,
    timestamp,
    mac
  }

  const res = await fetch.get(`${OA_ENDPOINT}/${ORDER_LIST_URI}`, { params })
  const { data: { orders: orderList }, err } = extractData(res)
  return { orderList, err }
}
