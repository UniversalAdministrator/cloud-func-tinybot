import { getOrderList } from "../getProductOrderInfo"
const _ = console.log
const PASS = `\x1b[42m[PASS]\x1b[0m`
const FAIL = `\x1b[41m[FAIL]\x1b[0m`

_("")
;(async () => {
  const TEST_CASE = "Get Order List"
  let pass = true

  try {
    const { orderList, err } = await getOrderList({
      oaid: "2314288753502995654",
      secret: "L9QV553y8R51U8kQkm77",
      count: 20,
      filter: 5
    })
    if (err) return (pass = false)
    _("[orderList]", orderList)
  } catch (err) {
    _(err)
    pass = false
  } finally {
    pass ? _(`${PASS} ${TEST_CASE}`) : _(`${FAIL} ${TEST_CASE}`)
  }
})()
