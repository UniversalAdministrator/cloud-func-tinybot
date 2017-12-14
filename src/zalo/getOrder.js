import { stringify as urlEncode } from "querystring"
import { OA_ENDPOINT, computeMac, tiAxios as axios, extractData } from "./common"

export const ORDER_LIST_URI = "store/order/getorderofoa"
export const ORDER_INFO_URI = "store/order/getorder"
export const UPDATE_ORDER_URI = "store/order/update"

const _ = console.log

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

  const res = await axios.get(`${OA_ENDPOINT}/${ORDER_LIST_URI}`, { params })
  const { data: { orders: orderList } = {}, err } = extractData(res)
  return { orderList, err }
}

export const getOrderInfo = async ({ oaid, secret, orderid }) => {
  const timestamp = new Date().getTime()
  const mac = computeMac({ oaid, data: orderid, timestamp, secret })
  const params = {
    oaid,
    orderid,
    timestamp,
    mac
  }

  const res = await axios.get(`${OA_ENDPOINT}/${ORDER_INFO_URI}`, { params })
  const { data: orderInfo, err } = extractData(res)
  return { orderInfo, err }
}

export const updateOrder = async ({ oaid, secret, orderid, orderData }) => {
  const data = JSON.stringify({ orderid, ...orderData, reason: "Test api", cancelReason: "Just update, not cancel" })
  const timestamp = new Date().getTime()
  const mac = computeMac({ oaid, data, timestamp, secret })

  const res = await axios.post(
    `${OA_ENDPOINT}/${UPDATE_ORDER_URI}`,
    urlEncode({
      oaid,
      data,
      timestamp,
      mac
    })
  )

  const { data: { orderId } = {}, err } = extractData(res)
  return { orderId, err }
}
