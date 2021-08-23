const regColNum = /col-list-\d/
const regLi = /<li>.*?<\/li>/g

const Settings = require('../settings.json')

const rowStart = Settings.colums.rowStart
const rowEnd = Settings.colums.rowEnd
const colStart = Settings.colums.columnStart
const colEnd = Settings.colums.columnEnd

function listFinder(shortcode, regCol) {
  const colNum = shortcode.match(regCol)[0].split('-').pop()

  const listItems = shortcode.match(regLi)

  return { colNum, listItems }
}

function listFormatter(obj) {
  const inputList = obj.listItems
  const columnItems = Math.ceil(inputList.length / obj.colNum)
  let output = rowStart
  while (inputList.length > 0) {
    let column = inputList.splice(0, columnItems)
    output = output + colStart + '<ul>' + column.join('') + '</ul>' + colEnd
  }
  output = output + rowEnd
  return output
}

function listHandler(array, cols) {
  const lists = array.map((item) => {
    return listFinder(item, regColNum)
  })
  const outputStrings = lists.map((item) => listFormatter(item))

  return outputStrings
}

module.exports = { listHandler, listFinder }
