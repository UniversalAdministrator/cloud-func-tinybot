export const botSay = (resObj, res) => {
  res.setHeader("Content-Type", "application/json")
  // const messages = resData.map(speech => ({ speech, type: 0 }))
  // const resObj = { messages }
  res.send(JSON.stringify(resObj))
}
