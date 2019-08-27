const ffi = require("ffi");
const Struct = require("ref-struct"); 

const goString = Struct({
    p: "string",
    n: "long",
});

class GoString extends goString {
    // GoString (cgo) -> JavaScript string
    static get(buffer, offset) {
        const _gs = goString.get(buffer, offset);
        console.log(_gs.p.slice(0, _gs.n))
        return _gs.p.slice(0, _gs.p.length);
    }

    // JavaScript string -> GoString (cgo)
    static set(buffer, offset, value) {
        const _gs = new goString({
            p: value,
            n: value.length,
        });
        return goString.set(buffer, offset, _gs);
    }
}

const LazyLoad = ffi.Library('./lazyload', {
    Render: [GoString, [GoString]]
});

function Render(html, options={}) {
    const transformedHTML = LazyLoad.Render(html)

    return transformedHTML;
}

module.exports = { Render };
