const { listHandler } = require('./functions/listHandler')
const videoHandler = require('./functions/videoHandler')
const { imgHandler } = require('./functions/imgHandler')
const stepsHandler = require('./functions/stepsHandler')

const regList = /\[col-list-\d\](.*?)\[\/col-list-\d\]/g
const regVideo = /\[col-video\](.*?)\[\/col-video\]/g
const regImg = /\[col-img\](.*?)\[\/col-img\]/g
const regSteps = /\[col-steps-\d\](.*?)\[\/col-steps-\d\]/g

function Transform(regex, fn) {
  return async function (text) {
    const shortCodes = text.match(regex)
    console.log('Это шорткоды - ', shortCodes)

    if (!shortCodes) return text

    const resArray = await fn(shortCodes)
    console.log('Это готовый массив - ', resArray)

    const output = text.replace(regex, () => {
      return resArray.shift()
    })

    return output
  }
}

const listTransform = Transform(regList, listHandler)
const videoTransform = Transform(regVideo, videoHandler)
const imgTransform = Transform(regImg, imgHandler)
const stepsTransform = Transform(regSteps, stepsHandler)

module.exports = { videoTransform, listTransform, imgTransform, stepsTransform }
