const path = require('path');
const ffi = require("ffi");
const Struct = require("ref-struct"); 
const LazyLoad = ffi.Library(path.join(__dirname, './lazyload'));

function Render(html, options={}) {
    const renderOpts = Struct({
        html: "string",
    });
    console.log(LazyLoad);
    const transformedHTML = LazyLoad.Render(renderOpts)

    return transformedHTML;
}

module.exports = { Render };
