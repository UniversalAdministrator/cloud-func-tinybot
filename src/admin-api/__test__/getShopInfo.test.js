import { getShopInfo } from "../getShopInfo"
const _ = console.log
const PASS = `\x1b[42m[PASS]\x1b[0m`
const FAIL = `\x1b[41m[FAIL]\x1b[0m`

_("")
;(async () => {
  const TEST_CASE = "Get Shop Info"
  let pass = true

  try {
    const { shopInfo, err } = await getShopInfo("xxx")
    if (err) return (pass = false)
    _("[shopInfo]", shopInfo)
  } catch (err) {
    _(err)
    pass = false
  } finally {
    pass ? _(`${PASS} ${TEST_CASE}`) : _(`${FAIL} ${TEST_CASE}`)
  }
})()
