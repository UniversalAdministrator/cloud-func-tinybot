import { stringify as urlEncode } from "querystring"
import { OA_ENDPOINT, computeMac, tiAxios as axios, extractData } from "./common"

export const SEND_MSG = "sendmessage/text"
export const REPLY_MSG = "sendmessage/reply/text"

const _ = console.log

export const sendMsg = async ({ oaid, secret, uid, message }) => {
  const data = JSON.stringify({ uid, message })
  const timestamp = new Date().getTime()
  const mac = computeMac({ oaid, data, timestamp, secret })

  const res = await axios.post(
    `${OA_ENDPOINT}/${SEND_MSG}`,
    urlEncode({
      oaid,
      data,
      timestamp,
      mac
    })
  )

  const { data: { msgId } = {}, err } = extractData(res)
  return { msgId, err }
}

export const replyMsg = async ({ oaid, secret, msgid, message }) => {
  const data = JSON.stringify({ msgid, message })
  const timestamp = new Date().getTime()
  const mac = computeMac({ oaid, data, timestamp, secret })

  const res = await axios.post(
    `${OA_ENDPOINT}/${REPLY_MSG}`,
    urlEncode({
      oaid,
      data,
      timestamp,
      mac
    })
  )

  const { data: { msgId } = {}, err } = extractData(res)
  return { msgId, err }
}
