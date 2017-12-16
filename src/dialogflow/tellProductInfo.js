import { getZaloConversationCtx } from "./common"
import { search } from "../zalo/algolia"

export const ASK = "ask"
export const ASK_SUB = "ask-sub"
export const PRODUCT_PROPERTY = "product-property"

export const tellProductInfo = async inMsg => {
  const { contexts, parameters } = inMsg
  const { [ASK]: ask, [ASK_SUB]: askSub, [PRODUCT_PROPERTY]: prodDes } = parameters

  const {} = search(askSub)

  // Prepare for contextOut
  // to keep track on our conversation
  const zaloConversationCtx = getZaloConversationCtx(contexts)
}

// export const
