import { updateOrder } from "../getOrder"
const _ = console.log
const PASS = `\x1b[42m[PASS]\x1b[0m`
const FAIL = `\x1b[41m[FAIL]\x1b[0m`

_("")
;(async () => {
  const TEST_CASE = "Get Order List"
  let pass = true

  try {
    const { orderId, err } = await updateOrder({
      oaid: "2314288753502995654",
      secret: "L9QV553y8R51U8kQkm77",
      orderid: "d867016a352fdc71853e",
      orderData: { status: 2 }
    })
    if (err) return (pass = false)
    _("[orderId]", orderId)
  } catch (err) {
    _(err)
    pass = false
  } finally {
    pass ? _(`${PASS} ${TEST_CASE}`) : _(`${FAIL} ${TEST_CASE}`)
  }
})()
