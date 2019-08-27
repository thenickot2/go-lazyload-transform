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
  // It only implements moving img.src to data-src, no other features
  const $ = cheerio.load(html)
  $('img').each(function (i, elem) {
    $(this).attr('data-src', $(this).attr('src'))
    $(this).attr('src', '')
  })
  return $.html()
}
