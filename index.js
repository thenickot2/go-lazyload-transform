const lazyloadgo = require('./build/Release/lazyload')

function Render (html, options = {}) {
  const transformedHTML = lazyloadgo.render(html)

  return transformedHTML
}

module.exports = { Render }
