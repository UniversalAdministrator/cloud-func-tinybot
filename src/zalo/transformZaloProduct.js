const _ = console.log

export const isLiteral = val => {
  const isObj = val instanceof Object
  return !isObj
}

const mapKeyName = {
  listCmts: "comments"
}
export const getReadleName = key => {
  const keyName = mapKeyName[key]
  return keyName ? keyName : key
}

export const flatten = (carry, deepObj, rootKey) => {
  Object.keys(deepObj).forEach(key => {
    const keyName = getReadleName(key)
    const flatVal = deepObj[key]
    const literal = isLiteral(flatVal)

    if (!literal) {
      const subRootKey = `${rootKey} ${keyName}`
      flatten(carry, flatVal, subRootKey)
      return carry
    }

    const newKey = `${rootKey} ${keyName}`
    carry[newKey] = flatVal
  })
}

export const flattenCases = ["bginfo", "fullTechInfo", "fullSaleInfo"]

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
    const shouldFlat = flattenCases.includes(key)
    if (shouldFlat) {
      flatten(carry, currVal, key)
      return carry
    }

    // Normal case, just map
    carry[key] = currVal
    return carry
  }, {})

  _("[tinyProduct]", tinyProduct)

  // Origin really large to sub in
  // Delete heavy key
  delete zaloProduct.fullTechInfo
  delete zaloProduct.fullSaleInfo
  tinyProduct.origin = zaloProduct

  return { tinyProduct }
}
