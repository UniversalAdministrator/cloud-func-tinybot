export const botSay = (resObj, res) => {
  res.setHeader("Content-Type", "application/json")
  res.send(JSON.stringify(resObj))
}

export const integrateBotMsgs = () => {}
