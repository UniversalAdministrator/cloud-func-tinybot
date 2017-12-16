import fs from "fs"
import { transformZaloProduct } from "../transformZaloProduct"
import zaloPhoneList from "./phoneList.json"

const _ = console.log
const PASS = `\x1b[42m[PASS]\x1b[0m`
const FAIL = `\x1b[41m[FAIL]\x1b[0m`

_("")
;(async () => {
  const TEST_CASE = "Generate Flat Phone Data"
  let pass = true

  try {
    const tinyPhoneList = zaloPhoneList.map(zaloPhone => {
      const { tinyProduct: tinyPhone } = transformZaloProduct(zaloPhone)
      return tinyPhone
    })

    fs.writeFileSync("./phoneList.json", JSON.stringify(tinyPhoneList))
  } catch (err) {
    _(err)
    pass = false
  } finally {
    pass ? _(`${PASS} ${TEST_CASE}`) : _(`${FAIL} ${TEST_CASE}`)
  }
})()
