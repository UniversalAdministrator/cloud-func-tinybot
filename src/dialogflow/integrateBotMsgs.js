import { sendMsg } from "../zalo/sendMsg"
import { getShopInfo } from "../admin-api/getShopInfo"

export const botSay = (resObj, res) => {
  res.setHeader("Content-Type", "application/json")
  res.send(JSON.stringify(resObj))
}

export const sendOut = async ({ res, botMsgs, oaid, customerUid }) => {
  const { shopInfo } = await getShopInfo(oaid, { shopInfo: { secret: "L9QV553y8R51U8kQkm77" } })
  const { secret } = shopInfo
  // Simple send out
  const waitArr = botMsgs.map(async msg => {
    const uid = customerUid
    const message = msg.speech
    await sendMsg({ oaid, secret, uid, message })
  })

  await Promise.all(waitArr)

  // Ignore other integration at this time
  // await botSay()
}
