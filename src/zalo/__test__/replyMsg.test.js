import { replyMsg } from "../sendMsg"
const _ = console.log
const PASS = `\x1b[42m[PASS]\x1b[0m`
const FAIL = `\x1b[41m[FAIL]\x1b[0m`

_("")
;(async () => {
  const TEST_CASE = "Reply Msg"
  let pass = true

  try {
    const { msgId, err } = await replyMsg({
      oaid: "2314288753502995654",
      secret: "L9QV553y8R51U8kQkm77",
      msgid: "e9d6d0ff5e1d72432b0c",
      message: "Hi. Running test..."
    })
    if (err) return (pass = false)
    _("[msgId]", msgId)
  } catch (err) {
    _(err)
    pass = false
  } finally {
    pass ? _(`${PASS} ${TEST_CASE}`) : _(`${FAIL} ${TEST_CASE}`)
  }
})()
