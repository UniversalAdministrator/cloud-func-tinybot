import fetch from "axios"
import dotenv from "dotenv"

dotenv.config()
const { ADMIN_ENDPOINT: adminEndpoint } = process.env

const _ = console.log

export const GET_SHOP_INFO = "GET_SHOP_INFO"

fetch.defaults.timeout = 5000

export const extractData = res => {
  const { status, data } = res

  if (status !== 200) {
    _(data)
    return { err: data }
  }

  return { data }
}

export const getShopInfo = async oaid => {
  const res = await fetch.post(adminEndpoint, { oaid, type: GET_SHOP_INFO })
  const { data: shopInfo, err } = extractData(res)
  return { shopInfo, err }
}
