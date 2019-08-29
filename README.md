# go-lazyload-transform

**IN DEVELOPMENT**

Node package written in Go to transform html to support the lazy loading of images clientside

To install:

```
npm install --save lazyload-transform
yarn add lazyload-transform
```

To use:

```javascript
const { Render } = require('lazyload-transform');

const html = '<html><head></head><body><img src="my-image.jpg"></body></html>';
const transformedHtml = Render(html);
console.log(transformedHtml);
// -> <html><head></head><body><img src="" data-src="my-image.jpg" class="lazyload-transform"><script>/*ClientSide JS Here...*/</script></body></html>
```

## Transformation
By default, `lazyload-transform` will do 2 things:

1. For all `img` tags, move the value of `src` to `data-src`
2. For all html tags with an inline `style` attribute, move the first url to `data-background-image` and replace with a single pixel

Options to control behavior will be in the next release.

## Benchmark
To compare to cheerio, run `node ./benchmark/cheerio`. This benchmark's cheerio implementation is a direct implementation of the functionality written in Go, following best practices from the cheerio documentation.

On a `Intel(R) Core(TM) i5-8257U CPU @ 1.40GHz` this library is roughly 9-10x faster at parsing and manipulating 1494 lines of html.

```
LazyLoad Completed In: 7ms
Cheerio Completed In: 70ms
```

## Development
Requires `libxml2`.

To test the go library run `go test lazyload.go lazyload_test.go`.
To test the node wrapper run `npm test`. Node wrapper should always be tested after updating go library.

To generate `lazyload.h` and `lazyload.a` required for the node binding, run `go build -buildmode=c-archive -o lazyload.a lazyload.go` followed by `node-gyp build` to update the bindings.
