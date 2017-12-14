import { Interact } from "../Interact"

const _ = console.log
const PASS = `\x1b[42m[PASS]\x1b[0m`
const FAIL = `\x1b[41m[FAIL]\x1b[0m`

_("")
;(async () => {
  const TEST_CASE = "Send Report"
  let pass = true

  try {
    const i = new Interact({
      customerSay: "Xin chao",
      botMsgs: [{ speech: "Chao ban", type: 0 }],
      type: "welcome",
      oaid: "2314288753502995654",
      shopAdminId: "8695744586214719247",
      customerId: "4024584047813887864",
      timestamp: Math.floor(new Date().getTime() / 1000),
      orderId: "085f7a5c4e19a747fe08",
      conversationId: "d9605a2c-e0fc-11e7-80c1-9a214cf093ae"
    })

    _("[i]", i)
    _("[i.data()]", i.data())
  } catch (err) {
    _(err)
    pass = false
  } finally {
    pass ? _(`${PASS} ${TEST_CASE}`) : _(`${FAIL} ${TEST_CASE}`)
  }
})()
