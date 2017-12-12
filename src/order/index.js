import moment from "moment"

export const STEP_ASK_PRICE = "STEP_ASK_PRICE"
export const STEP_DELIVERY_POLICY = "STEP_DELIVERY_POLICY"
// export const STEP_FILL_ADDRESS = "STEP_FILL_ADDRESS"
export const STEP_FILL_CUTSTOMER_INFO = "STEP_FILL_CUTSTOMER_INFO"
export const STEP_CHOOSE_PAYMENT_METHOD = "STEP_CHOOSE_PAYMENT_METHOD"

export const getPriceInfo = async () => {
  return { price: 100 }
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

export const getPriceRes = price => {
  return `Sản phẩm X này giá đang là ${price}`
}
