import algoliasearch from "algoliasearch"
import dotenv from "dotenv"

dotenv.config()
const { ALGOLIA_APP_ID: appId, ALGOLIA_APP_KEY: appKey } = process.env

const client = algoliasearch(appId, appKey, { timeout: 3000 })
const index = client.initIndex("dev_Phone")

export const search = async searchStr => {
  const { hits } = await index.search(searchStr)
  const tinyHits = hits.map(hit => {
    delete hit._highlightResult
    return hit
  })
  return { hits: tinyHits }
}

export const getRecord = async objectId => {
  const record = await index.getObject(objectId)
  return { record }
}
