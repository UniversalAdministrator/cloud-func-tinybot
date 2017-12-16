import { getRecord } from "../algolia"
const _ = console.log
const PASS = `\x1b[42m[PASS]\x1b[0m`
const FAIL = `\x1b[41m[FAIL]\x1b[0m`

_("")
;(async () => {
  const TEST_CASE = "Get Record"
  let pass = true

  try {
    const recordId = "377469952"
    const { record } = await getRecord(recordId)
    _("[record]", record)

    if (!record) return (pass = false)
  } catch (err) {
    _(err)
    pass = false
  } finally {
    pass ? _(`${PASS} ${TEST_CASE}`) : _(`${FAIL} ${TEST_CASE}`)
  }
})()
