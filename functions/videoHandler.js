const regVideo = /https:\/\/(youtu\.be|www\.youtube\.com)[\w\/\?\=]*/g

const Settings = require('../settings.json')

const rowStart = Settings.colums.rowStart
const rowEnd = Settings.colums.rowEnd
const colStart = Settings.colums.columnStart
const colEnd = Settings.colums.columnEnd

function videoHandler(array) {
  const videoLinks = array.map((item) => {
    return item.match(regVideo)
  })
  console.log('VideoLinks - ', videoLinks)
  return videoLinks.map((item) => {
    const cleanArray = [...new Set(item)]
    return (
      rowStart +
      colStart +
      '\n' +
      cleanArray.join('\n' + colEnd + colStart + '\n') +
      '\n' +
      colEnd +
      rowEnd
    )
  })
}

module.exports = videoHandler
