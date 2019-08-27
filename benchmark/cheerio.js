const fs = require('fs')
const { Render } = require('../index.js')
const cheerio = require('cheerio')

const inputHTML = fs.readFileSync(`${__dirname}/index.html`, 'utf8')

let start = new Date()
Render(inputHTML)
let end = new Date()
console.log(`LazyLoad Completed In: ${end - start}ms`)

start = new Date()
cheerioLazyLoad(inputHTML)
end = new Date()
console.log(`Cheerio Completed In: ${end - start}ms`)

function cheerioLazyLoad (html) {
  // The following is a rough implementation of Lazy Loading with Cheerio
  const $ = cheerio.load(html)
  $('img').each(function (i, elem) {
    $(this).attr('data-src', $(this).attr('src'))
    $(this).attr('src', '')
  })

  // eslint-disable-next-line no-useless-escape
  const re = /url\((?:['\"]?)((?:http|https)\:\/.*?)(?:['\"]?)\)/
  $('[style]').each(function (i, elem) {
    const match = $(this).attr('style').match(re)
    if (match && match.length === 2) {
      $(this).attr('data-background-image', match[1])
      const placeholderImg = $(this).attr('style').replace(match[1], 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==')
      $(this).attr('style', placeholderImg)
    }
  })

  return $.html()
}
