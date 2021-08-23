const fs = require('fs-extra')
const textLoader = require('./textLoader')

const {
  videoTransform,
  listTransform,
  imgTransform,
  stepsTransform,
} = require('./textTransform')

const Settings = require('./settings.json')

async function main() {
  try {
    await fs.emptyDir(`./${Settings.outputFolder}`, (err) => {
      if (err) return console.error(err)
      console.log('Directory cleared!')
    })
    const html = await textLoader()

    let output = await stepsTransform(html)
    output = await listTransform(output)
    output = await videoTransform(output)
    output = await imgTransform(output)

    fs.writeFileSync(`./${Settings.outputFolder}/code.txt`, output)
  } catch (e) {
    console.log('Some error - ', e)
  }
}

main()
