import { sendReport as send } from "../admin-api/sendReport"

const _ = console.log

export const sendReport = async reqBody => {
  const { result = {} } = reqBody
  const { metadata, parameters, score, resolvedQuery } = result
  const report = { metadata, parameters, score, resolvedQuery }
  const { data, err } = await send(report)
  _("data, err", data, err)
}
