import fs from "fs"
import cpr from "child_process"
import AdmZip from "adm-zip"

const _ = console.log
const args = process.argv.slice(2)
const zip = new AdmZip()

const run = ({ args }) => {
  _("[INFO] Build")
  _(cpr.execSync(`babel src --out-dir=dist/src`).toString())
  _(cpr.execSync(`babel index.js --out-file=dist/index.js`).toString())
  _(cpr.execSync(`cp package.json dist/package.json`).toString())

  _("[INFO] Zip")
  _(cpr.execSync(`cd dist && 7z a tinybot.zip *`).toString())

  _("[INFO] Mv zip to root")
  _(cpr.execSync(`cd dist && mv tinybot.zip ./../tinybot.zip`).toString())
}

try {
  run({ args })
} catch (err) {
  _("[run ERR]", err)
}
