const fs = require('fs-extra')
const path = require('path')
const { join } = require('path')
const mammoth = require('mammoth')

const Settings = require('./settings.json')

async function textLoader() {
  try {
    const docParse = await mammoth.convertToHtml({
      path: `./${Settings.inputFolder}/index.docx`,
    })
    console.log('Docx convertation - ', docParse.messages)
    let html = docParse.value
    html = html.replace(/<a id="_\w*?"><\/a>/g, '')
    html = html.replace(
      /(<h[123]>)<strong>(.*?)<\/strong>(<\/h[123]>)/g,
      '$1$2$3'
    )
    return html
  } catch (e) {
    console.log('Some error - ', e)
  }
}

module.exports = textLoader
