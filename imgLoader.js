const fs = require('fs-extra')
const path = require('path')
const Axios = require('axios')
const sharp = require('sharp')
const { join } = require('path')

const Settings = require('./settings.json')

function randomInteger(min, max) {
  // случайное число от min до (max+1)
  let rand = min + Math.random() * (max + 1 - min)
  return Math.floor(rand)
}

async function download(url) {
  const imgName = url.split('/').pop()
  const outputPath = path.resolve(__dirname, Settings.inputFolder, imgName)
  const res = await Axios({
    method: 'GET',
    url: url,
    responseType: 'stream',
  })

  res.data.pipe(fs.createWriteStream(outputPath))

  return new Promise((resolve, reject) => {
    res.data.on('end', () => {
      console.log(`Image ${imgName} uploaded`)
      resolve(imgName)
    })
    res.data.on('error', (e) => {
      reject(e)
    })
  })
}

function crop(img, width = 365, height = 365) {
  const type = img.split('.').pop()
  const name = img.split('.').shift()
  const newImgName = `${name}-${randomInteger(10, 99)}.${type}`

  outputPath = `./${Settings.outputFolder}/images`
  fs.ensureDirSync(outputPath)

  return new Promise((res, rej) => {
    sharp(`./${Settings.inputFolder}/${img}`)
      .resize(width, height, { fit: 'cover' })
      .toFile(`${outputPath}/${newImgName}`)
      .then(() => {
        console.log('Image Cropeted')
        res(newImgName)
      })
      .catch((e) => rej(e))
  })
}

async function imgLoader(url) {
  try {
    const resImg = url.match(/http/g) ? await download(url) : url
    const output = await crop(resImg)

    return output
  } catch (e) {
    console.log('Error during image downloading - ', e)
  }
}

module.exports = { imgLoader, crop }
