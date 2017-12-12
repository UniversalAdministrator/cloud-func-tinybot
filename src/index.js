import moment from "moment"

const _ = console.log
const GENERIC_CTX = "generic"

const STEP_ASK_PRICE = "STEP_ASK_PRICE"
const STEP_DELIVERY_POLICY = "STEP_DELIVERY_POLICY"
// const STEP_FILL_ADDRESS = "STEP_FILL_ADDRESS"
const STEP_FILL_CUTSTOMER_INFO = "STEP_FILL_CUTSTOMER_INFO"
const STEP_CHOOSE_PAYMENT_METHOD = "STEP_CHOOSE_PAYMENT_METHOD"

export const getPriceInfo = async () => {
  return { price: 100 }
}

export const getPriceRes = price => {
  return `Sản phẩm X này giá đang là ${price}`
}

/**
 * Base on parameters parsed
 * Decide which info customer want
 * @param parameters
 */
export const processStep = parameters => {
  const arr = [STEP_ASK_PRICE, STEP_DELIVERY_POLICY, STEP_FILL_CUTSTOMER_INFO, STEP_CHOOSE_PAYMENT_METHOD]
  const rIndex = Math.floor(Math.random() * (arr.length - 1))
  const helperInfo = {
    productCode: "GCPM",
    quantity: 10,
    date: moment()
  }
  return { stepName: arr[rIndex], helperInfo }
}

export const botSay = (resData, res) => {
  res.setHeader("Content-Type", "application/json")
  const messages = resData.map(speech => ({ speech, type: 0 }))
  const resObj = { messages }
  res.send(JSON.stringify(resObj))
}

export const processOrder = async (req, res) => {
  /**
   * Find out shop ID
   * Which shop, customer interact with shopA, shopB, shopC?
   */
  const { metadata, parameters, contexts, score, resolvedQuery } = req.body.result
  const genericCtx = contexts.filter(ctx => ctx.name === "generic")[0]
  if (!genericCtx) return _("Cant find out which SHOP without genericCtx")

  const { parameters: gParams = {} } = genericCtx
  const { facebook_sender_id: shopId } = gParams
  if (!shopId) return _("Cant find out which SHOP to interact with")

  /**
   * Look at parameters parsed by Dialogflow
   * Call api to get info
   */
  const { stepName, helperInfo } = processStep(parameters)
  let resData = {}

  switch (stepName) {
    case STEP_ASK_PRICE: {
      const { productCode } = helperInfo
      const { price } = await getPriceInfo(productCode)
      resData = [getPriceRes(price)]
      break
    }

    default: {
    }
  }

  botSay(resData, res)
}
