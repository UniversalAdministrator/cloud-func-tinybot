import { transformZaloProduct } from "../transformZaloProduct"
import zProd from "./product.origin.json"

const _ = console.log
const PASS = `\x1b[42m[PASS]\x1b[0m`
const FAIL = `\x1b[41m[FAIL]\x1b[0m`

_("")
;(async () => {
  const TEST_CASE = "Transform Zalo Product"
  let pass = true

  try {
    const { tinyProduct } = await transformZaloProduct(zProd)
    if (!tinyProduct) return (pass = false)

    const { bginfo, fullTechInfo } = tinyProduct
    const shoudntHave = bginfo || fullTechInfo
    if (shoudntHave) return (pass = false)

    const { origin } = tinyProduct
    if (!origin) return (pass = false)
  } catch (err) {
    _(err)
    pass = false
  } finally {
    pass ? _(`${PASS} ${TEST_CASE}`) : _(`${FAIL} ${TEST_CASE}`)
  }
})()
