import { tinyAxios as axios, extractData } from "./common"
import dotenv from "dotenv"

dotenv.config()
const { ADMIN_ENDPOINT: adminEndpoint } = process.env
const _ = console.log

export const GET_SHOP_INFO = "GET_SHOP_INFO"

export const getShopInfo = async (oaid, debug) => {
  if (debug) return debug
  const res = await axios.post(adminEndpoint, { oaid, type: GET_SHOP_INFO })
  const { data: shopInfo, err } = extractData(res)
  return { shopInfo, err }
}
