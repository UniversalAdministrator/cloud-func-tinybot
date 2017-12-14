import { tinyAxios as axios, extractData } from "./common"
import dotenv from "dotenv"

dotenv.config()
const { ADMIN_ENDPOINT: adminEndpoint } = process.env
const _ = console.log

export const SEND_REPORT = "SEND_REPORT"

export const sendReport = async report => {
  const res = await axios.post(adminEndpoint, { report, type: SEND_REPORT })
  const { data, err } = extractData(res)
  if (err) _(err)
  return { data, err }
}
