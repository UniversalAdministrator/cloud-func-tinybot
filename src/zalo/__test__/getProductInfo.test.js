import { getProductInfo } from "../getProduct"
const _ = console.log
const PASS = `\x1b[42m[PASS]\x1b[0m`
const FAIL = `\x1b[41m[FAIL]\x1b[0m`

_("")
;(async () => {
  const TEST_CASE = "Get Product Info"
  let pass = true

  try {
    const { productInfo, err } = await getProductInfo({
      oaid: "2314288753502995654",
      secret: "L9QV553y8R51U8kQkm77",
      productid: "c32ffc27da62333c6a73"
    })
    if (err) return (pass = false)
    _("[productInfo]", productInfo)
  } catch (err) {
    _(err)
    pass = false
  } finally {
    pass ? _(`${PASS} ${TEST_CASE}`) : _(`${FAIL} ${TEST_CASE}`)
  }
})()
