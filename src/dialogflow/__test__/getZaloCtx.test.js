import { getZaloConversationCtx, ZALO_CONVERSATION_CTX } from "../common"

const _ = console.log
const PASS = `\x1b[42m[PASS]\x1b[0m`
const FAIL = `\x1b[41m[FAIL]\x1b[0m`

_("")
;(async () => {
  const TEST_CASE = "Get zalo conversation ctx"
  let pass = true

  try {
    const newOne = getZaloConversationCtx([])

    _("[newOne]", newOne)

    const expectId = "6b468980-e22d-11e7-aec9-03ef7b0fa3e7"
    const oldOne = getZaloConversationCtx([
      {
        name: ZALO_CONVERSATION_CTX,
        parameters: {
          conversationId: expectId
        }
      }
    ])

    _("[oldOne]", oldOne)

    const { conversationId, lifeSpan } = oldOne.parameters
    const matched = expectId === conversationId
    const goodLifeSpan = lifeSpan === 1
    if (!matched || !goodLifeSpan) return (pass = false)
  } catch (err) {
    _(err)
    pass = false
  } finally {
    pass ? _(`${PASS} ${TEST_CASE}`) : _(`${FAIL} ${TEST_CASE}`)
  }
})()
