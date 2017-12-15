import { extractZaloCtx } from "./dialogflow/extractZaloCtx"
import { sendReport } from "./dialogflow/sendReport"
import { zaloShopRes } from "./dialogflow/index"

const _ = console.log

export const dialogWorkflow = async (req, res) => {
  const heavyTasks = []
  const zaloCtx = extractZaloCtx(req.body)

  if (!zaloCtx) return null

  heavyTasks.push(sendReport(req.body, "debug"))
  await zaloShopRes(req, res)
  return Promise.all(heavyTasks)
}
