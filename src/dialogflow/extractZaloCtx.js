export const GENERIC_CTX = "generic"

const _ = console.log

export const extractZaloCtx = reqBody => {
  const { contexts } = reqBody.result
  const genericCtx = contexts.filter(ctx => ctx.name === GENERIC_CTX)[0]
  const platform = genericCtx && genericCtx.platform

  _("[genericCtx, platform]", genericCtx, platform)

  const isZalo = platform !== "zalo"
  return isZalo ? genericCtx : null
}
