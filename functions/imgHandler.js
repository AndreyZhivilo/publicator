const moment = require('moment')
const { imgLoader, crop } = require('../imgLoader')

const regImg =
  /(?<=\().*?(.jpeg|.jpg|.png|.webp|.gif)(?=\))|http.*?(.jpeg|.jpg|.png|.webp|.gif)/g

const Settings = require('../settings.json')

const rowStart = Settings.colums.rowStart
const rowEnd = Settings.colums.rowEnd
const colStart = Settings.colums.columnStart
const colEnd = Settings.colums.columnEnd

function imgLinkFinder(text) {
  let urls = text.match(regImg)
  urls = [...new Set(urls)]

  console.log('URLS - ', urls)

  const output = urls.map(async (element) => {
    const fileName = await imgLoader(element)
    return `${Settings.siteUrl}/wp-content/uploads/${moment().format(
      'YYYY'
    )}/${moment().format('MM')}/${fileName}`
  })

  return Promise.all(output)
}

function linkFormatter(links) {
  return links.map((item) => {
    const array = item.map(
      (item) =>
        `<img class="aligncenter" href="${item}" alt="" width="365" height="365">`
    )
    return rowStart + colStart + array.join(colEnd + colStart) + colEnd + rowEnd
  })
}

async function imgHandler(array) {
  const links = await Promise.all(array.map((item) => imgLinkFinder(item)))
  return linkFormatter(links)
}

module.exports = { imgHandler, imgLinkFinder }
