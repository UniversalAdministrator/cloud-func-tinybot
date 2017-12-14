import crypto from "crypto"
import axios from "axios"

export const OA_ENDPOINT = "https://openapi.zaloapp.com/oa/v1"
export const tiAxios = axios.create({ timeout: 2000 })

const _ = console.log

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
