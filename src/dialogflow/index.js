import {
  INTERACT_WELCOME,
  INTERACT_INFO,
  INTERACT_DELIVERY,
  INTERACT_PAYMENT,
  INTERACT_PRODUCT,
  INTERACT_ORDER
} from "./Interact"

import { sayWelcomeMsg } from "./sayWelcomeMsg"
import { introduceShop } from "./introduceShop"
import { tellDeliveryInfo } from "./tellDeliveryInfo"
import { tellPaymentInfo } from "./tellPaymentInfo"
import { tellProductInfo } from "./tellProductInfo"
import { tellOrderInfo } from "./tellOrderInfo"
import { sendOut } from "./integrateBotMsgs"
import { extractZaloCtx } from "./extractZaloCtx"

const _ = console.log

export const zaloShopRes = async (req, res) => {
  const { result: inMsg } = req.body
  const { parameters: { type: _type } } = inMsg
  const zaloCtx = extractZaloCtx(req.body)

  const { parameters: { fromuid: customerUid, oaid } } = zaloCtx

  let botMsgs = null
  const type = Array.isArray(_type) ? _type[0] : _type

  switch (type) {
    case INTERACT_WELCOME: {
      botMsgs = await sayWelcomeMsg(inMsg)
      break
    }
    case INTERACT_INFO: {
      botMsgs = await introduceShop(inMsg)
      break
    }
    case INTERACT_DELIVERY: {
      botMsgs = await tellDeliveryInfo(inMsg)
      break
    }
    case INTERACT_PAYMENT: {
      botMsgs = await tellPaymentInfo(inMsg)
      break
    }
    case INTERACT_PRODUCT: {
      botMsgs = await tellProductInfo(inMsg)
      break
    }
    case INTERACT_ORDER: {
      botMsgs = await tellOrderInfo(inMsg)
      break
    }
    default: {
      botMsgs = [
        {
          speech: "I see you ^^",
          type: 0
        }
      ]
      break
    }
  }

  _("[botMsgs]", botMsgs)
  await sendOut({ res, botMsgs, customerUid, oaid })
}
