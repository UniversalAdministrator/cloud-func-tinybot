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
import { integrateBotMsgs } from "./integrateBotMsgs"

export const endpoint = async (req, res) => {
  const { result: inMsg } = req.body
  const { parameters: { type } } = inMsg

  let botMsgs = null

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
      break
    }
  }

  integrateBotMsgs(res, botMsgs)
}
