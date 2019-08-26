const path = require('path');
const ffi = require("ffi");
const ref = require('ref');
const Struct = require("ref-struct"); 
const LazyLoad = ffi.Library('./lazyload', {
    Render: ['char *', ['char *']]
});

function Render(html, options={}) {
    const transformedHTML = LazyLoad.Render(ref.allocCString(html))

    return transformedHTML;
}

module.exports = { Render };
