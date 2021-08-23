const { imgLinkFinder } = require('./imgHandler')
const { listFinder } = require('./listHandler')

const Settings = require('../settings.json')
const regColNum = /col-steps-\d/

const rowStart = Settings.colums.rowStart
const rowEnd = Settings.colums.rowEnd
const colStart = Settings.colums.columnStart
const colEnd = Settings.colums.columnEnd

async function stepsFinder(shortcode) {
  const obj = listFinder(shortcode, regColNum)
  obj.imgList = await imgLinkFinder(shortcode)
  return obj
}

function stepsFormatter(obj) {
  const inputSteps = obj.listItems.map((item) =>
    item.replace(/(<li>|<\/li>)/g, (data) => {
      return data == '<li>' ? '<p>' : '</p>'
    })
  )
  const inputImgs = obj.imgList.map(
    (item) =>
      `<img class="aligncenter" src="${item}" alt="" width="365" height="365">`
  )
  const cols = obj.colNum
  const formatedList = []
  inputSteps.forEach((element, index) => {
    formatedList.push(colStart + inputImgs[index] + element + colEnd)
  })

  let output = ''
  while (formatedList.length > 0) {
    output = output + rowStart + formatedList.splice(0, cols).join('') + rowEnd
  }

  return output
}

async function stepsHandler(array) {
  const stepsRaw = await Promise.all(array.map((item) => stepsFinder(item)))

  return stepsRaw.map((item) => stepsFormatter(item))
}

module.exports = stepsHandler
