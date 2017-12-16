import uuid from "uuid/v1"

export const ZALO_CONVERSATION_CTX = "zalo-conversation-ctx"

export const getZaloConversationCtx = contexts => {
  const zaloConvCtx = contexts.filter(ctx => ctx.name === ZALO_CONVERSATION_CTX)[0]
  const conversationId = (zaloConvCtx && zaloConvCtx.parameters && zaloConvCtx.parameters.conversationId) || uuid()

  return {
    name: ZALO_CONVERSATION_CTX,
    parameters: {
      conversationId,
      lifeSpan: 1
    }
  }
}
