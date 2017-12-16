import { search } from "../algolia"
const _ = console.log
const PASS = `\x1b[42m[PASS]\x1b[0m`
const FAIL = `\x1b[41m[FAIL]\x1b[0m`

_("")
;(async () => {
  const TEST_CASE = "Search Algolia Call"
  let pass = true

  try {
    const { hits } = await search("Samsung")
    const firstHit = hits[0]

    _("[Total hits]", hits.length)
    _("[First hit]", firstHit)

    if (!firstHit) return (pass = false)

    const noHightlightReturn = firstHit._highlightResult
    if (noHightlightReturn) return (pass = false)
  } catch (err) {
    _(err)
    pass = false
  } finally {
    pass ? _(`${PASS} ${TEST_CASE}`) : _(`${FAIL} ${TEST_CASE}`)
  }
})()
