const _ = console.log

export const flatten = (carry, deepObj, rootKey) => {
  Object.keys(deepObj).forEach(key => {
    const flatVal = deepObj[key]
    const newKey = `${rootKey} ${key}`
    carry[newKey] = flatVal
  })
}

/**
 * Flat deep info
 * @param zaloProduct
 */
export const transformZaloProduct = zaloProduct => {
  // Loop keys
  // If value Object|Array > loop
  // Escape case: value as str > rebuild "key key key" : "value"
  const tinyProduct = Object.keys(zaloProduct).reduce((carry, key) => {
    const currVal = zaloProduct[key]
    if (key === "bginfo") {
      flatten(carry, currVal, "bginfo")
      return carry
    }

    if (key === "fullTechInfo") {
      Object.keys(currVal).forEach(key => {
        const subFullTechInfo = currVal[key]
        const rootKey = `fullTechInfo ${key}`
        flatten(carry, subFullTechInfo, rootKey)
      })
      return carry
    }

    // Normal case, just map
    carry[key] = currVal
    return carry
  }, {})

  _("[tinyProduct]", tinyProduct)

  return { tinyProduct }
}
