import axios from "axios"

export const tinyAxios = axios.create({ timeout: 2000 })

const _ = console.log

export const extractData = res => {
  const { status, data } = res

  if (status !== 200) {
    _(data)
    return { err: data }
  }

  return { data }
}
