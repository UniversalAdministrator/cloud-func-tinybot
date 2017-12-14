// Customer say hello
export const INTERACT_WELCOME = "welcome"

// Customer ask more about address, open-close time, contact, basic
export const INTERACT_INFO = "info"

// Customer ask more about delivery policy
export const INTERACT_DELIVERY = "delivery"

// Customer ask more about payemnt
export const INTERACT_PAYMENT = "payment"

// Customer recheck order
export const INTERACT_ORDER = "order"

// Customer ask about product
export const INTERACT_PRODUCT = "product"

// When customer ask, bot answer, consider as 1 interact
export class Interact {
  /**
   * Define INTERACT of interact
   * Store what user ask
   * Store what bot answer
   * @param INTERACT
   * @param customerSay
   * @param botMsgs
   * @param oaid
   * @param shopAdminId
   * @param customerId
   * @param timestamp
   * @param orderId
   * @param conversationId
   */
  constructor({ customerSay, botMsgs, type, oaid, shopAdminId, customerId, timestamp, orderId, conversationId }) {
    this.state = { customerSay, botMsgs, type, oaid, shopAdminId, customerId, timestamp, orderId, conversationId }
  }

  data = () => {
    return this.state
  }
}
